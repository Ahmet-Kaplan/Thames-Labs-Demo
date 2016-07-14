import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.deleteTenantAccount.events({
  'click #deleteUserAccount': function() {
    bootbox.prompt({
      title: "Delete your RealTimeCRM account<br><small>You are about to flag your company's RealTimeCRM account for deletion. To confirm, please enter your password and click OK.</small>",
      inputType: "password",
      callback: function(result) {
        if (result !== null) {
          const digest = Package.sha.SHA256(result);
          Meteor.call('user.checkPassword', Meteor.userId(), digest, function(err, res) {
            if(err) {
              toastr.error(`Error: ${err}`);
            }

            if(res === true) {
              Meteor.call('stripe.cancelSubscription');
              Meteor.call('tenant.flagForDeletion', function(err2, res2) {
                if(err2) {
                  toastr.error(`Error: ${err2}`);
                }
              });
            } else {
              toastr.warning('There was a problem checking your password. Please ensure that your password is correct, and try again.');
            }
          });

        }
      }
    });
  },
});