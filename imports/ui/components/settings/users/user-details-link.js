import './modals/update-user.js';
import './user-details-link.html';

Template.userDetailsLink.events({
  'click a.user-detail-link': function() {
    Modal.show('updateUser', Template.currentData());
  }
});