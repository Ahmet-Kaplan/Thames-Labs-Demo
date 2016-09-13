import './loadmore.html';

function displayMore(searchIndex) {
  if (!$('#moar').offset() || !searchIndex.getComponentMethods().hasMoreDocuments()) {
    return;
  }

  const docViewTop = $(window).scrollTop(),
        docViewBottom = docViewTop + $(window).height(),
        elemTop = $('#moar').offset().top,
        elemBottom = elemTop + $('#moar').height();

  if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
    searchIndex.getComponentMethods().loadMore(10);
  }
}

let setIntervalId;

Template.loadMore.onRendered(function() {
  setIntervalId = Meteor.setInterval(() => {
    const searchIndex = this.data.index;
    displayMore(searchIndex);
  }, 200);
});

Template.loadMore.onDestroyed(function() {
  Meteor.clearInterval(setIntervalId);
});

Template.loadMore.helpers({
  hasMoreDocs: function() {
    const searchIndex = Template.instance().data.index;
    return searchIndex.getComponentMethods().hasMoreDocuments();
  }
});

Template.loadMore.events({
  'click #moar': function() {
    const searchIndex = Template.instance().data.index;
    searchIndex.getComponentMethods().loadMore(10);
  }
});
