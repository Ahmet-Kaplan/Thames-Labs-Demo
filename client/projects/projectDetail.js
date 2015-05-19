Template.projectDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.projectDetail.helpers({
  managerName: function() {
    return Meteor.users.find({
      _id: this.userId
    }).fetch()[0].profile.name;
  },
  nextActionName: function() {
    return Meteor.users.find({
      _id: this.nextActionBy
    }).fetch()[0].profile.name;
  },
  contactName: function() {
    var c = Contacts.find({
      _id: this.contactId
    }).fetch()[0];
    return c.forename + " " + c.surname;
  }
});

Template.projectDetail.events({
  'click #add-activity': function() {
    Modal.show('insertProjectActivityModal', {
      project: this
    });
  }
});
