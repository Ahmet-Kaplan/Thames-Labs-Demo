var welcomeTour = {
  id: "welcome-tour",
  steps: [{
    title: "Welcome to RealTimeCRM!",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. If you're a new user, and would like to take our guided tour of the features available in RealTime, click the Next button. If you're already familiar with RealTime, or would prefer to find things out on your own, feel free to close this tour - we won't pester you with it again.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
    onShow: function() {
      Meteor.users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          "profile.welcomeTour": true
        }
      });
    }
  }, {
    title: "Navigation",
    content: "On the left-hand side of the screen, you'll find a sidebar containing a number of links, which will take you to the relevant sections. The sidebar is ever present, allowing you to navigate to anywhere, from anywhere.",
    target: document.querySelector('#id-view-sidemenu'),
    placement: "right"
  }, {
    title: "Quick Create Menu",
    content: "In order to maximise the efficiency of RealTime, there are some tasks that you can carry out from anywhere! By clicking this icon, you can quickly add data - simply choose what you want to add, and click it!",
    target: document.querySelector('#quick-create-menu'),
    placement: "left"
  }, {
    title: "Notifications",
    content: "Sometimes, we need to inform you of something important. When we do, this icon will change colour and a notification will appear in the menu. You can click each link to get more information.",
    target: document.querySelector('#notifications-menu'),
    placement: "left"
  }, {
    title: "User Menu",
    content: "The user menu contains several helpful links which will enhance your experience of RealTime and help us to make improvements. From here, you can change your password, send us feedback, and log out, amongst other things.",
    target: document.querySelector('#general-dropdown'),
    placement: "left"
  }, {
    title: "The Dashboard",
    content: "This is the dashboard. You'll land here every time you log into RealTime, or every time you click the Dashboard link. Clicking the RealTime logo will also bring you back here. The dashboard is unique in that you can fully tailor it to your liking via the use of widgets...",
    target: document.querySelector('#dashboard-icon'),
    placement: "right"
  }, {
    title: "The Dashboard - Widgets",
    content: "...which you can select from this menu. Widgets are persistent, so you'll see them every time you log in, and on every device you use, too. If you no longer want to see a widget, click the close button in the top-right corner - you can always re-add it later if needed.",
    target: document.querySelector('#widget-dropdown'),
    placement: "left"
  }, {
    title: "The Dashboard - Widgets",
    content: "Your current set of widgets will appear in the centre of the dashboard. You can resize them as you like by grabbing the small arrow in the bottom right of each and dragging to the size you want. If you wish to return to the default layout, simply open the Widget menu and click the Reset Dashboard item.",
    target: document.querySelector('#widget-dropdown'),
    placement: "left"
  }, {
    title: "Creating Companies",
    content: "In order to make the most of your experience with RealTime, you'll need some companies to work with. Let's go there now - if we click this link here...",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
    multipage: true,
    onNext: function() {
      window.location = "/companies"
    }
  }, {
    title: "Creating Companies",
    content: "...then we end up at the Company list.",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right"
  }, {
    title: "Company Sidebar",
    content: "This is the sidebar. From it, you can search your companies, and add new ones. By default, all of your companies are shown, but you can narrow the list by entering part of either the company name, or of an associated tag (more on tags later).",
    target: document.querySelector('.sidebar'),
    placement: "right"
  }, {
    title: "Creating a Company",
    content: "To create a company, simply click this button, fill in the form that appears and then click the Create button.",
    target: document.querySelector('.sidebar'),
    placement: "right"
  }],
  showPrevButton: true,
  showCloseButton: true
};

// Start the tour!
hopscotch.startTour(welcomeTour);
