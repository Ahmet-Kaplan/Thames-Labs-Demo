import 'bootstrap-tour/build/css/bootstrap-tour.css';
import 'bootstrap-tour/build/js/bootstrap-tour.js';
import './bootstrap-tour.custom.css';
import { TourTemplates } from '/imports/ui/tutorials/api/tour-templates.js';

const tour = new Tour({
  steps: [
    {
      element: "#menu-link-companies",
      title: "Add a company",
      content: "This interactive tutorial will take you through the steps for adding a company. <br><br>  In order to make the most of your experience with Thames Labs, you'll need some companies to work with. Let's go to the companies list - just click the company option on the nav bar.",
      onNext: function() {
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
      element: "#add-company",
      template: TourTemplates.defaultStepWithTitle("Add a company"),
      content: "Below you can see a list of all your companies.  <br> To add a company, press the button above.",
      placement: "bottom",
      reflex: true
    },
    {
      element: "#companyName",
      title: "Add a company",
      content: "We understand filling out a huge form can be time consuming, so just provide Thames Labs with a company's name or website and it will do all the hard work for you!",
      placement: "right",
      backdrop: false,
      delay: 500,
      onShown: function(t) {
        $(".modal-header button").click(function() {
          t.end();
        });
        $("#companyName").keyup(function() {
          t.next();
        });
        $("#manual-fill").click(function() {
          t.goTo(4);
        });
      },
      onHide: function(t) {
        $("#companyName").unbind();
        $("#manual-fill").unbind();
      }
    },
    {
      element: ".modal-body",
      title: "Add a company",
      content: "Now select a company from the list of matching companies, or select 'Fill Manually' if there are no results.",
      reflex: true,
      placement: "right",
      backdrop: false,
      onShown: function(t) {
        $("#manual-fill").click(function() {
          t.next();
        });
      },
      onHide: function(t) {
        $("#manual-fill").unbind();
      }
    },
    {
      element: "#btnCreate",
      title: "Add a company",
      content: "If you clicked a suggested company, the form has now been automatically populated with information! Be sure to check everything is correct, and then click 'create'. If you clicked 'Fill Manually' fill out the data you require and click 'create'.",
      reflex: true,
      backdrop: false,
      placement: "left",
      delay: 500,
      onShown: function(t) {
        $("#search-again").click(function() {
          t.goTo(2);
          $("#search-again").unbind('click');
        });
      }
    },
    {
      element: "#company-details",
      title: "Company details",
      content: "This screen shows you the details about the selected company. From here, you can also edit and delete company information.  <br><br>  This screen will show after creating a company and when a company is selected in the company list.",
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

const CompanyTour = {
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

export { CompanyTour };
