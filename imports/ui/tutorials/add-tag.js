import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-companies",
      title: "Add tags",
      content: "This interactive tutorial will take you through the steps for adding a tag to a company. <br><br> Tags are a simple and easy way of grouping related records, and this tutorial will show you how to get started.",
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
      element: '.list-group:first-child',
      title: "Add a tag",
      content: "Let's start by adding a single tag to a company. <br><br> Click on the company you would like to add a tag to.",
      backdrop: false,
      reflex: true,
      delay: 500,
      placement: "top",
      onShown: function(t) {
        if ($('#companySearchResults').html().indexOf("No results found") >= 0) {
          t.goTo(4);
        }
      }
    },
    {
      element: ".editTags",
      title: "Add a tag",
      content: "To add a tag, click here.",
      placement: "left",
      reflex: true,
      delay: 500
    },
    {
      element: "#tag-list-display",
      title: "Add a tag",
      content: "Type the tag that you wish to create here and press the enter key to add it. To remove a tag, simply use the backspace button.",
      template: TourTemplates.finalStep,
      placement: "bottom",
    },
    {
      orphan: true,
      title: "Add tags",
      template: TourTemplates.finalStep,
      content: "In order to use this tutorial a company must be added to RealTimeCRM. Please add a company before continuing."
    }
  ],
  backdropPadding: 5,
  backdrop: true,
  storage: false,
  keyboard: false,
  template: TourTemplates.defaultStep
});

const TagsTour = {
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

export { TagsTour };
