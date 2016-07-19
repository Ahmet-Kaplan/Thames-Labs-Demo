import './footer.css';
import './footer.html';

//Hide the splashscreen as quickly as possible
Template.footer.onRendered(function() {
  if (Meteor.isCordova) {
    navigator.splashscreen.hide();
  }
});
