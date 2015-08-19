Template.editTenantUserPermissions.onRendered(function() {
  Meteor.call('checkUserRole', this.data._id, 'Administrator', function(err, data) {
    if (err) {
      toastr.error('An error occurred whilst determining Administrator status: ' + err);
      return;
    }

    var isAdmin = data;
    $('#cbUserIsTenantAdministrator').prop('checked', isAdmin);

    if ($('#cbUserIsTenantAdministrator').prop('checked')) {
      $('#nonAdminOptions').hide();
    } else {
      $('#nonAdminOptions').show();
    }
  });

});

Template.editTenantUserPermissions.helpers({
  isMe: function() {
    return (Meteor.userId() === this._id);
  },
  AvailablePermissions: function() {
    return permissions;
  }
});

Template.editTenantUserPermissions.events({
  "click #cbUserIsTenantAdministrator": function() {
    if ($('#cbUserIsTenantAdministrator').prop('checked')) {
      $('#nonAdminOptions').hide();
    } else {
      $('#nonAdminOptions').show();
    }
  },

  'click #btnUpdateTenantUserPermissions': function() {
    var userId = this._id;

    if ($('#cbUserIsTenantAdministrator').prop('checked')) {
      Meteor.call('setUserRole', userId, 'Administrator', true);
    } else {
      Meteor.call('setUserRole', userId, 'Administrator', false);

      _.each(permissions, function(p) {
        var selectorName = p.value + "PermissionSelector";
        var selectorValue = $('#' + selectorName).val();
        console.log(selectorValue + p.value);

        switch (selectorValue) {
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
      })
    }

    toastr.success('User permissions updated.');
    Modal.hide('editTenantUserPermissions');
  }
});
