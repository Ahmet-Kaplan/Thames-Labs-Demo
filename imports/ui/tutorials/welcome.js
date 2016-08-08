import 'jquery';
import 'bootstrap-tour/build/css/bootstrap-tour.min.css';
import 'bootstrap-tour/build/js/bootstrap-tour.min.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-dashboard",
      title: "Title of my step",
      content: "Content of my step",
      onNext: function() {
        FlowRouter.go('/');
      },
      reflex: true,
      template: TourTemplates.navStep,
      backdropContainer: "#id-view-sidemenu",
      onShow: function(t) {
        $('#id-view-sidemenu').css("overflow", "visible");
      },
      onHide: function(t) {
        $('#id-view-sidemenu').css("overflow", "");
      }
    },
    {
      element: "#addWidgetButton",
      title: "Click here",
      content: "Content of my step",
      reflex: true,
      placement: "left"
    },
    {
      element: "#menu-link-companies",
      title: "Click here",
      content: "Content of my step",
      onNext: function() {
        FlowRouter.go('/companies');
      },
      reflex: true,
      template: TourTemplates.navStep,
      backdropContainer: "#id-view-sidemenu",
      onShow: function(t) {
        $('#id-view-sidemenu').css("overflow", "visible");
      },
      onHide: function(t) {
        $('#id-view-sidemenu').css("overflow", "");
      }
    },
    {
      element: "#add-company",
      content: "Content of my step",
      template: TourTemplates.defaultStepWithTitle("Click here"),
      reflex: true
    },
    {
      element: "#companyName",
      title: "Example modal step",
      content: "Ensure the delay is present, no backdrop, and the tour ends when the close button is pressed",
      placement: "right",
      backdrop: false,
      delay: 500,
      onShown: function(t) {
        $(".modal-header button").click(function() {
          t.end();
        });
      },
      template: TourTemplates.finalStep
    }
  ],
  storage: false,
  backdropPadding: 5,
  keyboard: false,
  backdrop: true,
  template: TourTemplates.defaultStep
});

const WelcomeTour = {
  start() {
    tour.init();
    if (tour._current !== null) {
      tour.restart();
      return;
    }
    tour.start();
  }
};

export { WelcomeTour };
