var sessionVar = 'hopscotch.adminTutorialEndStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var adminTutorialEnd = {
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
			$.getScript('/vendor/hopscotch/tours/admin-tutorial-end.js');
		} else {
			Modal.show('adminTutorialEnd');
		}
  },
  id: "admin-tutorial-end",
  steps: [{
    title: "End of Tutorial!",
    content: "You now know how to find the admin area and create a user. To end this tutorial, just click the button below.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		showCTAButton: true,
		ctaLabel: "End Tutorial",
		onCTA: function() {
			Session.set(sessionVar);
			hopscotch.endTour(true);
		}
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(adminTutorialEnd, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(adminTutorialEnd);
}
