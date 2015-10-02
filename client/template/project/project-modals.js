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
    // if (Session.get('sc') === null) {
    //   return false;
    // } else {
    return true;
    // }
  },
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
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
  datePlusOneWeek: function() {
    var now = new Date();
    now.setDate(now.getDate() + 7);
    return now;
  },
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    if (Session.get('sc') === null) {
      return Contacts.find({
        companyId: {
          $exists: 0
        }
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
    } else {
      return Contacts.find({
        companyId: Session.get('sc')
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
    }
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
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});
