Router.onBeforeAction(function () {
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('login');
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    this.next();
  }
});

Router.route('/', function() {
  this.redirect('/company');
});

Router.route('/login');

Router.route('/company', function() {
  this.render('companies');
});

Router.route('/company/:id', function() {
  var companyId = this.params.id;
  this.render('companyDetail', {
    data: {
      company: companies.reactive().filter(function(company) {
        return company.CompanyID == companyId;
      })[0],
      contacts: contacts.reactive().filter(function(contact) {
        return contact.CompanyID == companyId;
      }),
      activities: activities.reactive().filter(function(activity) {
        return activity.CompanyID == companyId;
      })
    }
  });
});

Router.route('/contact', function() {
  this.render('contacts', {
    data: {
      contacts: contacts.reactive()
    }
  });
});

Router.route('/contact/:id', function() {

  var contactId = this.params.id;
  var contact = contacts.reactive().filter(function(contact) {
    return contact.ContactID == contactId;
  })[0];

  this.render('contactDetail', {
    data: {
      contact: contact,
      companies: companies.reactive().filter(function(company) {
        return company.CompanyID == contact.CompanyID;
      }),
      activities: activities.reactive().filter(function(activity) {
        return activity.ContactID == contactId;
      })
    }
  });
});
