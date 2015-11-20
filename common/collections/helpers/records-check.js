Collections.helpers.checkRecordsNumber = function() {
  if (!Tenants.findOne({})) {
    return true;
  }
  var payingTenant = Tenants.findOne({}).stripe.paying;
  var freeUnlimited = Tenants.findOne({}).stripe.freeUnlimited;
  var totalRecords = (Tenants.findOne({}) === undefined) ? 0 : Tenants.findOne({}).stripe.totalRecords;
  totalRecords += 1;
  if (payingTenant || freeUnlimited) {
    return true;
  } else {
    if (Meteor.isServer) {
      if (totalRecords == MAX_RECORDS) {
        Meteor.call('tenantLimitReached');
      } else if (totalRecords > MAX_RECORDS) {
        return false;
      }
      return true;
    }

    if (Meteor.isClient) {
      var upgradeMessage = '';
      if (totalRecords > MAX_RECORDS) {
        upgradeMessage = (Roles.userIsInRole(Meteor.userId(), ['Administrator'])) ? 'Upgrade to enjoy the full functionalities of RealTimeCRM!' : 'If you wish to upgrade, contact your administrator.';
        toastr.error('You have reached the maximum number of records and you are not able to add new ones.<br>' + upgradeMessage, 'Record Limit Reached');
        return false;
      }
      return true;
    }
  }
};
