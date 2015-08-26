Template.publicContactInformation.helpers({
  hasMetadata: function() {
    if (this.metadata.clearbit.location) return true;
    else if (this.metadata.clearbit.site) return true;
    else if (this.metadata.clearbit.linkedin.handle) return true;
    else if (this.metadata.clearbit.twitter.handle) return true;
    else if (this.metadata.clearbit.facebook.handle) return true;
    return false;
  }
});
