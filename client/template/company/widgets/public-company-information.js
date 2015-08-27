Template.publicCompanyInformation.helpers({
  hasMetadata: function() {
    if (this.metadata && this.metadata.clearbit) {
      if (this.metadata.clearbit.description) return true;
      else if (this.metadata.clearbit.category.sector) return true;
      else if (this.metadata.clearbit.linkedin.handle) return true;
      else if (this.metadata.clearbit.twitter.handle) return true;
      else if (this.metadata.clearbit.facebook.handle) return true;
    }
    return false;
  }
});
