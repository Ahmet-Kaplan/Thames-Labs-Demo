import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-companies",
      title: "Search and filters",
      content: "This interactive tutorial will teach you how to use the advanced search and filter functionality in Thames Labs.",
      onNext: function(t) {
        FlowRouter.go('/companies');
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
      element: '.easysearch-input',
      title: "Search and filters",
      template: TourTemplates.defaultStepWithNextButton,
      content: "This is the search box. You can type what you are looking for into the box above, and you will see the results update in the list below as you type.",
      delay: 500,
      placement: "bottom",
    },
    {
      element: '.filter-panel',
      title: "Search and filters",
      template: TourTemplates.defaultStepWithNextButton,
      content: "This is the filter box. Click and type here to add filters that limit what companies are shown on the list below. <br><br> You can add as many filters as you would like. To remove a filter simply click on it.",
      placement: "left",
    },
    {
      element: '#resetSearch',
      title: "Search and filters",
      template: TourTemplates.defaultStepWithNextButton,
      content: "Click here to clear all search and filters. This is useful if you need to see all companies on the list.",
      placement: "left",
    },
    {
      element: '#export',
      title: "Search and filters",
      template: TourTemplates.finalStep,
      content: "To export the companies shown in the below list, press here. <br><br> This will download a CSV file to your computer that contains all of the records that match your search and filter queries.",
      placement: "bottom",
    }
  ],
  backdropPadding: 5,
  backdrop: true,
  storage: false,
  keyboard: false,
  template: TourTemplates.defaultStep
});

const SearchFilterTour = {
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

export { SearchFilterTour };
