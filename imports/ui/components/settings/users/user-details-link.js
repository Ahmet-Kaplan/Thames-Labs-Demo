import bootbox from 'bootbox';

import './modals/update-user.js';
import './user-details-link.html';

Template.userDetailsLink.helpers({
  isSelf: function() {
    return this._id === Meteor.userId();
  }
});

Template.userDetailsLink.events({
  'click a.user-detail-link': function() {
    Modal.show('updateUser', Template.currentData());
  },

  'click #delete-user': function(event) {
    event.preventDefault();
    const name = this.profile.name;

    Modal.hide('updateUser');
    bootbox.confirm(`Are you sure you wish to remove the user ${name}?<br />This action is not reversible.`, (result) => {
      if (result === true) {
        toastr.info('Removing user...');
        Meteor.call('removeUser', this._id, (error, response) => {
          toastr.clear();
          if (error) {
            toastr.error(`Unable to remove user. ${error.reason}`);
          }
          const tenantId = _.get(Meteor.user(), 'group');

          // If pro tenant, indicate payment will be modified
          const subsNotification = isProTenant(tenantId) ? `<br />Please note that your payments will be updated accordingly.` : '';

          // If removing last paying user, indicate that payment will stop
          let paymentWillStop = '';
          const tenant = Tenants.findOne({
            _id: tenantId
          });
          const tenantUsers = Meteor.users.find({
            group: tenantId
          }).count();
          if(_.get(tenant, 'stripe.stripeId') && _.get(tenant, 'stripe.maxFreeUsers') === tenantUsers) {
            paymentWillStop = '<br>You are now left with only free users and will not be charged anymore.';
          }

          bootbox.alert({
            title: 'User removed',
            message: `<i class="fa fa-check fa-3x pull-left text-success"></i>User ${name} has been removed.${subsNotification}${paymentWillStop}`,
            className: 'bootbox-success',
          });
        });
      }
    });
  }
});
