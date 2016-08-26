import './contact-detail.html';
import './contact-detail.css';
import '/imports/ui/components/contacts/modals/update-contact-modal.js';
import '/imports/ui/components/contacts/widgets/public-contact-information.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/fab/fab-edit.js';
import '/imports/ui/components/maps/viewer/map-viewer.js';
import '/imports/ui/components/opportunities/modals/insert/insert-contact-opp-modal.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import '/imports/ui/components/purchase-orders/modals/insert/insert-contact-purchase-order.js';
import '/imports/ui/components/tasks/panel/task-panel.js';
import '/imports/ui/components/projects/modals/insert-contact-project-modal.js';

import { Activities, Companies, Contacts, Projects, PurchaseOrders, Opportunities, Tenants } from '/imports/api/collections.js';
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
      Meteor.call('getClearbitData', 'contact', contact._id);
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
  this.subscribe('projectsByContactId', contactId);
  this.subscribe('purchaseOrdersByContactId', contactId);
  this.subscribe('opportunitiesByContactId', contactId);
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
  projects: function() {
    const contactId = FlowRouter.getParam('id');
    return Projects.find({
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
  opportunities: function() {
    return Opportunities.find({
      contactId: this._id,
      isArchived: { $ne: true }
    });
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      supplierContactId: this._id
    });
  },
  archivedOpps: function() {
    return Opportunities.find({
      contactId: this._id,
      isArchived: true
    }).count();
  },
  inactiveProjects: function() {
    return Projects.find({
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
      text: 'Current projects',
      anchor: 'projects',
      icon: 'fa-sitemap',
      permission: 'CanReadProjects'
    }, {
      text: 'Purchase Orders',
      anchor: 'purchase-orders',
      icon: 'fa-shopping-cart',
      permission: 'CanReadPurchaseOrders'
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
      text: 'Opportunities',
      anchor: 'opportunities',
      icon: 'fa-lightbulb-o',
      permission: 'CanReadOpportunities'
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
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('insertContactProjectModal', {
      contactId: this._id,
      companyId: this.companyId
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To raise purchase orders');
      return;
    }

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
  'click #add-opportunity': function(event) {
    event.preventDefault();
    const company = this.company();
    if (typeof company === "undefined") {
      Modal.show('insertContactOpportunityModal', {
        contactId: this._id
      });
    } else {
      Modal.show('insertContactOpportunityModal', {
        companyId: company._id,
        contactId: this._id
      });
    }
  },
  'click #contactTelephone': function(event, template) {
    Activities.insert({
      type: 'Call',
      notes: Meteor.user().profile.name + ' made a call to ' + this.forename + ' ' + this.surname,
      createdAt: new Date(),
      activityTimestamp: new Date(),
      contactId: this._id,
      primaryEntityId: this._id,
      primaryEntityType: 'contacts',
      primaryEntityDisplayData: this.forename + ' ' + this.surname,
      createdBy: Meteor.userId()
    });
  },
  'click #inactive-projects': function(event, template) {
    const url = "?f%5Bcontact%5D=" + this._id + "&f%5Bactive%5D=No";
    FlowRouter.go("/projects" + url);
  },
  'click #archived-opportunities': function(event, template) {
    const url = "?f%5Bcontact%5D=" + this._id + "&f%5BshowArchived%5D=true";
    FlowRouter.go("/opportunities" + url);
  }
});

Template.ContactProjectListItem.helpers({
  companyProject: function() {
    return !!this.companyId;
  },
  projectCompanyName: function() {
    Template.instance().subscribe('companyById', this.companyId);
    const company = Companies.findOne(this.companyId);
    return company ? company.name : null;
  }
});
