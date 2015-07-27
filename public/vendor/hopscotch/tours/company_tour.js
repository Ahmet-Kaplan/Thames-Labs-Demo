var tour = {
  id: "company-tour",
  steps: [{
    title: "RealTimeCRM Company Details",
    content: "This page shows all data that you currently store with regard to the selected company.",
    target: document.querySelector('#company-details'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Company Details - Actions",
    content: "You can use the actions sidebar to quickly jump between sections of the page.",
    target: document.querySelector('#action-side-bar'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Tags",
    content: "You can add and remove tags in this area.",
    target: document.querySelector('#tag-list-display'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - General",
    content: "Generic company data is displayed in this area. You can use the 'Edit' and 'Delete' buttons to update and remove a company, respectively.",
    target: document.querySelector('#company-details-panel'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Address",
    content: "The map that loads in this panel will centre on the company location. You can also drag and zoom to give you a better idea of where things are.",
    target: document.querySelector('.map-container'),
    placement: "left"
  }, {
    title: "RealTimeCRM Company Details - Contacts",
    content: "All of the contacts that you have stored against this company will be displayed here. Clicking one will take you to the details page for that contact.",
    target: document.querySelector('#contacts'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Projects",
    content: "All projects that you have with this company will be displayed in this panel.",
    target: document.querySelector('#projects'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Purchase Orders",
    content: "Any purchase orders you have undertaken with this company can be seen here.",
    target: document.querySelector('#purchase-orders'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Tasks",
    content: "Tasks against this company are listed here. Tasks for all users are shown, including yours.",
    target: document.querySelector('#tasks'),
    placement: "right"
  }, {
    title: "RealTimeCRM Company Details - Custom Fields",
    content: "Need to store data against a company, but we haven't provided a section for it? Use a custom field! All existing custom fields are displayed in this section.",
    target: document.querySelector('#custom-fields'),
    placement: "top"
  }, {
    title: "RealTimeCRM Company Details - Activities",
    content: "Use the Activities area to note developments, commmunications and the like between yourself and the selected company..",
    target: document.querySelector('#activity-timeline'),
    placement: "top"
  }],


  showPrevButton: true,
  showCloseButton: true
};

// Start the tour!
hopscotch.startTour(tour);
