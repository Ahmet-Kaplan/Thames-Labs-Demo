Session.set('sc', null);

Template.newProjectForm.onCreated(function() {
  //Update the default numbering system
  var tenant = Tenants.findOne({});
  Tenants.update({
    _id: tenant._id
  }, {
    $inc: {
      'settings.project.defaultNumber': 1
    }
  });
});
Template.newCompanyProjectForm.onCreated(function() {
  //Update the default numbering system
  var tenant = Tenants.findOne({});
  Tenants.update({
    _id: tenant._id
  }, {
    $inc: {
      'settings.project.defaultNumber': 1
    }
  });
});
Template.newContactProjectForm.onCreated(function() {
  //Update the default numbering system
  var tenant = Tenants.findOne({});
  Tenants.update({
    _id: tenant._id
  }, {
    $inc: {
      'settings.project.defaultNumber': 1
    }
  });
});

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
    if (Session.get('sc') === null) {
      return false;
    } else {
      return true;
    }
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
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  companyName: function() {
    return Companies.findOne().name;
  },
  contactName: function() {
    var contact = Contacts.findOne();
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
    if (Session.get('sc') === null) {
      return false;
    } else {
      return true;
    }
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
    return Companies.findOne().name;
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
    return Companies.findOne().name;
  },
  contactName: function() {
    var contact = Contacts.findOne();
    return contact.forename + ' ' + contact.surname;
  }
});
