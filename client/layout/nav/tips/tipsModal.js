Template.tipsModal.onCreated(function() {
  Session.set('currentTip', 0);
});

Template.tipsModal.onDestroyed(function() {
  Session.set('currentTip', 0);
});

Template.tipsModal.events({
  'click #next-tip': function(event, template) {
    var index = Session.get('currentTip');
    Session.set('currentTip', index + 1);

    index = Session.get('currentTip');
    var length = TipList.length;

    if (index + 1 > length) {
      Session.set('currentTip', 0);
    }
  },
  'click #previous-tip': function(event, template) {
    var index = Session.get('currentTip');
    Session.set('currentTip', index - 1);

    index = Session.get('currentTip');
    var length = TipList.length;

    if (index < 0) {
      Session.set('currentTip', length - 1);
    }
  }
});

Template.tipsModal.helpers({
  currentTip: function() {
    var index = Session.get('currentTip');
    if (index < 0 || index > TipList.length - 1) return;

    return TipList[index].Tip;
  },
  tipCount: function() {
    return TipList.length;
  },
  tipIndex: function() {
    return Session.get('currentTip') + 1;
  }
});