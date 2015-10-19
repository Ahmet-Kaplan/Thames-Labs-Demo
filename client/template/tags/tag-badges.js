Template.tagBadge.events({
  'click a': function(event) {
    event.preventDefault();

    // turn this into a string
    var tagName = '' + this;
    var routeName = FlowRouter.getRouteName();
    switch (routeName) {
      case "companies":
        Session.set('companyListSearchQuery', tagName);
        break;
      case "contacts":
        Session.set('contactListSearchQuery', tagName);
        break;
      case "projects":
        Session.set('projectListSearchQuery', tagName);
        break;
      case "opportunities":
        Session.set('opportunitySearchQuery', tagName);
        break;
      default:
        break;
    }
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
