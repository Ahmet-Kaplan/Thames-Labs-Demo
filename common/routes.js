// Require sign in for all routes
Router.onBeforeAction(function() {
  if (Meteor.user()) {
    this.next();
  } else {
    this.render('login');
  }
});

// Require superadmin for some routes
Router.onBeforeAction(function() {
  if (Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
    this.next();
  } else {
    this.redirect('/');
  }
}, {
  only: ['customers']
});

Router.route('/', function() {
  this.redirect('/companies');
});

Router.route('/companies', {
  
  waitOn: function() {
    return Meteor.subscribe('companies');
  },

  data: function() {
    return {
      'companies': Companies.find({})
    }
  }
    
});

Router.route('/companies/:_id', {

  name: 'company',

  template: 'companyDetail',

  waitOn: function() {
    return Meteor.subscribe('companies');
  },

  data: function() {
    return Companies.findOne(this.params._id);
  }

});

Router.route('/customers', {

  name: 'customers',

  waitOn: function() {
    return [ Meteor.subscribe('customers'), Meteor.subscribe('userData') ];
  },
  
  data: function() {
    return {
      'customers': Customers.find({})
    };
  }

});
