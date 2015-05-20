var subs = new SubsManager();

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
    this.redirect('/dashboard');
  }
}, {
  only: ['customers']
});

Router.route('/', {
  action: function() {
    this.redirect('/dashboard');
  }
});

Router.route('/dashboard', {
  name: 'home',

  template: 'dashboard',

  waitOn: function() {
    return [
      subs.subscribe('ownerCompanies', Meteor.userId()),
      subs.subscribe('ownerContacts', Meteor.userId()),
      subs.subscribe('ownerProjects', Meteor.userId()),
      subs.subscribe('ownerActivities', Meteor.userId())
    ];
  },

  data: function() {
    // return {
    //   'companies': Companies.find({})
    // }
  }
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
    return [
      // Meteor.subscribe('companies'),
      // Meteor.subscribe('contacts'),
      // Meteor.subscribe('activities')
      // Meteor.subscribe('companyById', this.params._id),
      // Meteor.subscribe('contactByCompanyId', this.params._id),
      // Meteor.subscribe('activityByCompanyId', this.params._id)
      subs.subscribe('companyById', this.params._id),
      subs.subscribe('contactByCompanyId', this.params._id),
      subs.subscribe('activityByCompanyId', this.params._id),
      subs.subscribe('projectsByCompanyId', this.params._id)
    ];
  },

  data: function() {
    return Companies.findOne(this.params._id);
  }

});

Router.route('/customers', {

  name: 'customers',

  waitOn: function() {
    // return [Meteor.subscribe('customers'), Meteor.subscribe('userData')];
    return [subs.subscribe('customers'), subs.subscribe('userData')];
  },

  data: function() {
    return {
      'customers': Customers.find({})
    };
  }

});

Router.route('/contacts/:_id', {

  name: 'contact',

  template: 'contactDetail',

  waitOn: function() {
    return [
      // Meteor.subscribe('companies'),
      // Meteor.subscribe('contacts'),
      // Meteor.subscribe('activities')
      // Meteor.subscribe('companyById', Contacts.findOne(this.params._id).companyId),
      // Meteor.subscribe('contactById', this.params._id),
      // Meteor.subscribe('activityByContactId', this.params._id)
      subs.subscribe('companyById', Contacts.findOne(this.params._id).companyId),
      subs.subscribe('contactById', this.params._id),
      subs.subscribe('activityByContactId', this.params._id)
    ];
  },

  data: function() {
    return Contacts.findOne(this.params._id);
  }

});

Router.route('/contacts', {

  name: 'contacts',

  template: 'contactList',

  waitOn: function() {
    return [
      // Meteor.subscribe('contacts'),
      // Meteor.subscribe('companies')
      subs.subscribe('contacts'),
      subs.subscribe('companies')
    ];
  },

  data: function() {
    return {
      'contacts': Contacts.find({})
    }
  }

});


Router.route('/projects', {

  name: 'projects',

  template: 'projectsList',

  waitOn: function() {
    return [
      // Meteor.subscribe('projects'),
      // Meteor.subscribe('contacts'),
      // Meteor.subscribe('companies')
      subs.subscribe('projects'),
      subs.subscribe('contacts'),
      subs.subscribe('companies')
    ];
  },

  data: function() {
    return {
      'projects': Projects.find({})
    }
  }

});

Router.route('/projects/:_id', {

  name: 'project',

  template: 'projectDetail',

  waitOn: function() {
    return [
      // Meteor.subscribe('projectById', this.params._id),
      // Meteor.subscribe('contactById', Projects.findOne(this.params._id).contactId),
      // Meteor.subscribe('companyById', Projects.findOne(this.params._id).companyId),
      // Meteor.subscribe('activityByProjectId', this.params._id)
      subs.subscribe('projectById', this.params._id),
      subs.subscribe('contactByCompanyId', Projects.findOne(this.params._id).companyId),
      subs.subscribe('companyById', Projects.findOne(this.params._id).companyId),
      subs.subscribe('activityByProjectId', this.params._id)
    ];
  },

  data: function() {
    return Projects.findOne(this.params._id);
  }

});
