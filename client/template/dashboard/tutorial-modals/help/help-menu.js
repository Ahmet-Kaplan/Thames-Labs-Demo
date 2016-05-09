Template.help.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.welcomeTour": true
    }
  });
  hopscotch.endTour(true);
})

Template.help.events({
  'click #close': function(event, template) {
    lastTutorial = null;
  },
  'click #first-run-tour': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/welcome_tour.js');
  },
  'click #companies-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
  },
  'click #contacts-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
  },
  'click #admin-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
  },
  'click #tags-tutorial': function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    hopscotch.endTour(true);
    $.getScript('/vendor/hopscotch/tours/tags-tutorial-p1.js');
  },
  'click #close-help': function(event, template) {
    Modal.hide();
  }
});

Template.help.helpers({
  helpTitle: function() {
    var hTitle = "";
    switch (lastTutorial) {
      case "welcome":
        hTitle = "Great Work!";
        return hTitle;
        break;
      case "addCompany":
        hTitle = "How Did You Get So Good?";
        return hTitle;
        break;
      case "addContact":
        hTitle = "You're a Natural!";
        return hTitle;
        break;
      case "addTags":
        hTitle = "You're a Smart Cookie!";
        return hTitle;
        break;
      case "admin":
        hTitle = "Now You're Cooking!";
        return hTitle;
        break;
      case "help":
        hTitle = "Need Some Help?";
        return hTitle;
    }
  },
  helpText: function() {
    var hText = "";
    switch (lastTutorial) {
      case "welcome":
        hText = "That's a brief overview of RealTimeCRM. To learn more, select one of the other tutorials below.";
        return hText;
        break;
      case "addCompany":
        hText = "You now know how to add company in RealTimeCRM! Everything you have created in this tutorial has been saved. To learn more, select one of the other tutorials below.";
        return hText;
        break;
      case "addContact":
        hText = "You now know how to add a contact in RealTimeCRM! Everything you have created in this tutorial has been saved. To learn more, select one of the other tutorials below.";
        return hText;
        break;
      case "addTags":
        hText = "You now know how to add tags in RealTimeCRM! The process for tagging is the same throughout the application, so keep tagging and discover how powerful they are! Everything you have created in this tutorial has been saved. To learn more, select one of the other tutorials below.";
        return hText;
        break;
      case "admin":
        hText = "You now know how to add a user in RealTimeCRM! Everything you have created in this tutorial has been saved. To learn more, select one of the other tutorials below.";
        return hText;
        break;
    }
  }
});