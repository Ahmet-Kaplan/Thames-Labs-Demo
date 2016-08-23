import bootbox from 'bootbox';
import { isTenantOverFreeUserLimit } from '/imports/api/tenants/helpers.js';

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
        Meteor.call('removeUser', this._id, (error, response) => {
          if (error) {
            toastr.error(`Unable to remove user. ${error.reason}`);
          }
          const tenantId = _.get(Meteor.user(), 'group');
          const subsNotification = (isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) ? `<br />Please note that your subscription has been updated accordingly.` : '';
          bootbox.alert({
            title: 'User removed',
            message: `<i class="fa fa-check fa-3x pull-left text-success"></i>User ${name} has been removed.${subsNotification}`,
            className: 'bootbox-success',
          });
        });
      }
    });
  }
});
