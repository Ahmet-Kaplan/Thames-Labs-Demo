import './add-bulk-activity.js';
import './activity-management.html';

Template.activityManagement.events({
  'click #add-bulk-activity': function(evt) {
    evt.preventDefault();
    Modal.show('addBulkActivity', {collectionName: this.collectionName});
  }
});