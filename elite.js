companies = new MysqlSubscription('allCompanies');
contacts = new MysqlSubscription('allContacts');
activities = new MysqlSubscription('allActivities');
credentials = new MysqlSubscription('allCredentials');

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

  Template.companies.onRendered(function() {
    $('.modal-trigger').leanModal();
  });

  Template.companies.helpers({
    companies: function () {
      var companyList = companies.reactive(),
          searchString = Session.get('companySearch');
      if (Session.get('showMyCompanies')) {
        companyList = companyList.filter(function(company) {
          return company.AccMgrID === Meteor.user().profile.UserID;
        });
      }
      if (searchString) {
        var index = lunr(function() {
          this.field('Company', { boost: 10 });
          this.field('Address');
          this.field('PostCode');
          this.field('City');
          this.ref('CompanyID');
        });
        companyList.forEach(function(company) {
          index.add(company);
        });
        var searchResults = index.search(searchString);
        searchResults = searchResults.map(function(result) {
          return lodash.find(companyList, function(company) {
            return company.CompanyID == result.ref;
          });
        });
        companyList = searchResults;
      }
      return companyList;
    },
    showMyCompanies: function() {
      return Session.get('showMyCompanies');
    },
    companySearch: function() {
      return Session.get('companySearch');
    },
    companySearchLabelClass: function() {
      return Session.get('companySearch') ? 'active' : '';
    }
  });

  Template.companies.events({
    'click a.add': function() {
      Meteor.call('addRandomCompany', function() {
        Materialize.toast('Test company added', 1000, 'teal');
      });
    },
    'click a.clear': function() {
      Meteor.call('clearRandomCompanies', function() {
        Materialize.toast('Test companies cleared', 1000, 'red');
      });
    },
    'change .switch input': function(event) {
      Session.set('showMyCompanies', event.target.checked);
    },
    'keyup #search, change #search': function(event) {
      Session.set('companySearch', event.target.value);
    }
  });

  Template.addCompanyModal.events({
    'submit form': function(event) {

      event.preventDefault();

      var companyName = event.target.company.value,
          address = event.target.address.value;

      Meteor.call('addCompany', {
        companyName: companyName,
        address: address
      }, function(){
        event.target.reset();
        $('.modal').closeModal();
        Materialize.toast('Company added', 1000, 'teal');
      });

    }
  });

  Template.companyDetail.helpers({
    addressString: function(company) {
      return encodeURIComponent([
        company.Address,
        company.City,
        company.Country,
        company.PostCode
      ].join(', '));
    }
  })

  Template.companyDetail.events({
    'click .delete-company': function(event) {
      var companyId = this.company.CompanyID;
      Meteor.call('deleteCompany', companyId, function() {
        Router.go('company');
        Materialize.toast('Company deleted', 2000, 'red');
      })
    }
  });

}

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
