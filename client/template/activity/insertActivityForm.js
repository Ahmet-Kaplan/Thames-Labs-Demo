Template.insertActivityModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  contactsAsOptions: function() {
    return this.company.contacts().map(function(contact) {
      return {
        'label': contact.name(),
        'value': contact._id
      };
    });
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertContactActivityModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertContactActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertProjectActivityModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertProjectActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertPurchaseOrderActivityModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertPurchaseOrderActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});
