import './tipsModal.html';
import './tipsModal.css';

import { TipList } from '/imports/api/lookup/tips.js';

Template.tipsModal.onCreated(function() {
  this.currentTip = new ReactiveVar(0);
});

Template.tipsModal.onDestroyed(function() {
  this.currentTip.set(0);
});

Template.tipsModal.events({
  'click #next-tip': function(event, template) {
    const length = TipList.length;
    const index = Template.instance().currentTip.get();

    Template.instance().currentTip.set((index + 1) % length);
  },
  'click #previous-tip': function(event, template) {
    const length = TipList.length;
    const index = Template.instance().currentTip.get();

    if (index !== 0) {
      Template.instance().currentTip.set((index - 1) % length);
    }
  }
});

Template.tipsModal.helpers({
  currentTip: function() {
    const index = Template.instance().currentTip.get();
    if (index < 0 || index > TipList.length - 1) return;

    return TipList[index].Tip;
  },
  tipCount: function() {
    return TipList.length;
  },
  tipIndex: function() {
    return Template.instance().currentTip.get() + 1;
  }
});
