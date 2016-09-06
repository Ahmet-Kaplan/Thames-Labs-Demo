import './notice.html';
import './modal.js';

Template.notice.helpers({
  shortText: function() {
    return _.truncate(this.title);
  },
  shortDetail: function() {
    return _.truncate(this.detail, {'length': 40});
  },

  recentNote: function() {
    const today = new Date(),
          yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    return (this.createdAt >= yesterday);
  }
});

Template.notice.events({
  'click .btnOpenNotice': function(event) {
    event.preventDefault();
    Modal.show('notificationModal', this);
  }
});
