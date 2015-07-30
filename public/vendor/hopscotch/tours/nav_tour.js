var tour = {
  id: "nav-tour",
  steps: [{
    title: "Welcome to RealTimeCRM!",
    content: "Across the top of every page, you'll find the Action Bar, which contains links to several of RealTimeCRM's most common features. Click the Next button to commence the tour!",
    target: document.querySelector('a.navbar-brand'),
    placement: "right"
  }, {
    title: "Navigation - Action Bar",
    content: "The Quick Menu provides you with the quickest way to create several core entities.",
    target: document.querySelector('#quick-create-menu'),
    placement: "left"
  }, {
    title: "Navigation - Action Bar",
    content: "The User Menu provides you with the several options. From here, you can leave feedback, change your password and sign out.",
    target: document.querySelector('#general-dropdown'),
    placement: "left"
  }, {
    title: "Navigation - Action Bar",
    content: "Any notifications raised by our team of developers will be found here. If there are new notifications, the icon will change colour.",
    target: document.querySelector('#notifications-menu'),
    placement: "left"
  }, {
    title: "Navigation - Sidebar",
    content: "Use the sidebar to navigate amongst your data.",
    target: document.querySelector('#id-view-sidemenu'),
    placement: "right"
  }],
  showPrevButton: true,
};

// Start the tour!
hopscotch.startTour(tour);
