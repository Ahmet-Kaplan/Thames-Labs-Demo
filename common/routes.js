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
  }
    
});

Router.route('/company/:id', function() {
  var companyId = this.params.id;
  this.render('companyDetail');
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
