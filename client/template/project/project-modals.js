Session.set('sc', null);

Template.insertProjectModal.events({
  'change #companyId': function() {
    var c = AutoForm.getFieldValue('companyId', 'newProjectForm');
    if (c) {
      Session.set('sc', c);
    } else {
      Session.set('sc', null);
    }
  }
});

Template.insertProjectModal.helpers({
  projectTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types.map(function(type) {
      return {
        'label': type.name,
        'value': type.id
      };
    });
  },
  showContacts: function() {
    return (Session.get('sc') !== null);
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

Template.updateProjectModal.onRendered(function() {
  var c = this.data.companyId;
  if (c) {
    Session.set('sc', c);
  } else {
    Session.set('sc', null);
  }
});

Template.updateProjectModal.helpers({
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    var contact = Contacts.findOne({
      _id: this.contactId
    });
    return contact.forename + ' ' + contact.surname;
  }
});

Template.newCompanyProjectForm.helpers({

  projectTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types.map(function(type) {
      return {
        'label': type.name,
        'value': type.id
      };
    });
  },
  showContacts: function() {
    return (Session.get('sc') !== null);
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
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  }
});

Template.newContactProjectForm.helpers({

  projectTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types.map(function(type) {
      return {
        'label': type.name,
        'value': type.id
      };
    });
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
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    var contact = Contacts.findOne({
      _id: this.contactId
    });
    return contact.forename + ' ' + contact.surname;
  }
});
