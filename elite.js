companies = new MysqlSubscription('allCompanies');
contacts = new MysqlSubscription('allContacts');
activities = new MysqlSubscription('allActivities');
credentials = new MysqlSubscription('allCredentials');

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
    'addCompany': function(data) {
      liveDb.db.query(
        'INSERT INTO companies (Company, Address, AccMgrID) values (?, ?, ?)',
        [ data.companyName, data.address, Meteor.user().profile.UserID ]
      )
    },
    'deleteCompany': function(companyId) {
      liveDb.db.query(
        'DELETE FROM companies WHERE CompanyID = ?',
        [ companyId ]
      )
    }
  });

}
