import './public-contact-information.html';

Template.publicContactInformation.helpers({
  hasMetadata: function() {
    return _.get(this, 'metadata.clearbit') && (this.metadata.clearbit.location
      || this.metadata.clearbit.site
      || this.metadata.clearbit.linkedin.handle
      || this.metadata.clearbit.twitter.handle
      || this.metadata.clearbit.facebook.handle);
  }
});
