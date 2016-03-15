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
				Modal.show('tagsTutorialEnd');
		}
  },
  id: "tags-tutorial-p2",
  steps: [{
    title: "Bulk Tagging",
    content: "You should now see any tags that you added! But what if you want to add tags to multiple companies at once? Let's have a look at that now, Click on Companies in the nav bar.",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
    showNextButton: false,
    nextOnTargetClick: true,
    onShow: function() {
      console.log("1");
    }
  },{
    title: "",
    content: "",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
    smoothScroll: false,
    onShow: function() {
      console.log("2");
      hopscotch.nextStep();
    }
  }, {
    title: "Bulk Tagging",
    content: "To add tags to multiple companies at once, click this button",
    target: document.querySelector('#manage-tags'),
    placement: "left",
    showNextButton: false,
    nextOnTargetClick: true,
    onShow: function () {
      console.log("3");
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
