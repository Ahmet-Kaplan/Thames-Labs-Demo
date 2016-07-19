import 'jquery';
import 'bootstrap-tour/build/css/bootstrap-tour.min.css';
import 'bootstrap-tour/build/js/bootstrap-tour.min.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-dashboard",
      title: "Title of my step",
      content: "Content of my step"
    },
    {
      element: "#addWidgetButton",
      title: "Click here",
      content: "Content of my step",
      placement: "left"
    },
    {
      element: "#menu-link-companies",
      title: "Click here",
      content: "Content of my step",
      onNext: function() {
        FlowRouter.go('/companies');
      },
      reflex: true
    },
    {
      element: "#add-company",
      title: "Click here",
      content: "Content of my step",
      reflex: true,
      backdrop: true
    }
  ],
  storage: false
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
