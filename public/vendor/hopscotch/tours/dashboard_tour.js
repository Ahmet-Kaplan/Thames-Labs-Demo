var tour = {
  id: "dashboard-tour",
  steps: [{
    title: "RealTimeCRM Dashboard",
    content: "The dashboard acts as a hub for RealTimeCRM.",
    target: document.querySelector('#dashboard-page-header'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Dashboard - Chat",
    content: "The chatbox feature lets you chat with all of your online colleagues from within RealTimeCRM, regardless of whether they share your office, or are located on the other side of the world!",
    target: document.querySelector('#chatBox'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Dashboard - Quote of the Day",
    content: "Had one of those days? Let our inspirational quotations lift your spirits once more!",
    target: document.querySelector('#quoteBox'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Dashboard - Online Users",
    content: "Curious as to what your colleagues are up to, or even if they're online at all? Take a look here to easily locate them within RealTimeCRM.",
    target: document.querySelector('#onlineUsersBox'),
    placement: "bottom"
  }, {
    title: "RealTimeCRM Dashboard - Your Tasks",
    content: "Any tasks you (or anyone else, for that matter) set yourself throughout RealTimeCRM can be viewed, edited and even deleted from this panel.",
    target: document.querySelector('#entityTaskList'),
    placement: "top"
  }],
  showPrevButton: true,
  showCloseButton: true
};

// Start the tour!
hopscotch.startTour(tour);
