Template.publicContactInformation.helpers({
  isProTenant: function() {
    var user = Meteor.user();
    return IsTenantPro(user.group);
  },
  hasMetadata: function() {
    if (this.metadata && this.metadata.clearbit) {
      if (this.metadata.clearbit.location) return true;
      else if (this.metadata.clearbit.site) return true;
      else if (this.metadata.clearbit.linkedin.handle) return true;
      else if (this.metadata.clearbit.twitter.handle) return true;
      else if (this.metadata.clearbit.facebook.handle) return true;
    }
    return false;
  }
});
