Template.tagBadge.events({
  'click a': function(event) {
    event.preventDefault();
    console.log(this);
    CompaniesIndex.getComponentMethods().addProps('tags', this.tag);
  }
});

Template.tagBadges.helpers({
  sortedTags: function() {
    if (this.tags) {
      this.tags.sort();
    }
    return this.tags;
  }
});
