import './first-run-modal.html';

import { CompanyTour } from '/imports/ui/tutorials/add-company.js';
import { ContactTour } from '/imports/ui/tutorials/add-contact.js';

Template.firstRun.onCreated(function() {
  this.phoneRegistered = new ReactiveVar(false);
});

Template.firstRun.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.welcomeTour": true
    }
  });
});

Template.firstRun.helpers({
  phoneRegistered: function() {
    return Template.instance().phoneRegistered.get();
  }
});

Template.firstRun.events({
  'click #addMyPhone, hide.bs.modal .firstRunModal': function(evt) {
    const tel = $('#tenantPhone').val();
    const phoneReg = Template.instance().phoneRegistered;
    Meteor.users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        "profile.telephone": tel
      }
    }, (err, res) => {
      if(res && !!tel) {
        Meteor.call('notify.telephoneUpdated');
        if(evt.target.id === 'addMyPhone') {
          phoneReg.set(true);
        }
      }
    });
  },
  'click #close-first-run': function(event, template) {
    Modal.hide();
  },
  'click #first-run-upgrade': function(event, template) {
    FlowRouter.go('administration');
    Modal.hide();
  },
  'click #companies-tutorial': function(event, template) {
    Modal.hide();
    CompanyTour.start();
  },
  'click #contacts-tutorial': function(event, template) {
    Modal.hide();
    ContactTour.start();
  },
  'click #home': function(event) {
    FlowRouter.go('dashboard');
    Modal.hide();
  },
  'click #companies': function(event) {
    FlowRouter.go('companies');
    Modal.hide();
  },
  'click #contacts': function(event) {
    FlowRouter.go('contacts');
    Modal.hide();
  },
  'click #admin': function(event) {
    FlowRouter.go('settings');
    Modal.hide();
  }
});