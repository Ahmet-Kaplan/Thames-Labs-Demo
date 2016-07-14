var sessionVar = 'hopscotch.tagsTutorial2Step';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var tagsTutorial2 = {
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
			$.getScript('/vendor/hopscotch/tours/tags-tutorial-p2.js');
		} else {
			lastTutorial = "addTags"
			Modal.show('help');
		}
  },
  id: "tags-tutorial-p2",
  steps: [{
    title: "Bulk Tagging",
    content: "You should now see any tags that you added! But what if you want to add tags to multiple companies at once? Let's have a look at that now, Click on Companies in the nav bar.",
    target: document.querySelector('#menu-link-companies'),
    placement: "right",
    showNextButton: false,
    nextOnTargetClick: true
	}, {
		title: "",
		content: "",
		target: document.querySelector('#menu-link-companies'),
		placement: "right",
		smoothScroll: false,
		onShow: function() {
			hopscotch.nextStep();
		}
	}, {
		title: "Bulk Tagging",
		content: "This button allows you to manage tags for all of the companies in the list shown below. You can refine the list of companies by searching and filtering.",
		target: document.querySelector('#manage-tags'),
		placement: "left",
		nextOnTargetClick: true,
		showNextButton: false,
		delay: 100
	}, {
		title: "Bulk Tagging",
		content: "Just as before, type in any tags you wish to add in this box, pressing the enter key after each one. To remove tags, switch the 'Current Mode' to 'Remove' and press backspace on the tag you wish to remove.",
		target: document.querySelector('.selectize-control'),
		placement: "right",
		onNext: function() {
			Modal.hide();
		}
	},{
		title: "Tutorial Complete!",
		content: "Now your tags can be seen in the list. Click 'Done' to complete this tutorial.",
		target: document.querySelector('#company-list'),
		placement: "top",
		onShow: function() {
			Session.set(sessionVar);
		}
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(tagsTutorial2, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(tagsTutorial2);
}
