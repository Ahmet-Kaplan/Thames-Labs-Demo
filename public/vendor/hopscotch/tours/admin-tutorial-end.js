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
			lastTutorial = "admin";
			Modal.show('help');
		}
  },
  id: "admin-tutorial-end",
  steps: [{
    title: "",
    content: "",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		onShow: function() {
			hopscotch.nextStep();
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
