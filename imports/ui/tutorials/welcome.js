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
      backdropContainer: "#id-view-sidemenu",
      template: TourTemplates.navStep
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
      backdropContainer: "#id-view-sidemenu",
      template: TourTemplates.navStep
    },
    {
      element: "#add-company",
      title: "Click here",
      content: "Content of my step",
      reflex: true,
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
