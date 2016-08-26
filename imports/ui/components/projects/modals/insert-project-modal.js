import './insert-project-modal.html';
import { Tenants } from '/imports/api/collections.js';

Template.insertProjectModal.onCreated(function() {
  this.showContacts = new ReactiveVar(true);
});

Template.insertProjectModal.events({
  'change #companyId': function() {
    const c = AutoForm.getFieldValue('companyId', 'insertProjectForm');
    if (c) {
      Template.instance().showContacts.set(false);
    } else {
      Template.instance().showContacts.set(true);
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
    return Template.instance().showContacts.get();
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

AutoForm.hooks({
  insertProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Project creation error: ' + error);
          return false;
        }
        FlowRouter.go('/projects/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Project creation error: ' + error);
    }
  }
});