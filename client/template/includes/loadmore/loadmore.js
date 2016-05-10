function displayMore(searchIndex) {
  if (!$('#moar').offset() || !searchIndex.getComponentMethods().hasMoreDocuments()) {
    return;
  }

  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $('#moar').offset().top;
  var elemBottom = elemTop + $('#moar').height();

  if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
    searchIndex.getComponentMethods().loadMore(10);
  }
}

var setIntervalId;

Template.loadMore.onRendered(function() {
  setIntervalId = Meteor.setInterval(() => {
    var searchIndex = this.data.index;
    displayMore(searchIndex);
  }, 200);
});

Template.loadMore.onDestroyed(function() {
  Meteor.clearInterval(setIntervalId)
})

Template.loadMore.helpers({
  hasMoreDocs: function() {
    var searchIndex = Template.instance().data.index;
    return searchIndex.getComponentMethods().hasMoreDocuments();
  }
});

Template.loadMore.events({
  'click #moar': function() {
    var searchIndex = Template.instance().data.index;
    searchIndex.getComponentMethods().loadMore(10);
  }
})
