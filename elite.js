companies = new MysqlSubscription('allCompanies');

if (Meteor.isClient) {

  Template.body.events({
    'click button.logout': function() {
      Meteor.logout();
    }
  });

  Template.companies.helpers({
    companies: function () {
      return companies.reactive();
    }
  });

  Template.companies.events({
    'click button.add': function() {
      Meteor.call('addRandomCompany');
    },
    'click button.clear': function() {
      Meteor.call('clearRandomCompanies');
    }
  });

}

if (Meteor.isServer) {

  var liveDb = new LiveMysql({
    user: 'root',
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

  Meteor.methods({
    'addRandomCompany': function() {
      liveDb.db.query(
        'INSERT INTO companies (Company) value (?)',
        [ 'TEST COMPANY #' + parseInt(Math.random()*10000) ]
      )
    },
    'clearRandomCompanies': function() {
      liveDb.db.query(
        'DELETE FROM companies WHERE company LIKE "TEST COMPANY%"'
      )
    }
  });

}
