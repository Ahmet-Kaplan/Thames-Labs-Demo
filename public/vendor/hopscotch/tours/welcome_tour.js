var sessionVar = 'hopscotch.welcomeTourStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var welcomeTour = {
	onShow: function() {
		updateSessionVar();
	},
	onClose: function() {
		// Clear sessionVar as we're actually done
		Session.set(sessionVar);
		hopscotch.endTour(true);
  },
	onEnd: function() {
		// onEnd fires on route changes, so check if we're actually finished and
		// resume if not
		if (Session.get(sessionVar)) {
			$.getScript('/vendor/hopscotch/tours/welcome_tour.js');
		} else {
			Meteor.call('welcomeTour.deleteTourData', function(err,res){
				if(err) throw new Meteor.Error(err);
				Modal.show('tourEnd');
			});
		}
  },
  id: "welcome-tour",
  steps: [{
		id: "welcome",
    title: "Welcome to RealTimeCRM!",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. Click the Next button to start the tour.",
    target: document.querySelector('.navbar-brand'),
    placement: "right"
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
    placement: "left",
		onShow: function() {
			Session.set(sessionVar);
		}
  }],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(welcomeTour, Session.get(sessionVar));
} else {
	hopscotch.startTour(welcomeTour);
}
