var tour = {
  id: "companies-tour",
  steps: [{
    title: "RealTimeCRM Companies",
    content: "This page lists all companies you have currently stored in RealTimeCRM.",
    target: document.querySelector('#companies-page-header'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Companies - Search",
    content: "The search box lets you filter down the list of displayed companies. Filters are currently applied to company names and tags.",
    target: document.querySelector('input.form-control'),
    placement: "right"
  }, {
    title: "RealTimeCRM Companies - List",
    content: "Your companies are listed here. If you have a lot of them, you can click the 'Show More' button at the bottom of the page to load them.",
    target: document.querySelector('.list-group'),
    placement: "left"
  }, {
    title: "RealTimeCRM Companies - Add",
    content: "You can click this button to create a new company record.",
    target: document.querySelector('#createCompany'),
    placement: "right"
  }, {
    title: "RealTimeCRM Companies - Company",
    content: "You can click any company in the list to navigate to the details page for it.",
    target: document.querySelector('#mchCompany'),
    placement: "left"
  }, {
    title: "RealTimeCRM Companies - Tags",
    content: "Any tags stored against your companies will be shown here.",
    target: document.querySelector('#mchCompany span.pull-right'),
    placement: "left"
  }],
  showPrevButton: true,
  showCloseButton: true
};

// Start the tour!
hopscotch.startTour(tour);
