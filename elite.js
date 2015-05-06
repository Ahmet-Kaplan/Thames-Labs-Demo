//Subscribe to each of the required collections via MySQL
companies = new MysqlSubscription('allCompanies');
contacts = new MysqlSubscription('allContacts');
activities = new MysqlSubscription('allActivities');
credentials = new MysqlSubscription('allCredentials');
countries = new MysqlSubscription('allCountries');

// Server-side code
if (Meteor.isServer) {

  //Establish a connection to the database and store it as a variable
  var liveDb = new LiveMysql({
    user: 'root',
    database: 'cs-live'
  })

  //Start-up operations for Meteor itself
  Meteor.startup(function () {

    //Establish a list of users from MySQL  as a collection
    eliteUsers = new MysqlSubscription('allUsers');

    //Listen for any user account removals and update the collection accordingly
    eliteUsers.addEventListener('removed', function(index, oldRow) {
      Meteor.users.remove({username: oldRow.UserName});
    });
  });

  //Publish a collection of all companies
  Meteor.publish('allCompanies', function() {

    //User must be logged in to use this data. If not logged in, return blank array.
    if (! this.userId) return [];

    //Select and return the entire contents of the Companies table
    //Using MySQL's bin-log, we keep the data in-sync. The specified table name forms the link through which Meteor receives updates.
    //A similar approach has been followed for all returned collections
    return liveDb.select(
      'SELECT * FROM companies ORDER BY companyid DESC',
      [ { table: 'companies' } ]
    )
  });

  //Publish a collection of users (note that this collection does not require an active user)
  Meteor.publish('allUsers', function() {
    return liveDb.select(
      'SELECT * FROM users',
      [ { table: 'users' } ]
    )
  });

  //Publish a collection of contacts
  Meteor.publish('allContacts', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM contacts ORDER BY contactid DESC',
      [ { table: 'contacts' } ]
    )
  });

  //Publish a collection of activities
  Meteor.publish('allActivities', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM activity',
      [ { table: 'activity' } ]
    )
  });

  //Publish a collection of credentials
  Meteor.publish('allCredentials', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM credentials',
      [ { table: 'credentials' } ]
    )
  });

  //Publish a collection of countries
  Meteor.publish('allCountries', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM countries',
      [ { table: 'countries' } ]
    )
  });

  //Meteor's methods, globally accessible across the platform
  Meteor.methods({
    //Inserts a random company into the Companies collection (for testing purposes)
    'addRandomCompany': function() {
      liveDb.db.query(
        'INSERT INTO companies (Company, AccMgrID) values (?, ?)',
        [ 'TEST COMPANY #' + parseInt(Math.random()*10000), Meteor.user().profile.UserID ]
      )
    },
    //Removes all companies added via 'addRandomCompany'
    'clearRandomCompanies': function() {
      liveDb.db.query(
        'DELETE FROM companies WHERE company LIKE "TEST COMPANY%"'
      )
    },
    //Adds a new (genuine) company. 'doc' is an object representing a company, passed in from the front-end
    'addCompany': function(doc) {

      // IMPORTANT! verify doc adheres to schema server side
      check(doc, Schema.company);

      //The list of columns to insert into
      var columns = [
        'Company',
        'Address',
        'City',
        'County',
        'PostCode',
        'Country',
        'WebSite',
        'AccMgrId'
      ];
      //the list of values to insert
      var values = [
        doc.Company,
        doc.Address,
        doc.City,
        doc.County,
        doc.PostCode,
        doc.Country,
        doc.WebSite,
        Meteor.user().profile.UserID
      ];

      //Execute the INSERT query
      var query = liveDb.db.query(
        'INSERT INTO companies (??) values (?);',
        [ columns, values ]
      );

    },
    //Remove a company from the database based on it's ID. This will also update the collection.
    'deleteCompany': function(companyId) {
      liveDb.db.query(
        'DELETE FROM companies WHERE CompanyID = ?',
        [ companyId ]
      )
    }
  });

}
