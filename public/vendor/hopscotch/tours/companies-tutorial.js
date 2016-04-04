var sessionVar = 'hopscotch.companyTutorialStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var companiesTutorial = {
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
			$.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
		} else {
				lastTutorial = "addCompany";
				Modal.show('help');
		}
  },
  id: "companies-tutorial",
  steps: [{
    title: "The Company Tutorial",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. This interactive tutorial will take you through the steps for adding a company, as well as some other nifty features.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		showCTAButton: true,
		ctaLabel: "Start Tutorial",
		onCTA: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Creating Companies",
    content: "In order to make the most of your experience with RealTime, you'll need some companies to work with. Let's go there now - just click the company option on the nav bar.",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
		nextOnTargetClick: true,
		showNextButton: false,
		arrowOffset: "-1px"
	}, {
		title: "",
		content: "",
		target: document.querySelector('#menuLinkContacts'),
		placement: "right",
		smoothScroll: false,
		onShow: function() {
			hopscotch.nextStep();
		}
	}, {
		title: "Adding a Company",
		content: "Below you can see a list of all your companies. If you dont have any yet don't worry, click this button to add one now.",
		target: document.querySelector('#add-company'),
		placement: "bottom",
		showNextButton: false,
		nextOnTargetClick: true,
		zindex: 1000,
		delay: 10
	}, {
		title: "Adding a Company",
		content: "We understand filling out a huge form can be time consuming, so just provide RealTimeCRM with a comapanies name or website and it will do all the hard work for you!",
		target: document.querySelector('#companyName'),
		placement: "right",
		showNextButton: false,
		delay: 100,
		onShow: $("#companyName").keyup(_.debounce(function() {
			hopscotch.nextStep();
			$(this).unbind('keyup');
		}, 1000))
	}, {
		title: "Adding a Company",
		content: "Now select a company from the list of matching companies, or select 'Fill Manually' if there are no results.",
		target: document.querySelector('.modal-body'),
		placement: "left",
		showNextButton: false,
		nextOnTargetClick: true
	}, {
		title: "Adding a Company",
		content: "If you clicked a suggested company, the form has now been automatically populated with information! Be sure to check everything is correct, and then click 'create'. If you clicked 'Fill Manually' fill out the data you require and click 'create'.",
		target: document.querySelector('#btnCreate'),
		placement: "left",
		showNextButton: false,
		yOffset: -500
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
		title: "Company Details",
		content: "This screen shows you the details about the selected company. From here, you can also edit and delete company information. This screen will show after creating a company and when a company is selected in the company list.",
		target: document.querySelector('#company-details'),
		yOffset: "centre",
		placement: "bottom",
		delay: 100,
		zindex: 1000,
		onShow: function() {
			Session.set(sessionVar);
		}
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(companiesTutorial, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(companiesTutorial);
}
