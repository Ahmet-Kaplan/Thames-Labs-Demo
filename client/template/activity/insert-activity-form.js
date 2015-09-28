Template.insertActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertContactActivityModal.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertProjectActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertPurchaseOrderActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});

Template.insertOpportunityActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
});
