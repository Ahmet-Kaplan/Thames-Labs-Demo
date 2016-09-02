import $ from 'jquery';
import _ from 'lodash';
import '/imports/ui/components/autosuggest/autosuggest.js';
import './update-purchase-order-item.html';

Template.updatePurchaseOrderItemModal.onRendered(function() {
  const pid = this.data.projectId;
  Meteor.subscribe('allProjects');

  if (pid) {
    $('#currProj').val(pid);
  }
});

Template.updatePurchaseOrderItemModal.events({
  'change #itemValue': function() {
    const v = $('#itemValue').val();
    const q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  },

  'change #currQuant': function() {
    const v = $('#itemValue').val();
    const q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  }
});

Template.updatePurchaseOrderItemModal.helpers({
  projectsAsOptions: function() {
    const data = [];
    const projects = Projects.find().fetch();

    _.each(projects, function(project) {
      if (project.companyId) {
        const company = Companies.findOne(project.companyId);
        const info = {
          'label': `${project.name} (${company.name})`,
          'value': project._id
        };

        data.push(info);
      } else {
        const contact = Contacts.findOne(project.contactId);
        const info = {
          'label': `${project.name} (${contact.forename} ${contact.surname})`,
          'value': project._id
        };

        data.push(info);
      }
    });

    return data;
  }
});

AutoForm.hooks({
  updatePurchaseOrderItemForm: {
    onError: function(formType, error) {
      toastr.error(`Failed to add a purchase order item, error: ${error}`);
    },
    onSuccess: function() {
      Modal.hide();
    }
  }
});