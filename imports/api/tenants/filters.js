export const TenantFilters = {
  user: {
    display: 'User:',
    prop: 'user',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    allowMultiple: false,
    displayValue: function(user) {
      if (user) {
        return user.profile.name;
      }
    }
  },
  active: {
    display: 'Activity:',
    prop: 'active',
    defaultOptions: function() {
      return ['7 days', '14 days', '28 days'];
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(active) {
      if (!active) return false;
      return true;
    }
  },
  toBeDeleted: {
    display: 'To Be Deleted:',
    prop: 'toBeDeleted',
    defaultOptions: function() {
      return ['Yes', 'No'];
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(flagged) {
      if (!flagged) return false;
      return true;
    }
  },
  type: {
    display: 'Type:',
    prop: 'type',
    defaultOptions: function() {
      return ['Free', 'Paying'];
    },
    strict: true,
    allowMultiple: false,
    displayValue: function(type) {
      return type;
    }
  }
};