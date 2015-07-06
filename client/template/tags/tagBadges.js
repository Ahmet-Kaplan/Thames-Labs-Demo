Template.tagBadge.events({
  'click a': function() {
    // turn this into a string
    var tagName = '' + this;
    Session.set('companyListSearchQuery', tagName);
  }
});
