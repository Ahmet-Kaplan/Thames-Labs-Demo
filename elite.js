companies = new MysqlSubscription('allCompanies');
contacts = new MysqlSubscription('allContacts');
activities = new MysqlSubscription('allActivities');
credentials = new MysqlSubscription('allCredentials');
countries = new MysqlSubscription('allCountries');

if (Meteor.isServer) {

  var liveDb = new LiveMysql({
    user: 'elite',
    password: 'meRaWR73a$atH-3*',
    database: 'cs-live'
  })

  Meteor.startup(function () {

    eliteUsers = new MysqlSubscription('allUsers');
    eliteUsers.addEventListener('removed', function(index, oldRow) {
      Meteor.users.remove({username: oldRow.UserName});
    });

  });

  Meteor.publish('allCompanies', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM companies ORDER BY companyid DESC',
      [ { table: 'companies' } ]
    )
  });

  Meteor.publish('allUsers', function() {
    return liveDb.select(
      'SELECT * FROM users',
      [ { table: 'users' } ]
    )
  });

  Meteor.publish('allContacts', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM contacts ORDER BY contactid DESC',
      [ { table: 'contacts' } ]
    )
  });

  Meteor.publish('allActivities', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM activity',
      [ { table: 'activity' } ]
    )
  });

  Meteor.publish('allCredentials', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM credentials',
      [ { table: 'credentials' } ]
    )
  });

  Meteor.publish('allCountries', function() {
    if (! this.userId) return [];
    return liveDb.select(
      'SELECT * FROM countries',
      [ { table: 'countries' } ]
    )
  });

  Meteor.methods({
    'addRandomCompany': function() {
      liveDb.db.query(
        'INSERT INTO companies (Company, AccMgrID) values (?, ?)',
        [ 'TEST COMPANY #' + parseInt(Math.random()*10000), Meteor.user().profile.UserID ]
      )
    },
    'clearRandomCompanies': function() {
      liveDb.db.query(
        'DELETE FROM companies WHERE company LIKE "TEST COMPANY%"'
      )
    },
    'addCompany': function(doc) {

      // IMPORTANT! verify doc adheres to schema server side
      check(doc, Schema.company);

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

      var query = liveDb.db.query(
        'INSERT INTO companies (??) values (?);',
        [ columns, values ]
      );

    },
    'deleteCompany': function(companyId) {
      liveDb.db.query(
        'DELETE FROM companies WHERE CompanyID = ?',
        [ companyId ]
      )
    }
  });

}
