Template.tagBadge.helpers({
  getRoutedType: function() {
    var routeName = FlowRouter.getRouteName();
    switch (routeName) {
      case "companies":
        return "companies";
        break;
      case "contacts":
        return "contacts";
        break;
      case "projects":
        return "projects";
        break;
      default:
        throw new Meteor.Error("unspecified-tag-badge-route-type", "Could not determine route type for tag badges");
    }
  }
});

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
      default:
        throw new Meteor.Error("unspecified-tag-badge-route-type", "Could not determine route type for tag badges");
    }
  }
});

Template.tagBadges.helpers({
  sortedTags: function() {
    return this.tags.sort();
  }
});
