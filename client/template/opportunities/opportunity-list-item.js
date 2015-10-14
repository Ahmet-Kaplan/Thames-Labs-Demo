Template.opportunityListItem.onCreated(function(){
    this.subscribe('allContacts');
    this.subscribe('allCompanies');
    this.subscribe('opportunityStages');
    this.subscribe('opportunityTags');
});
