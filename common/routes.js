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

  name: 'companies',

  template: 'companyList',
  
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
    var company = Companies.findOne(this.params._id);
    if (!company) {
      // Bit of a hack to remove the BS modal backdrop
      // Should go in template onRendered?
      $(".modal-backdrop").remove();
      $("body").removeClass('modal-open');
      this.redirect('/companies');
    }
    return company;
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
