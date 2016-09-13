import { CompanyTour } from '/imports/ui/tutorials/add-company.js';
import { ContactTour } from '/imports/ui/tutorials/add-contact.js';
import { TagsTour } from '/imports/ui/tutorials/add-tag.js';
import { UserTour } from '/imports/ui/tutorials/add-user.js';

import '/imports/ui/components/tips/tipsModal.js';

import './help-menu.css';
import './help-menu.html';

Template.help.onRendered(function() {
  Meteor.users.update({
    _id: Meteor.userId()
  }, {
    $set: {
      "profile.welcomeTour": true
    }
  });
});

Template.help.events({
  'click #companies-tutorial'() {
    Modal.hide();
    CompanyTour.start();
  },
  'click #tags-tutorial'() {
    Modal.hide();
    TagsTour.start();
  },
  'click #contacts-tutorial'() {
    Modal.hide();
    ContactTour.start();
  },
  'click #admin-tutorial'() {
    Modal.hide();
    UserTour.start();
  },
  'click #close-help': function(event, template) {
    Modal.hide();
  },
  'click #show-tips': function(event, template) {
    Modal.allowMultiple = true;
    Modal.hide();
    Modal.show('tipsModal');
  }
});
