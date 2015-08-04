Template.contactDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var contactId = FlowRouter.getParam('id');
    var contact = Contacts.findOne(contactId);
    if (FlowRouter.subsReady() && contact === undefined) {
      FlowRouter.go('contacts');
    }
  });
});

Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.contactDetail.helpers({
  'contactData': function() {
    var contactId = FlowRouter.getParam('id');
    return Contacts.findOne({
      _id: contactId
    });
  },
  'projects': function() {
    var contactId = FlowRouter.getParam('id');
    return Projects.find({
      contactId: contactId
    }, {
      sort: {
        description: 1
      }
    });
  },
  'purchaseOrders': function() {
    var contactId = FlowRouter.getParam('id');
    return PurchaseOrders.find({
      supplierContactId: contactId
    }, {
      sort: {
        description: 1
      }
    });
  }
});

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  },
  'click #add-project': function() {
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
  'click #add-purchase-order': function() {
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
  'click #remove-contact': function() {
    var contactId = this._id;

    bootbox.confirm("Are you sure you wish to delete this contact?", function(result) {
      if (result === true) {
        Contacts.remove(contactId);
      }
    });
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
