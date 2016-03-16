var sessionVar = 'hopscotch.tagsTutorialStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var tagsTutorial = {
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
			$.getScript('/vendor/hopscotch/tours/tags-tutorial-p1.js');
		} else {
				Modal.show('tagsTutorialEnd');
		}
  },
  id: "tags-tutorial",
  steps: [{
    title: "The Tags Tutorial",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. This interactive tutorial will show you how to add and use RealTimeCRM's powerful tagging system.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		showCTAButton: true,
		ctaLabel: "Start Tutorial",
		onCTA: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Creating Tags",
    content: "This tutorial assumes you have created a company. Please create one if you haven't already and restart the tutorial. If you have created a company, click the Companies opiton on the nav bar.",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
		nextOnTargetClick: true,
		showNextButton: false,
		arrowOffset: "-1px"
  }, {
    title: "",
		content: "",
		target: document.querySelector('#menuLinkCompanies'),
		placement: "right",
		smoothScroll: false,
		onShow: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Creating Tags",
    content: "Let's start by adding a single tag to a company. Click on the company you would like to add a tag to.",
    target: document.querySelector('#companySearchResults'),
    placement: "top",
    nextOnTargetClick: true,
    showNextButton: false
  }, {
    title: "",
		content: "",
		target: document.querySelector('#menuLinkCompanies'),
		placement: "right",
		smoothScroll: false,
		onShow: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Creating Tags",
    content: "To add a tag, click here.",
    target: document.querySelector('.editTags'),
    placement: "top",
    nextOnTargetClick: true,
    showNextButton: false
  }, {
    title: "Creating Tags",
    content: "Type the tag that you wish to create here and press the enter key to add it. To remove a tag, simply use the backspace button. Click Next when you're done.",
    target: document.querySelector('#tag-list-display'),
    placement: "bottom"
  }, {
		title: "",
		content: "",
		target: document.querySelector('#company-details'),
		placement: "bottom",
		onShow: function () {
			$.getScript('/vendor/hopscotch/tours/tags-tutorial-p2.js');
			hopscotch.endTour(true);
		}
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(tagsTutorial, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(tagsTutorial);
}
