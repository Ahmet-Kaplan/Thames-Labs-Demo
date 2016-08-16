import './tutorial-modal.css';
import './tutorial-modal.html';

import { CompanyTour } from '/imports/ui/tutorials/add-company.js';
import { ContactTour } from '/imports/ui/tutorials/add-contact.js';
import { TagsTour } from '/imports/ui/tutorials/add-tag.js';
import { UserTour } from '/imports/ui/tutorials/add-user.js';

Template.tutorialModal.events({
  'click #tutorial-add-company'() {
    Modal.hide();
    CompanyTour.start();
  },
  'click #tutorial-add-company-tag'() {
    Modal.hide();
    TagsTour.start();
  },
  'click #tutorial-add-contact'() {
    Modal.hide();
    ContactTour.start();
  },
  'click #tutorial-add-user'() {
    Modal.hide();
    UserTour.start();
  },
});