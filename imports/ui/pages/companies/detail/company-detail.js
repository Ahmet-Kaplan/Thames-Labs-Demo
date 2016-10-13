import './company-detail.html';

import '/imports/ui/components/companies/merge/merge-company-modal.js';
import '/imports/ui/components/companies/widgets/index.js';
import '/imports/ui/components/charts/sales-history.js';
import '/imports/ui/components/maps/viewer/map-viewer.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/fab/fab-edit.js';
import '/imports/ui/components/activity/activity-timeline.js';
import '/imports/ui/components/companies/modals/update-company-modal.js';
import '/imports/ui/components/companies/modals/word-help-modal.html';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import '/imports/ui/components/tasks/panel/task-panel.js';
import '/imports/ui/components/contacts/modals/insert-company-contact-modal.js';
import '/imports/ui/components/jobs/modals/insert-company-job-modal.js';
import '/imports/ui/components/jumplist/jumplist.js';
import '/imports/ui/components/watchlist/watchlist.js';

import { Activities, Companies, Jobs } from '/imports/api/collections.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import bootbox from 'bootbox';

Template.companyDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    const company = Companies.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof company === "undefined") {
      FlowRouter.go('companies');
    } else if (FlowRouter.subsReady() && company.website !== '' && typeof company.website !== "undefined") {
      Meteor.call('clearbit.getClearbitData', 'company', company._id);
    }
  });

  this.autorun(function() {
    const companyid = FlowRouter.getParam('id'),
          currentInstance = Template.instance();
      });

  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });

  // Subscribe to necessary data
  const companyId = FlowRouter.getParam('id');
  this.subscribe('contactsByCompanyId', companyId);
  this.subscribe('jobsByCompanyId', companyId);
  this.subscribe('activityByCompanyId', companyId);
  this.subscribe('purchaseOrdersByCompanyId', companyId);
  this.subscribe('tasksByEntityId', companyId);
});

Template.companyDetail.onRendered(function() {
  // Load docxgen
  $.getScript('/vendor/docxgen.min.js');
});

Template.companyDetail.events({
  'click #merge-company': function(event, template) {
    event.preventDefault();
    Modal.show('mergeModal', this);
  },
  'change #template-upload': function(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to process file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    const reader = new FileReader();
    reader.onload = function() {
      const doc = new Docxgen(reader.result);
      doc.setData({
        "name": this.name || '',
        "address": this.address || '',
        "city": this.city || '',
        "county": this.county || '',
        "postcode": this.postcode || '',
        "country": this.country || '',
        "website": this.website || '',
        "phone": this.phone || ''
      });

      try {
        doc.render();
        const docDataUri = doc.getZip().generate({
          type: 'blob'
        });
        docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //Convert data into a blob format for sending to api
        const blob = new Blob([docDataUri], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        saveAs(blob, file.name);
        toastr.success("Your data has been successfully extracted.");
      } catch (err) {
        toastr.error("Unable to process file.");
      }
      $('#template-upload-docx').val('');

    }.bind(this);
    reader.readAsBinaryString(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-help': function(event) {
    event.preventDefault();
    Modal.show('wordHelpModal');
  },
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyContactModal', this);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertActivityModal', {
      company: this
    });
  },
  'click #add-job': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyJobForm', {
      companyId: this._id
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyPurchaseOrderModal', {
      supplierCompanyId: this._id
    });
  },
  'click #remove-company': function(event) {
    event.preventDefault();
    const companyId = this._id;

    bootbox.confirm("Are you sure you wish to delete this company?", function(result) {
      if (result === true) {
        Companies.remove(companyId);
      }
    });
  },
  'click #edit-company': function(event) {
    event.preventDefault();
    Modal.show('updateCompanyModal', this);
  },
  'click #companyTelephone': function(event, template) {
    const data = this;
    bootbox.dialog({
      message: `This will add <i>"${Meteor.user().profile.name} made a call to ${this.name}"</i> to the activity timeline below.`,
      title: "Would you like to add an activity for your call?",
      buttons: {
        cancel: {
          label: "Cancel",
          className: "btn-default"
        },
        main: {
          label: "Add activity",
          className: "btn-success",
          callback: () => {
            Activities.insert({
              type: 'Call',
              notes: `${Meteor.user().profile.name} made a call to ${data.name}`,
              createdAt: new Date(),
              activityTimestamp: new Date(),
              companyId: data._id,
              primaryEntityId: data._id,
              primaryEntityType: 'companies',
              primaryEntityDisplayData: data.name,
              createdBy: Meteor.userId()
            });
          }
        }
      }
    });
  },
  'click #inactive-jobs': function(event, template) {
    const url = "?f%5Bcompany%5D=" + this._id + "&f%5Bactive%5D=No";
    FlowRouter.go("/jobs" + url);
  },
});

Template.companyDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Company #" + this.sequencedIdentifier : "Company");
  },
  websiteHref: function(website) {
    return (website.indexOf('http://') > -1 ? website : 'http://' + website);
  },
  companyData: function() {
    const companyId = FlowRouter.getParam('id'),
          company = Companies.findOne({
            _id: companyId
          });
    if (company && company.tags) {
      company.tags.sort();
    }
    return company;
  },
  phoneHref: function(number) {
    return 'tel:' + number;
  },
  onCompanyRemove: function() {
    $(".modal-backdrop").remove();
    $("body").removeClass('modal-open');
  },
  mapTitle: function() {
    return this.name;
  },
  mapAddress: function() {
    return this;
  },
  hasAddress: function() {
    return (this.lat || this.lng || this.address || this.city || this.postcode || this.country || this.county);
  },
  inactiveJobs: function() {
    return Jobs.find({
      companyId: this._id,
      active: false
    }).count();
  },
  linksList: function() {
    return [{
      text: 'Company details',
      anchor: 'company-details',
      icon: 'fa-file-text-o',
      permission: 'CanReadCompanies'
    }, {
      text: 'Custom Fields',
      anchor: 'entity-custom-fields',
      icon: 'fa-bookmark',
      permission: 'CanReadCompanies'
    }, {
      text: 'Contacts',
      anchor: 'contacts',
      icon: 'fa-user',
      permission: 'CanReadContacts'
    }, {
      text: 'Current Jobs',
      anchor: 'jobs',
      icon: 'fa-sitemap',
      permission: 'CanReadJobs'
    }, {
      text: 'Tasks',
      anchor: 'tasks',
      icon: 'fa-tasks',
      permission: 'CanReadTasks'
    }, {
      text: 'Activity Timeline',
      anchor: 'activity-timeline',
      icon: 'fa-list',
      permission: 'CanReadCompanies'
    }];
  },
});
