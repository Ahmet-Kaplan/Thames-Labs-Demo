Template.customerListItem.events({
  'click #add-user': function() {
    Modal.show('insertUserModal', this);
  }
});
