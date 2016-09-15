import './menu-button/menu-button.js';
import './favourites/favourites.js';
import './side-menu.less';
import './side-menu.html';

Template.sideMenu.helpers({
  loggedIn: function() {
    return !!Meteor.userId();
  }
});

Template.sideMenu.events({
  'click #feedback-link-mobile': function(event) {
    console.log('feedback');
    event.preventDefault();
    Modal.show('feedbackModal');
  },
  'click #sign-out-mobile': function() {
    Meteor.logout(function(err) {
      FlowRouter.reload();
    });
  }
});
