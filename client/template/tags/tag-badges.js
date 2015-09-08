Template.tagBadge.events({
  'click a': function() {
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
        Session.set('opportunitiesListSearchQuery', tagName);
        break;
      default:
        break;
    }
  }
});

Template.tagBadges.helpers({
  sortedTags: function() {
    if (this.doc.tags) {
      this.doc.tags.sort();
    }
    return this.doc.tags;
  }
});
