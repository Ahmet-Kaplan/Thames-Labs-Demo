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
    self.subscribe('companyById', contact.companyId);
  });

  // Redirect if read permission changed - we also check the initial load in the router
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
    if (contact.tags !== undefined) {
      contact.tags.sort();
    }
    return contact;
  },
  company: function() {
    return Companies.findOne({_id: this.companyId});
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
  purchaseOrders: function() {
    var contactId = FlowRouter.getParam('id');
    return PurchaseOrders.find({
      supplierContactId: contactId
    }, {
      sort: {
        description: 1
      }
    });
  },
  mapTitle: function() {
    if (this.companyId) {
      var company = Companies.findOne({_id: this.companyId});
      if (company) {
        return company.name;
      }
    } else {
      return this.forename + ' ' + this.surname;
    }
  },
  mapAddress: function() {
    if (this.companyId) {
      var company = Companies.findOne({_id: this.companyId});
      return company;
    } else {
      return this
    }
  },
  opportunities: function() {
    return Opportunities.find({contactId: this._id});
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
    var company = this.company();
    if (company === undefined) {
      Modal.show('newContactProjectForm', {
        contactId: this._id
      });
    } else {
      Modal.show('newProjectForm', {
        companyId: company._id,
        contactId: this._id
      });
    }
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    var company = this.company();
    if (company === undefined) {
      Modal.show('newContactPurchaseOrderForm', {
        customerContactId: this._id
      });
    } else {
      Modal.show('newContactPurchaseOrderForm', {
        customerCompanyId: company._id,
        customerContactId: this._id
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
    var company = Companies.findOne(this.companyId);
    return company.name;
  }
});
