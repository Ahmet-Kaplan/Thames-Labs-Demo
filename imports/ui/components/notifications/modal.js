import './modal.html';

Template.notificationModal.helpers({
  isPersonalNotification: function() {
    return this.target === Meteor.userId();
  }
});

Template.notificationModal.events({
  'click #removeNotification': function() {
    Meteor.call('removeNotification', this._id);
    Modal.hide();
  }
});
