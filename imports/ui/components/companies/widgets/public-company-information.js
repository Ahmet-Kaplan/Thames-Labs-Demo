import './public-company-information.html';

Template.publicCompanyInformation.helpers({
  hasMetadata: function() {
    return _.get(this, 'metadata.clearbit') && (this.metadata.clearbit.description
      || this.metadata.clearbit.category.sector
      || this.metadata.clearbit.linkedin.handle
      || this.metadata.clearbit.twitter.handle
      || this.metadata.clearbit.facebook.handle);
  }
});
