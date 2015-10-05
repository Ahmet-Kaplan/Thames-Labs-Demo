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
