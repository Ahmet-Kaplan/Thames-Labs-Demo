Template.publicCompanyInformation.events({
  'click .upgrade-prompt': function(event, template) {
    if (!isProTenant(Meteor.user().group)) {
      ShowUpgradeToastr('To access this information');
    }
  }
});

Template.publicCompanyInformation.helpers({
  isProTenant: function() {
    var user = Meteor.user();
    return isProTenant(user.group);
  },
  hasMetadata: function() {
    var isPro = isProTenant(Meteor.user().group);
    if (this.metadata && this.metadata.clearbit) {
      if (this.metadata.clearbit.description) return true;
      else if (this.metadata.clearbit.category.sector && isPro) return true;
      else if (this.metadata.clearbit.linkedin.handle && isPro) return true;
      else if (this.metadata.clearbit.twitter.handle) return true;
      else if (this.metadata.clearbit.facebook.handle && isPro) return true;
    }
    return false;
  }
});
