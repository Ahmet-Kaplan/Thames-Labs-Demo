import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#general-dropdown",
      title: "Add a user",
      content: "This interactive tutorial will take you through the steps for adding a user to RealTimeCRM. <br><br> Click the menu button to start.",
      backdrop: false,
      reflex: true,
      placement: "left",
      onShown: function(t) {
        if (!Roles.userIsInRole(Meteor.userId(), 'Administrator')) {
          t.goTo(4);
        }
      },
    },
    {
      element: "#settings",
      title: "Add a user",
      content: "Click 'Settings' to navigate to the RealTimeCRM configuration pages.",
      backdrop: false,
      delay: 200,
      reflex: true,
      placement: "left",
    },
    {
      element: '#user-link',
      title: "Add a user",
      content: "Click on 'Users'",
      placement: "right",
      onNext: function(t) {
        FlowRouter.go('/settings/users');
      },
      reflex: true,
      delay: 500
    },
    {
      element: "#add-user",
      title: "Add a user",
      content: "As an admin, you can add, delete and edit users. Let's take a look at how to do this now. <br><br> Click this button to create a new user",
      placement: "left",
      delay: 500,
      reflex: true
    },
    {
      element: '#addUserName',
      title: "Add a user",
      content: "Enter details for your new user, and press 'Create' when finished. <br><br> The new user will be sent a confirmation email to the email address you provide below.",
      placement: "left",
      backdrop: false,
      reflex: true,
      delay: 500,
      template: TourTemplates.finalStep,
      onShown: function(t) {
        $(".modal-header button").click(function() {
          t.end();
        });
      }
    },
    {
      orphan: true,
      title: "Add user",
      template: TourTemplates.finalStep,
      content: "In order to use this tutorial you must be an administrator. Please contact your system administrator for help."
    }
  ],
  backdropPadding: 5,
  backdrop: true,
  storage: false,
  keyboard: false,
  template: TourTemplates.defaultStep
});

const UserTour = {
  start() {
    tour.init();
    if (tour._current !== null) {
      tour.restart();
      return;
    }
    tour.start();
  },
  end() {
    tour.end();
  }
};

export { UserTour };
