import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-contacts",
      title: "Add a contact",
      content: "This interactive tutorial will take you through the steps for adding a contact. <br><br>  In order to make the most of your experience with RealTimeCRM, you'll need some contacts to work with. Let's go to the contacts list - just click the contacts option on the nav bar.",
      onNext: function() {
        FlowRouter.go('/contacts');
      },
      reflex: true,
      backdropContainer: "#id-view-sidemenu",
      template: TourTemplates.navStep,
      onShow: function(t) {
        $('#id-view-sidemenu').css("overflow", "visible");
      },
      onHide: function(t) {
        $('#id-view-sidemenu').css("overflow", "");
      }
    },
    {
      element: "#add-contact",
      template: TourTemplates.defaultStepWithTitle("Add a contact"),
      content: "Below you can see a list of all your contacts. <br> To add a contact, press the button above.",
      placement: "bottom",
      reflex: true
    },
    {
      element: "#addContactForename",
      title: "Add a contact",
      content: "Enter the first name of your contact.",
      placement: "right",
      backdrop: false,
      delay: 500,
      onShown: function(t) {
        $(".modal-header button").click(function() {
          t.end();
        });
        $("#addContactForename").blur(() => {
          t.next();
        });
      },
      onHide: function(t) {
        $("#addContactForename").unbind();
      }
    },
    {
      element: '#addContactSurname',
      title: "Add a contact",
      content: "Enter the last name of your contact. A name is all you need to create a contact, however you can add additional information. <br><br> Once you're done adding information, click the 'create' button below.",
      placement: "right",
      backdrop: false,
      onShown: function(t) {
        $("#createContact").click(function() {
          t.next();
        });
      }
    },
    {
      element: "#contact-details",
      title: "Contact details",
      content: "This screen shows you the details about the selected contact. From here, you can also edit and delete contact information. <br><br> This screen will show after creating a contact and when a contact is selected in the contact list.",
      template: TourTemplates.finalStep,
      placement: "left",
      delay: 500
    }
  ],
  backdropPadding: 5,
  backdrop: true,
  storage: false,
  keyboard: false,
  template: TourTemplates.defaultStep
});

const ContactTour = {
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

export { ContactTour };
