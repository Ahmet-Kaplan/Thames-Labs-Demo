Session.set('sc', null);

Template.newProjectForm.events({
  'change #companyId': function() {
    var c = AutoForm.getFieldValue('companyId', 'newProjectForm');
    if (c) {
      Session.set('sc', c);
    } else {
      Session.set('sc', null);
    }
  }
});

Template.newProjectForm.helpers({
  showContacts: function() {
    if (Session.get('sc') === null) {
      return false;
    } else {
      return true;
    }
  },
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
  return Meteor.userId();
  },
  datePlusOneWeek: function() {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  },
  selectedCompany: function() {
    console.log(AutoForm.getFieldValue('companyId', 'newProjectForm'))
    return AutoForm.getFieldValue('companyId', 'newProjectForm')
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('sc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});

Template.updateProjectForm.onRendered(function() {
  var c = this.data.companyId;
  if (c) {
    Session.set('sc', c);
  } else {
    Session.set('sc', null);
  }
});

Template.updateProjectForm.helpers({
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('sc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});

Template.newCompanyProjectForm.helpers({
  showContacts: function() {
    if (Session.get('sc') === null) {
      return false;
    } else {
      return true;
    }
  },
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
  return Meteor.userId();
  },
  datePlusOneWeek: function() {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('sc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});

Template.newContactProjectForm.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
  return Meteor.userId();
  },
  datePlusOneWeek: function() {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});
