Template.tourEnd.onRendered(function(){
  hopscotch.endTour(true);
});

Template.tourEnd.events({
  "click #close-tour-end": function(event, template) {
    Modal.hide();
    FlowRouter.go('dashboard');
    Meteor.call('welcomeTour.deleteTourData', function(err,res){
    	if(err) throw new Meteor.Error(err);    	
    });
  }
});
