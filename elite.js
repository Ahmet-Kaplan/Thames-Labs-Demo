companies = new MysqlSubscription('allCompanies');
contacts = new MysqlSubscription('allContacts');
activities = new MysqlSubscription('allActivities');

if (Meteor.isClient) {

  Template.body.onRendered(function() {
    $(".button-collapse").sideNav();
  });

  Template.body.events({
    'click a.logout': function() {
      Meteor.logout();
      $('.button-collapse').sideNav('hide');
    }
  });

  Template.companies.helpers({
    companies: function () {
      var companyList = companies.reactive();
      if (Session.get('showMyCompanies')) {
        return companyList.filter(function(company) {
          return company.AccMgrID === Meteor.user().profile.UserID;
        });
      } else {
        return companyList;
      }
    },
    showMyCompanies: function() {
      return Session.get('showMyCompanies');
    }
  });

  Template.companies.events({
    'click a.add': function() {
      Meteor.call('addRandomCompany');
      Materialize.toast('Test company added', 1000, 'green');
    },
    'click a.clear': function() {
      Meteor.call('clearRandomCompanies');
      Materialize.toast('Test companies cleared', 1000, 'red');
    },
    'change .switch input': function(event) {
      Session.set('showMyCompanies', event.target.checked);
    }
  });

  Template.companyDetail.helpers({
    addressString: function(company) {
      return encodeURIComponent([
        company.Company,
        company.Address,
        company.City,
        company.Country,
        company.PostCode
      ].join(', '));
    }
  })

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

  Meteor.publish('allContacts', function() {
    return liveDb.select(
      'SELECT * FROM contacts ORDER BY contactid DESC',
      [ { table: 'contacts' } ]
    )
  });

  Meteor.publish('allActivities', function() {
    return liveDb.select(
      'SELECT * FROM activity',
      [ { table: 'activity' } ]
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
