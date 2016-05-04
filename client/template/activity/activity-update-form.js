Template.updateActivityModal.onRendered(function() {
  if(!Roles.userIsInRole(Meteor.userId(), ['CanEditActivities'])) {
    toastr.warning("You do not have permission to edit activities");
    Modal.hide();
    return;
  }
});

Template.updateActivityModal.helpers({
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});
