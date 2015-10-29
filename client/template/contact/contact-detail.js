Template.contactDetail.onCreated(function() {
  var self = this;
  this.autorun(function() {
    var contactId = FlowRouter.getParam('id');
    var contact = Contacts.findOne(contactId);
    // Redirect if data doesn't exist
    if (FlowRouter.subsReady() && contact === undefined) {
      FlowRouter.go('contacts');
    } else if (FlowRouter.subsReady() && contact.email !== '' && contact.email !== undefined) {
      Meteor.call('getClearbitData', 'contact', contact._id);
    }
    // Update company subscription if contact record changes (e.g. we change company)
    if (contact) {
      self.subscribe('companyById', contact.companyId);
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });

  // Subscribe to necessary data
  var contactId = FlowRouter.getParam('id');
  this.subscribe('activityByContactId', contactId);
  this.subscribe('tasksByEntityId', contactId);
  this.subscribe('projectsByContactId', contactId);
  this.subscribe('purchaseOrdersByContactId', contactId);
  this.subscribe('opportunitiesByContactId', contactId);
  this.subscribe('opportunityStages');
});

Template.contactDetail.helpers({
  contactData: function() {
    var contactId = FlowRouter.getParam('id');
    var contact = Contacts.findOne({
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
    var contactId = FlowRouter.getParam('id');
    return Projects.find({
      contactId: contactId
    }, {
      sort: {
        description: 1
      }
    });
  },
  mapTitle: function() {
    if (this.companyId) {
      var company = Companies.findOne({
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
      var company = Companies.findOne({
        _id: this.companyId
      });
      return company;
    } else {
      return this
    }
  },
  opportunities: function() {
    return Opportunities.find({
      contactId: this._id
    });
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      supplierContactId: this._id
    })
  },
  linksList: function() {
    return [
      {
        text: 'Contacts details',
        anchor: 'contact-details',
        icon: 'fa-file-text-o',
        permission: 'CanReadContacts'
      },
      {
        text: 'Current projects',
        anchor: 'projects',
        icon: 'fa-sitemap',
        permission: 'CanReadProjects'
      },
      {
        text: 'Purchase Orders',
        anchor: 'purchase-orders',
        icon: 'fa-shopping-cart',
        permission: 'CanReadPurchaseOrders'
      },
      {
        text: 'Tasks',
        anchor: 'tasks',
        icon: 'fa-tasks',
        permission: 'CanReadTasks'
      },
      {
        text: 'Extended information',
        anchor: 'entity-custom-fields',
        icon: 'fa-bookmark',
        permission: 'CanEditContacts'
      },
      {
        text: 'Opportunities',
        anchor: 'opportunities',
        icon: 'fa-lightbulb-o',
        permission: 'CanReadOpportunities'
      },
      {
        text: 'Activity Timeline',
        anchor: 'activity-timeline',
        icon: 'fa-list',
        permission: 'CanReadContacts'
      }
    ]
  }
});

Template.contactDetail.events({
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  },
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newContactProjectForm', {
      contactId: this._id,
      companyId: this.companyId
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    var company = this.company();
    if (company === undefined) {
      Modal.show('newContactPurchaseOrderForm', {
        supplierContactId: this._id
      });
    } else {
      Modal.show('newContactPurchaseOrderForm', {
        supplierCompanyId: company._id,
        supplierContactId: this._id
      });
    }
  },
  'click #edit-contact': function(event) {
    event.preventDefault();
    Modal.show('editContactModal', this);
  },
  'click #remove-contact': function(event) {
    event.preventDefault();
    var contactId = this._id;

    bootbox.confirm("Are you sure you wish to delete this contact?", function(result) {
      if (result === true) {
        Contacts.remove(contactId);
      }
    });
  },
  'click #add-opportunity': function(event) {
    event.preventDefault();
    var company = this.company();
    if (company === undefined) {
      Modal.show('insertContactOpportunityModal', {
        contactId: this._id
      });
    } else {
      Modal.show('insertContactOpportunityModal', {
        companyId: company._id,
        contactId: this._id
      });
    }
  }
});

Template.ContactProjectListItem.helpers({
  companyProject: function() {
    return (this.companyId ? true : false);
  },
  projectCompanyName: function() {
    Meteor.subscribe('companyById', this.companyId)
    var company = Companies.findOne(this.companyId);
    return company.name;
  }
});
