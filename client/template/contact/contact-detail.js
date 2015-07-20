Template.contactDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function(){
    var contact = Contacts.findOne(FlowRouter.getParam('id'));
    if (contact) return;
    FlowRouter.go('contacts');
  });
});

Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
});

Template.contactDetail.helpers({
  'contactData': function() {
    var contactId = FlowRouter.getParam('id');
    return Contacts.findOne({_id: contactId});
  },
  'projects': function() {
    var contactId = FlowRouter.getParam('id');
    return Projects.find({contactId: contactId}, {sort: {description:1}});
  },
  'purchaseOrders': function() {
    var contactId = FlowRouter.getParam('id');
    return PurchaseOrders.find({supplierContactId: contactId}, {sort: {description:1}});
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
      //no company present
      Modal.show('newContactProjectForm', {
        contactId: this._id
      });
    } else{
      Modal.show('newProjectForm', {
        companyId: company._id,
        contactId: this._id
      });
    }
  },
  'click #add-purchase-order': function() {
    var company = this.company();
    if (company === undefined) {
      //no company present
      Modal.show('newContactPurchaseOrderForm', {
        supplierContactId: this._id
      });
    } else {
      Modal.show('newContactPurchaseOrderForm', {
        supplierCompanyId: company._id,
        supplierContactId: this._id
      });
    }
  }
});
