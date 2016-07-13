import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './update-phone-number.html';

Template.updatePhoneNumber.helpers({
  phoneNumber: function() {
    return _.get(Meteor.user(), 'profile.telephone');
  }
});

Template.updatePhoneNumber.events({
  'submit #tenantPhoneForm': function(event) {
    event.preventDefault();
    $('#tenantPhoneForm button[type=submit]').prop('disabled', true);
    const tel = $(event.target).find('input').val();
    let modifier = null;
    if(tel == '') {
      modifier = {
        $unset: {
          'profile.telephone': ''
        }
      };
    } else {
      modifier = {
        $set: {
          'profile.telephone': tel
        }
      };
    }
    Meteor.users.update({
      _id: Meteor.userId()
    }, modifier, (err, res) => {
      if(res) {
        toastr.success('Your telephone number has been updated.');
        Meteor.call('notify.telephoneUpdated');
      } else if(err) {
        toastr.error('Unable to update your phone number');
      }
      $('#tenantPhoneForm button[type=submit]').prop('disabled', false);
    });
  },
});