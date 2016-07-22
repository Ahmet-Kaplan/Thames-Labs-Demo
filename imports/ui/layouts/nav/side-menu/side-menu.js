import './menu-button/menu-button.js';
import './favourites/favourites.js';
import './side-menu.less';
import './side-menu.html';

Template.sideMenu.helpers({
  loggedIn: function() {
    return !!Meteor.userId();
  }
});
