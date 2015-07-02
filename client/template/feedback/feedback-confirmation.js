Template.feedbackConfirmModal.helpers({
    userName: function () {
        return Meteor.users.find({
            _id: Meteor.userId()
        }).fetch()[0].profile.name;
    },
    feedbackData: function () {
        return Session.get('feedbackMessage');
    }
});
Template.feedbackConfirmModal.events({
    'click #btnCls': function () {
        Session.set('feedbackMessage', null);
        Modal.hide();
    }
});