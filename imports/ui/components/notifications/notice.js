import './notice.html';
import './modal.js';

Template.notice.helpers({
  shortText: function() {
    const title = this.title.substr(0, 40);
    if (title.length > 37) {
      return title + "...";
    }
    return title;
  },
  shortDetail: function() {
    const detail = this.detail.substr(0, 40);
    if (detail.length > 37) {
      return detail + "...";
    }
    return detail;
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
