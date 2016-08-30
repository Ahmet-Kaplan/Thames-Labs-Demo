import './insert-contact-purchase-order.html';

Template.insertContactPurchaseOrderModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
  },
  supplierContactName: function() {
    const contact = Contacts.findOne({
      _id: this.supplierContactId
    });
    return `${contact.forename} ${contact.surname}`;
  },
  currentDateTime: function() {
    return moment();
  }
});

AutoForm.hooks({
  insertCompanyPurchaseOrderForm: {
    onError: function(formType, error) {
      toastr.error(`Purchase order creation error: ${error}`);
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error(`Purchase order creation error: ${error}`);
          return false;
        }
        FlowRouter.go(`/purchaseorders/${result}`);
      }
    }
  }
});
