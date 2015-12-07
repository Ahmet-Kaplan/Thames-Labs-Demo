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
				Modal.show('companyTutorialEnd');
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
		title: "Viewing Your Companies",
		content: "Here you can see a list of all the companies you have saved. If you dont have any yet don't worry, we'll add one now.",
		target: document.querySelector('#companies-logo'),
		placement: "bottom",
		delay: 200
	}, {
		title: "Adding a Company",
		content: "Click this button to add a company",
		target: document.querySelector('#add-company'),
		placement: "bottom",
		showNextButton: false,
		nextOnTargetClick: true,
		width: "200px"
	}, {
		title: "Adding a Company",
		content: "First, type the company's name in here...",
		target: document.querySelector('#addCompanyName'),
		placement: "right",
		showNextButton: false,
		onShow: $("#addCompanyName").keyup(_.debounce(function() {
			hopscotch.nextStep();
			$(this).unbind('keyup');
		}, 1000))
	}, {
		title: "Adding a Company",
		content: "...Now add an address for the company... Tip: Once you start typing, you can select the desired address from the drop-down. RealTimeCRM will then auto-fill the rest of the address fields for you.",
		target: document.querySelector('#geo'),
		placement: "right",
		showNextButton: false,
		smoothScroll: false,
		onShow: $("#geo").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1500)),
		onNext: function() {
			$('#draggableModal').animate({ scrollTop: $('#map_canvas').offset().top }, 500);
		}
	}, {
		title: "Adding a Company",
		content: "We'll even show you a map so you can make sure you have the correct address!",
		target: document.querySelector('#map_canvas'),
		placement: "right",
		smoothScroll: false,
		delay: 600
	}, {
		title: "Adding a Company",
		content: "You can also add a website or a phone number. Once you're done, just click 'Create'.",
		target: document.querySelector('#createCompany'),
		placement: "left",
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
		title: "Company Details",
		content: "This screen shows you the details about the selected company. From here, you can also edit and delete company information. This screen will show after creating a company and when a company is selected in the company list.",
		target: document.querySelector('#company-details'),
		yOffset: "centre",
		placement: "bottom",
		delay: 100,
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
