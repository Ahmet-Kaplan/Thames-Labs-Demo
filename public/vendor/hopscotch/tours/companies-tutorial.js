var sessionVar = 'hopscotch.companyTutorialStep';

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
	onEnd: function(){
		// onEnd fires on route changes, so check if we're actually finished and
		// resume if not
		if (Session.get(sessionVar)) {
			$.getScript('/vendor/hopscotch/tours/companies-tutorial.js');
		} else {
			Meteor.call('welcomeTour.deleteTourData', function(err,res){
				if(err) throw new Meteor.Error(err);
				Modal.show('tourEnd');
			});
		}
  },
  id: "welcome-tour",
  steps: [{
    title: "Welcome to RealTimeCRM!",
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
		target: document.querySelector('#companySearchResults'),
		placement: "top",
		delay: 200
	}, {
		title: "Adding a Company",
		content: "Click this button to add a company",
		target: document.querySelector('#add-company'),
		placement: "top",
		showNextButton: false,
		nextOnTargetClick: true,
		width: "200px"
	}, {
		title: "Adding a Company",
		content: "First, type the company's name in here...",
		target: document.querySelector('#addCompanyName'),
		placement: "right",
		showNextButton: false,
		delay: 400,
		onShow: $("#addCompanyName").keyup(_.debounce(function(){
			hopscotch.nextStep();
			$(this).unbind('keyup');
		}, 1500))
	}, {
		title: "Adding a Company",
		content: "...Now add an address for the company... Tip: Once you start typing, you can select the desired address from the drop-down. RealTimeCRM will then auto-fill the rest of the address fields for you.",
		target: document.querySelector('#geo'),
		placement: "right",
		showNextButton: false,
		smoothScroll: false,
		onShow: $("#geo").keyup(_.debounce(function(){
			hopscotch.nextStep();
			$(this).unbind('keyup');
		}, 2000)),
		onNext: function() {
			$('#draggableModal').animate({ scrollTop: $('#map_canvas').offset().top }, 500);
		}
	}, {
		title: "Adding a Company",
		content: "We'll even show you a map so you can make sure you have the correct address!",
		target: document.querySelector('#map_canvas'),
		placement: "right",
		smoothScroll: false,
		delay: 600,
		onShow: function() {
			window.setTimeout(function() {
				hopscotch.nextStep();
			}, 3000))
	}, {
		title: "Adding a Company",
		content: "You can also add a website or a phone number. Once you're done, just click 'Create'.",
		target: document.querySelector('#createCompany'),
		placement: "left",
		arrowOffset: "50px"
	}],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(welcomeTour, Session.get(sessionVar) + 1);
} else {
	hopscotch.startTour(welcomeTour);
}
