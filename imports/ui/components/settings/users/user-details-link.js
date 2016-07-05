import './user-details.js';
import './user-details-link.html';

Template.userDetailsLink.events({
  'click a.user-detail-link': function() {
    Modal.show('userDetails', Template.currentData());
  }
});