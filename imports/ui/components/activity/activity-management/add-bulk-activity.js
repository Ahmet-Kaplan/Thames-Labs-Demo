import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import './add-bulk-activity.html';

Template.addBulkActivity.onRendered(function() {
  $('#activityTimestamp').val(moment().format('DD/MM/YYYY HH:mm'));
  $('#activityTimestamp').data('DateTimePicker').date(moment());
});

Template.addBulkActivity.helpers({
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }
    return false;
  },
  resultsCount: function() {
    return Collections[this.collectionName].index.getComponentDict().get('count');
  }
});

Template.addBulkActivity.events({
  'click #addActivity': function(evt) {
    evt.preventDefault();
    if (AutoForm.validateForm('insertBulkActivityForm')) {
      const values = AutoForm.getFormValues('insertBulkActivityForm').insertDoc;
      const collectionName = this.collectionName;
      const index = Collections[collectionName].index,
            searchDefinition = index.getComponentDict().get('searchDefinition'),
            searchOptions = index.getComponentDict().get('searchOptions');
      Meteor.call('activity.insertBulk', values, collectionName, searchDefinition, searchOptions, function(err, res) {
        if(err) {
          toastr.error(`Unable to add bulk activity: ${err.reason}`);
          return;
        }
        toastr.clear();
        toastr.success(`Activity added to selected ${index.getComponentDict().get('count')} records.`);
        Modal.hide();
      });
    }
  },
});
