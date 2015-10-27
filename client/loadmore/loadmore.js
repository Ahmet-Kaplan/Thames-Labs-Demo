Template.loadMore.onRendered(function() {
  var myEvent; // The custom event that will be created

  if (document.createEvent) {
    myEvent = document.createEvent("HTMLEvents");
    myEvent.initEvent("moarVisible", true, true);
  } else {
    myEvent = document.createEventObject();
    myEvent.eventType = "moarVisible";
  }

  myEvent.eventName = "moarVisible";

  var displayMore = function(myEvent) {
    if(!$('#moar').offset()) {
      return;
    }
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $('#moar').offset().top;
    var elemBottom = elemTop + $('#moar').height();

    if(elemBottom <= docViewBottom && elemTop >= docViewTop) {
      var element = document.getElementById('moar');
      if (document.createEvent) {
        element.dispatchEvent(myEvent);
      } else {
        element.fireEvent("on" + myEvent.eventType, myEvent);
      }
    }
  }

  $(window).load(function() {
    displayMore(myEvent)
  })

  $(window).scroll(function() {
    displayMore(myEvent)
  });
});

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
  },
  'moarVisible #moar': function() {
    var searchIndex = Template.instance().data.index;
    searchIndex.getComponentMethods().loadMore(10);
  }
})