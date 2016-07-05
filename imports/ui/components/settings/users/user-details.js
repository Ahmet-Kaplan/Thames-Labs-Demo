import './permissions/permission-options.js';
import './user-details-link.css';
import './user-details.html';

Template.userDetails.onRendered(function() {
  var selectedUserId = this.data._id;

  Meteor.call('checkUserRole', selectedUserId, 'Administrator', function(err, data) {
    if (err) {
      toastr.error('An error occurred whilst determining Administrator status: ' + err);
      return;
    }

    var isAdmin = data;
    $('#admin-checkbox').prop('checked', isAdmin);

    $('#nonAdminOptions').show();

    _.each(permissions, function(p) {
      var permissionName = p.value;
      var selectorName = '#' + permissionName + "PermissionSelector";

      Meteor.call('getMaxPermission', selectedUserId, permissionName, function(err, status) {
        var val = '';

        if (status.indexOf('Restricted') > -1) {
          val = 'Restricted';
        }
        if (status.indexOf('CanRead') > -1) {
          val = 'CanRead';
        }
        if (status.indexOf('CanCreate') > -1) {
          val = 'CanCreate';
        }
        if (status.indexOf('CanCreateAndEdit') > -1) {
          val = 'CanCreateAndEdit';
        }
        if (status.indexOf('CanEdit') > -1) {
          val = 'CanEdit';
        }
        if (status.indexOf('CanDelete') > -1) {
          val = 'CanDelete';
        }

        $(selectorName).selectpicker('val', val);
      });
    });

  });

});

Template.userDetails.helpers({
  isMe: function() {
    return (Meteor.userId() === this._id);
  },
  AvailablePermissions: function() {
    return permissions;
  }
});

Template.userDetails.events({
  'click #update-user': function() {
    var userId = this._id;

    Meteor.call('setUserRole', userId, 'Administrator', $('#admin-checkbox').prop('checked'));

    _.each(permissions, function(p) {
      var selectorName = p.value + "PermissionSelector";
      var selectorValue = $('#' + selectorName).val();

      switch (selectorValue) {
        case 'Restricted':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
          break;
        case 'CanRead':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
          break;
        case 'CanCreate':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
          break;
        case 'CanEdit':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
          break;
        case 'CanCreateAndEdit':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
          break;
        case 'CanDelete':
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, true);
          break;
        default:
          Meteor.call('setUserRole', userId, 'CanRead' + p.value, true);
          Meteor.call('setUserRole', userId, 'CanCreate' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanEdit' + p.value, false);
          Meteor.call('setUserRole', userId, 'CanDelete' + p.value, false);
      }
    });

    //Set PO Auth Level
    var newAuthLevel = $('#po-auth-level').val();

    Meteor.call('setUserAuthLevel', userId, newAuthLevel);

    toastr.success('User details updated.');
    Modal.hide('userDetails');
  },

  'click #delete-user': function(event) {
    event.preventDefault();
    var name = this.profile.name;

    Modal.hide('userDetails');
    bootbox.confirm("Are you sure you wish to remove the user " + name + "?<br />This action is not reversible.", (result) => {
      if (result === true) {
        Meteor.call('removeUser', this._id, (error, response) => {
          if (error) {
            toastr.error('Unable to remove user. ' + error);
            throw new Meteor.Error('User', 'Unable to remove user.');
          }
          bootbox.alert({
            title: 'User removed',
            message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>User ' + name + ' has been removed.<br />Please note that your subscription has been updated accordingly.</div>'
          });
        });
      }
    });
  }
});
