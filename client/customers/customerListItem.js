Template.customerListItem.events({
  'click #add-user': function() {
    Modal.show('insertUserModal', this);
  },
  'click #generate-demo-data': function() {
    var customer = this;
    Meteor.call('generateDemoData', customer);
  },
  'click #deleteUser': function() {
    Meteor.users.remove(this._id);
  }
});
