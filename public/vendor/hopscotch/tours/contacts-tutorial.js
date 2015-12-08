var sessionVar = 'hopscotch.contactsTutorialStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var contactsTutorial = {
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
			$.getScript('/vendor/hopscotch/tours/contacts-tutorial.js');
		} else {
				Modal.show('contactTutorialEnd');
		}
  },
  id: "contacts-tutorial",
  steps: [{
    title: "The Contact Tutorial",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. This interactive tutorial will take you through the steps for adding a contact, as well as some other nifty features.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		showCTAButton: true,
		ctaLabel: "Start Tutorial",
		onCTA: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Creating Contacts",
    content: "A CRM system isn't very useful without any Contacts, so lets take a look at how we create some. First, click the contacts button on the nav bar.",
    target: document.querySelector('#menuLinkContacts'),
    placement: "right",
		nextOnTargetClick: true,
		showNextButton: false,
		arrowOffset: "-1px"
	}, {
		title: "Viewing your Contacts",
		content: "This is your contacts list. If you can't see any contacts yet, don't worry, we'll add one now.",
		target: document.querySelector('#contacts-logo'),
		placement: "bottom",
		delay: 200
	}, {
		title: "Adding a Contact",
		content: "Click this button to add a contact",
		target: document.querySelector('#add-contact'),
		placement: "top",
		showNextButton: false,
		nextOnTargetClick: true
	}, {
		title: "Adding a Contact",
		content: "Type the contacts first name here...",
		target: document.querySelector('#addContactForename'),
		placement: "right",
		showNextButton: false,
		delay: 300,
		yOffset: "-15px",
		onShow: $("#addContactForename").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1000))
	}, {
		title: "Adding a Contact",
		content: "and their surname here...",
		target: document.querySelector('#addContactSurname'),
		placement: "right",
		showNextButton: false,
		yOffset: "-15px",
		onShow: $("#addContactSurname").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1000))
	}, {
		title: "Adding a Contact",
		content: "A name is all you need to create a contact, however, if you would like, you can add additional information. Do this now or click 'next' to continue.",
		target: document.querySelector('#addContactEmail'),
		placement: "right",
		yOffset: "-15px",
		smoothScroll: false,
		onShow: $("#addContactEmail").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1000))
	}, {
		title: "Adding a Contact",
		content: "Once you're done adding information, click the 'create' button",
		target: document.querySelector('#createContact'),
		placement: "left",
		showNextButton: false,
		nextOnTargetClick: true,
		smoothScroll: false
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
		title: "Contact Details",
		content: "This screen shows you the details about the selected contact. From here, you can also edit and delete contact information. This screen will show after creating a contact and when a contact is selected in the contacts list.",
		target: document.querySelector('#contact-details'),
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
	hopscotch.startTour(contactsTutorial, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(contactsTutorial);
}
