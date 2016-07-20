var sessionVar = 'hopscotch.adminTutorialStep';

var updateSessionVar = function() {
	Session.set(sessionVar, hopscotch.getCurrStepNum());
};

var adminTutorial = {
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
			$.getScript('/vendor/hopscotch/tours/admin-tutorial.js');
		} else {
			lastTutorial = "admin";
			Modal.show('help');
		}
  },
  id: "admin-tutorial",
  steps: [{
    title: "The Admin Tutorial",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. This interactive tutorial will take you through the steps for adding users, and show you how to use your admin powers.",
    target: document.querySelector('.navbar-brand'),
    placement: "right",
		showNextButton: false,
		showCTAButton: true,
		ctaLabel: "Start Tutorial",
		onCTA: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Navigating to the Admin Panel",
    content: "First, click your name up here to open the menu",
    target: document.querySelector('#general-dropdown'),
    placement: "left",
    showNextButton: false,
    nextOnTargetClick: true
  }, {
    title: "Navigating to the Admin Panel",
    content: "Select 'Settings' from the menu",
    target: document.querySelector('#global-search'),
    placement: "left",
    yOffset: "40px",
		xOffset: "10px",
    showNextButton: false,
    nextOnTargetClick: true
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
    title: "The Admin Panel",
    content: "This is the admin panel. Let's take a look around...",
    target: document.querySelector('#settings-nav'),
    placement: "right"
  }, {
    title: "Navigating to user settings",
    content: "Select 'Users' from the menu",
    target: document.querySelector('a[href="users"]'),
    placement: "right",
		xOffset: "10px",
    showNextButton: false,
    nextOnTargetClick: true
  }, {
    title: "",
		content: "",
		target: document.querySelector('.entity-name'),
    placement: "top"
  }, {
		title: "Adding Users",
		content: "As an admin, you can add, delete and edit users. Let's take a look at how to do this now... Click this button to create a new user",
		delay: 300,
		yOffset: "-25px",
		target: document.querySelector('#add-user'),
		placement: "left",
		showNextButton: false,
		nextOnTargetClick: true
	}, {
		title: "Adding Users",
		content: "Type the users name here...",
		yOffset: "-10px",
		delay: 300,
		target: document.querySelector('#addUserName'),
		placement: "right",
		showNextButton: false,
		onShow: $("#addUserName").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1000))
	}, {
		title: "Adding Users",
		content: "... and their email address here. This is where the set up email is sent so please make sure it is a valid email address.",
		yOffset: "-10px",
		target: document.querySelector('#addUserEmail'),
		placement: "right",
		showNextButton: false,
		onShow: $("#addUserEmail").keyup(_.debounce(function(e) {
			if (e.keyCode != 9) {
				hopscotch.nextStep();
				$(this).unbind('keyup');
			}
		}, 1000))
	}, {
		title: "Adding Users",
		content: "Now click 'Create' and you're done!",
		target: document.querySelector('#createUser'),
		placement: "left",
		showNextButton: false,
		onShow: $("#createUser").click(function() {
			setTimeout(function() {
				$(this).unbind('click');
				$("#addUserEmail").unbind('keyup');
				Session.set(sessionVar);
				if ($("#draggableModal").is(':visible')) {
					$.getScript('/vendor/hopscotch/tours/admin-tutorial-end.js');
				}
				hopscotch.endTour(true);
			}, 500);
		})
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(adminTutorial, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(adminTutorial);
}
