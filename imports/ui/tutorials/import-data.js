import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#general-dropdown",
      title: "Import data",
      content: "This interactive tutorial will take you through the steps for importing your data into RealTimeCRM. <br><br> Click the menu button to start.",
      reflex: true,
      backdropContainer: ".navbar-nav.navbar-right",
      placement: "left",
      onShown: function(t) {
        if (!Roles.userIsInRole(Meteor.userId(), 'Administrator')) {
          t.goTo(4);
        }
      },
      onShow: function(t) {
        $('#id-view-sidemenu').css("z-index", "800");
      },
      onHide: function(t) {
        $('#id-view-sidemenu').css("z-index", "");
      }
    },
    {
      element: "#settings",
      title: "Import data",
      content: "Click 'Settings' to navigate to the RealTimeCRM configuration pages.",
      delay: 200,
      reflex: true,
      backdropContainer: "#user-dropdown .dropdown-menu",
      placement: "left",
      onShow: function(t) {
        $('#id-view-sidemenu').css("z-index", "800");
      },
      onHide: function(t) {
        $('#id-view-sidemenu').css("z-index", "");
      }
    },
    {
      element: '#import-link',
      title: "Import data",
      content: "Click on 'Import Data'",
      placement: "right",
      onNext: function(t) {
        FlowRouter.go('/settings/import');
      },
      reflex: true,
      delay: 500
    },
    {
      element: ".btn-group.bootstrap-select",
      title: "Import data",
      content: "Choose the type of data you would like to import, then follow the instructions shown on screen.",
      placement: "left",
      backdrop: false,
      reflex: true,
      delay: 500,
      template: TourTemplates.finalStep,
      onShown: function(t) {
        $(".btn-group.bootstrap-select").click(function() {
          t.end();
        });
        $(".upload-csv").click(function() {
          t.end();
        });
      }
    },
    {
      orphan: true,
      title: "Import data",
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

const ImportTour = {
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

export { ImportTour };
