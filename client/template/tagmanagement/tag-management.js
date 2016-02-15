Template.tagManagement.events({
	'click #manage-tags': function(event, template){
		Modal.show('tagManagementModal', this);
	}
});