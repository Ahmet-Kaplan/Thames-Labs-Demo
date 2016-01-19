Template.tagInput.onCreated(function() {
  this.inputMode = new ReactiveVar(false);
});

Template.tagInput.helpers({
  hasPermission: function() {
    if (!this.permissionToEdit) return true;
    return Roles.userIsInRole(Meteor.userId(), [ this.permissionToEdit]);
  },
  inputMode: function() {
    return Template.instance().inputMode.get();
  }
});

Template.tagInput.events({
  'click a': function(e) {
    e.preventDefault();
    Template.instance().inputMode.set(true);
  },
  'blur .selectize-input': function() {
    Template.instance().inputMode.set(false);
  }
});
