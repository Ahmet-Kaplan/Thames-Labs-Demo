Template.publicCompanyInformation.events({
  'click .upgrade-prompt': function(event, template) {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access this information');
    }
  }
});

Template.publicCompanyInformation.helpers({
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
