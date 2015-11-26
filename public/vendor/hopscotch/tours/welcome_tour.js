var sessionVar = 'hopscotch.welcomeTourStep';

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
	onEnd: function() {
		// onEnd fires on route changes, so check if we're actually finished and
		// resume if not
		if (Session.get(sessionVar)) {
			$.getScript('/vendor/hopscotch/tours/welcome_tour.js');
		} else {
			Meteor.call('welcomeTour.deleteTourData', function(err,res){
				if(err) throw new Meteor.Error(err);
				Modal.show('tourEnd');
			});
		}
  },
  id: "welcome-tour",
  steps: [{
		id: "welcome",
    title: "Welcome to RealTimeCRM!",
    content: "Welcome to RealTimeCRM, an easy-to-use, cross-platform CRM from Cambridge Software. Click the Next button to start the tour.",
    target: document.querySelector('.navbar-brand'),
    placement: "right"
  }, {
    title: "Navigation",
    content: "On the left-hand side of the screen, you'll find a sidebar containing a number of links, which will take you to the relevant sections. The sidebar is ever present, allowing you to navigate to anywhere, from anywhere.",
    target: document.querySelector('#id-view-sidemenu'),
    placement: "right"
  }, {
    title: "Quick Create Menu",
    content: "In order to maximise the efficiency of RealTime, there are some tasks that you can carry out from anywhere! By clicking this icon, you can quickly add data - simply choose what you want to add, and click it!",
    target: document.querySelector('#quick-create-menu'),
    placement: "left"
  }, {
    title: "Notifications",
    content: "Sometimes, we need to inform you of something important. When we do, this icon will change colour and a notification will appear in the menu. You can click each link to get more information.",
    target: document.querySelector('#notifications-menu'),
    placement: "left"
  }, {
    title: "User Menu",
    content: "The user menu contains several helpful links which will enhance your experience of RealTime and help us to make improvements. From here, you can change your password, send us feedback, and log out, amongst other things.",
    target: document.querySelector('#general-dropdown'),
    placement: "left"
  }, {
    title: "The Dashboard",
    content: "This is the dashboard. You'll land here every time you log into RealTime, or every time you click the Dashboard link. Clicking the RealTime logo will also bring you back here. The dashboard is unique in that you can fully tailor it to your liking via the use of widgets...",
    target: document.querySelector('#dashboard-icon'),
    placement: "right"
  }, {
    title: "The Dashboard - Widgets",
    content: "...which you can select from this menu. Widgets are persistent, so you'll see them every time you log in, and on every device you use, too. If you no longer want to see a widget, click the close button in the top-right corner - you can always re-add it later if needed.",
    target: document.querySelector('#widget-dropdown'),
    placement: "left"
  }, {
    title: "The Dashboard - Widgets",
    content: "Your current set of widgets will appear in the centre of the dashboard. You can resize them as you like by grabbing the small arrow in the bottom right of each and dragging to the size you want. If you wish to return to the default layout, simply open the Widget menu and click the Reset Dashboard item.",
    target: document.querySelector('#widget-dropdown'),
    placement: "left"
  }, {
    title: "Creating Companies",
    content: "In order to make the most of your experience with RealTime, you'll need some companies to work with. Let's go there now - if we click this link here...",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
    onNext: function() {
			updateSessionVar();
			FlowRouter.go('companies');
    }
  }, {
    title: "Creating Companies",
    content: "...then we end up at the Company list.",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right"
  }, {
    title: "Creating a Company",
    content: "To create a company, simply click this button, fill in the form that appears and then click the Create button. ",
    target: document.querySelector('#add-company'),
    placement: "left"
  }, {
    title: "Viewing Your Companies",
    content: "Any companies you or your colleagues create will be listed here. You can access further information by left-clicking an item in the list.",
    target: document.querySelector('#companySearchResults'),
    placement: "top"
  }, {
    title: "Viewing Your Companies",
    content: "To continue this tour, we'll create a company for you - click the Next button to do this now. Once created, we'll take you to the company detail page for the new company.",
    target: document.querySelector('#add-company'),
    placement: "left",
    onNext: function() {
			updateSessionVar();
      Meteor.call('welcomeTour.createDemoCompany', function(err, data) {
        if (err) throw new Meteor.Error(err);
				FlowRouter.go('company', {id: data});
      });
    }
  }, {
    title: "",
    content: "",
    target: document.querySelector('#menuLinkCompanies'),
    placement: "right",
		onShow: function() {
			hopscotch.nextStep();
		}
  }, {
    title: "Viewing Company Data",
    content: "Whenever you create a company record, you will automatically be taken to the detail page for it. Down the centre of the screen you'll find information about the company, as well as information regarding associated contacts, projects and other associated RealTime entities.",
    target: document.querySelector('#company-details'),
    placement: "right"
  }, {
    title: "Navigating Company Data",
    content: "Similar to the company list, the company detail page contains a sidebar with a number of links which you can use to quickly jump to specific areas of the page. This sidebar will scroll with you as you navigate up and down the page.",
    target: document.querySelector('#action-side-bar'),
    placement: "right"
  }, {
    title: "Tagging A Company",
    content: "You can add custom tags to your company by typing them into this box. As you type, a list of similar tags that already exist will appear - if you want to use one of those instead, simply left-click it. If the tag doesn't already exist, you can add it by pressing enter; it will then show up in subsequent tagging exercises. Tags will appear both here and in the company list - clicking them in the list will filter it to only companies who have that tag assigned.",
    target: document.querySelector('#toggleTags'),
    placement: "right"
  }, {
    title: "Removing A Company Tag",
    content: "To remove a tag, place your cursor after it in the list and press the Backspace key. If you've used it in several places, then the tag will still appear in the list when you add new ones, otherwise, it will be fully removed. Tags are independent of entity - if you have the same tag for companies and contacts, removing all instances of it against companies will not affect the contact tags in any way.",
    target: document.querySelector('#toggleTags'),
    placement: "right"
  }, {
    title: "Editing Details",
    content: "If you need to edit the details stored against a company, click this button and make changes in the form that appears. Click Update - your changes will be reflected on this page, and any other users looking at the page will also see the new information.",
    target: document.querySelector('#edit-company'),
    placement: "right"
  }, {
    title: "Deleting A Company",
    content: "Press this button if you wish to remove a company from the system. You will be prompted for confirmation, but please bear in mind that this operation is final and the data cannot be recovered once deleted.",
    target: document.querySelector('#remove-company'),
    placement: "right"
  }, {
    title: "Adding Associated Entities",
    content: "To enhance your Realtime experience, you can add related entities to your company direct from this page! Click here...",
    target: document.querySelector('#add-contact'),
    placement: "left"
  }, {
    title: "Adding Associated Entities",
    content: "...or here...",
    target: document.querySelector('#add-project'),
    placement: "left"
  }, {
    title: "Adding Associated Entities",
    content: "...or here...",
    target: document.querySelector('#add-purchase-order'),
    placement: "left"
  }, {
    title: "Adding Associated Entities",
    content: "...or here, to add the entity type that you need.",
    target: document.querySelector('#btnAddTaskToEntity'),
    placement: "left"
  }, {
    title: "Adding Extended Information",
    content: "Whilst we try to be as accommodating to your needs as possible, sometimes you need to store a bit of unusual data, such as a company's opening times, or a contacts birthday. Extended information is designed to allow you, as a user, to define your own data storage. There are two types of extended information: normal, as we've demonstrated, and global. Global fields can only be added by your organisation's administrators, but they do appear on ALL entities that they are assigned to (i.e. all companies). To add 'normal' extended information, click this button and fill in the form.",
    target: document.querySelector('#add-custom-field'),
    placement: "left"
  }, {
    title: "Editing Extended Information",
    content: "To edit extended information, click this button. The form that appears will allow you to edit all of your extended information at once - anything you don't change will remain untouched, so feel free to leave fields as they are.",
    target: document.querySelector('#edit-custom-fields'),
    placement: "left"
  }, {
    title: "More On Extended Information",
    content: "All extended information will appear here. You can delete extended information entries by clicking the Delete button next to the relevant entry. Note that only your organisation's administrators can delete global extended information.",
    target: document.querySelector('#custom-field-container'),
    placement: "right",
		onShow: function() {
			Session.set(sessionVar);
		}
  }],
  showCloseButton: true
};

// Start the tour!
if (Session.get(sessionVar)) {
	hopscotch.startTour(welcomeTour, Session.get(sessionVar));
} else {
	hopscotch.startTour(welcomeTour);
}
