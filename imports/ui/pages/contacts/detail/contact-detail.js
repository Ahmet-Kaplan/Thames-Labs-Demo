import './contact-detail.html';
import './contact-detail.css';
import '/imports/ui/components/contacts/modals/update-contact-modal.js';
import '/imports/ui/components/contacts/widgets/public-contact-information.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/fab/fab-edit.js';
import '/imports/ui/components/maps/viewer/map-viewer.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import '/imports/ui/components/tasks/panel/task-panel.js';
import '/imports/ui/components/jobs/modals/insert-contact-job-modal.js';
import '/imports/ui/components/jumplist/jumplist.js';
import '/imports/ui/components/watchlist/watchlist.js';

import { Activities, Companies, Contacts, Jobs, Tenants } from '/imports/api/collections.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import bootbox from 'bootbox';


Template.contactDetail.onCreated(function() {
  const self = this;
  this.autorun(function() {
    const contactId = FlowRouter.getParam('id'),
          contact = Contacts.findOne(contactId);
    // Redirect if data doesn't exist
    if (FlowRouter.subsReady() && typeof contact === "undefined") {
      FlowRouter.go('contacts');
    } else if (FlowRouter.subsReady() && contact.email !== '' && typeof contact.email !== "undefined") {
      Meteor.call('clearbit.getClearbitData', 'contact', contact._id);
    }
    // Update company subscription if contact record changes (e.g. we change company)
    if (contact) {
      self.subscribe('companyById', contact.companyId);
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });

  // Subscribe to necessary data
  const contactId = FlowRouter.getParam('id');
  this.subscribe('activityByContactId', contactId);
  this.subscribe('tasksByEntityId', contactId);
  this.subscribe('jobsByContactId', contactId);
  this.subscribe('purchaseOrdersByContactId', contactId);
});

Template.contactDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Contact #" + this.sequencedIdentifier : "Contact");
  },
  canLinkAddress: function() {
    const company = Companies.findOne({
      _id: this.companyId
    });

    if(company) {
      if(company.address && company.city && company.county && company.postcode && company.country) {
        return true;
      }
    }
    return false;
  },
  contactData: function() {
    const contactId = FlowRouter.getParam('id'),
          contact = Contacts.findOne({
            _id: contactId
          });
    if (contact && contact.tags) {
      contact.tags.sort();
    }
    return contact;
  },
  company: function() {
    return Companies.findOne({
      _id: this.companyId
    });
  },
  phoneHref: function(number) {
    return 'tel:' + number;
  },
  jobs: function() {
    const contactId = FlowRouter.getParam('id');
    return Jobs.find({
      contactId: contactId,
      active: true
    }, {
      sort: {
        description: 1
      }
    });
  },
  mapTitle: function() {
    if (this.companyId) {
      const company = Companies.findOne({
        _id: this.companyId
      });
      if (company) {
        return company.name;
      }
    } else {
      return this.forename + ' ' + this.surname;
    }
  },
  mapAddress: function() {
    if (this.companyId) {
      const company = Companies.findOne({
        _id: this.companyId
      });
      return company;
    }
    return this;
  },
  inactiveJobs: function() {
    return Jobs.find({
      contactId: this._id,
      active: false
    }).count();
  },
  linksList: function() {
    return [{
      text: 'Contacts details',
      anchor: 'contact-details',
      icon: 'fa-file-text-o',
      permission: 'CanReadContacts'
    }, {
      text: 'Current jobs',
      anchor: 'jobs',
      icon: 'fa-sitemap',
      permission: 'CanReadJobs'
    }, {
      text: 'Tasks',
      anchor: 'tasks',
      icon: 'fa-tasks',
      permission: 'CanReadTasks'
    }, {
      text: 'Custom Fields',
      anchor: 'entity-custom-fields',
      icon: 'fa-bookmark',
      permission: 'CanEditContacts'
    }, {
      text: 'Activity Timeline',
      anchor: 'activity-timeline',
      icon: 'fa-list',
      permission: 'CanReadContacts'
    }];
  },
  showTitle: function() {
    if (this.title) {
      const tenant = Tenants.findOne({
        _id: Meteor.user().group
      });
      if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) {
        const titles = tenant.settings.contact.titles.split(',');
        return _.includes(titles, this.title);
      }
    }
    return false;
  }
});

Template.contactDetail.events({
  'click #linkCompanyAddress': function(event, template) {
    event.preventDefault();

    Meteor.call('contact.linkCompanyAddress', this._id);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  },
  'click #add-job': function(event) {
    event.preventDefault();
    Modal.show('insertContactJobModal', {
      contactId: this._id,
      companyId: this.companyId
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();

    const company = this.company();
    if (typeof company === "undefined") {
      Modal.show('insertContactPurchaseOrderModal', {
        supplierContactId: this._id
      });
    } else {
      Modal.show('insertContactPurchaseOrderModal', {
        supplierCompanyId: company._id,
        supplierContactId: this._id
      });
    }
  },
  'click #edit-contact': function(event) {
    event.preventDefault();
    Modal.show('updateContactModal', this);
  },
  'click #remove-contact': function(event) {
    event.preventDefault();
    const contactId = this._id;

    bootbox.confirm("Are you sure you wish to delete this contact?", function(result) {
      if (result === true) {
        Contacts.remove(contactId);
      }
    });
  },
  'click .contact-telephone': function(event, template) {
    const data = this;
    bootbox.dialog({
      message: `This will add <i>"${Meteor.user().profile.name} made a call to ${data.forename} ${data.surname}"</i> to the activity timeline below.`,
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
              notes: `${Meteor.user().profile.name} made a call to ${data.forename} ${data.surname}`,
              createdAt: new Date(),
              activityTimestamp: new Date(),
              contactId: data._id,
              primaryEntityId: data._id,
              primaryEntityType: 'contacts',
              primaryEntityDisplayData: `${data.forename} ${data.surname}`,
              createdBy: Meteor.userId()
            });
          }
        }
      }
    });
  },
  'click #inactive-jobs': function(event, template) {
    const url = "?f%5Bcontact%5D=" + this._id + "&f%5Bactive%5D=No";
    FlowRouter.go("/jobs" + url);
  },
});

Template.ContactJobListItem.helpers({
  companyJob: function() {
    return !!this.companyId;
  },
  jobCompanyName: function() {
    Template.instance().subscribe('companyById', this.companyId);
    const company = Companies.findOne(this.companyId);
    return company ? company.name : null;
  }
});
