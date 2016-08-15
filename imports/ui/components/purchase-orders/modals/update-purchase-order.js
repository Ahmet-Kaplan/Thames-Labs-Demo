import $ from 'jquery';
import './update-purchase-order.html';

Template.updatePurchaseOrderModal.onCreated(function() {
  this.purchaseOrderStat = new ReactiveVar();
  this.purchaseOrderIsLocked = new ReactiveVar();
});

Template.updatePurchaseOrderModal.onRendered(function() {
  this.purchaseOrderStat.set(this.data.status);
  this.purchaseOrderIsLocked.set(this.data.locked);

  if (this.data.status !== "Requested" && this.data.status !== "Requested" && this.data.status !== "Cancelled") {
    PurchaseOrders.update(this.data._id, {
      $set: {
        locked: true
      }
    });
    this.purchaseOrderIsLocked.set(true);
  }

  const companyId = this.data.supplierCompanyId;
  if (companyId) this.purchaseOrderCompanyId.set(companyId);
});

Template.updatePurchaseOrderModal.helpers({
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
  }
});

Template.updatePurchaseOrderModal.events({
  'change #poStatus': function() {
    const user = Meteor.users.findOne(Meteor.userId());
    const level = parseFloat(user.profile.poAuthLevel);
    const selected = $('#poStatus').val();

    if (level === 0) {
      if (selected !== "Requested" && selected !== "Cancelled") {
        const origVal = Template.currentInstance.purchaseOrderStat.get();
        $('#poStatus').val(origVal);
        toastr.warning('Your authorisation level only permits you to set order status to "Requested" or "Cancelled".');
        return false;
      }
    }

    if (Template.currentInstance.purchaseOrderIsLocked.get()) {
      if (selected === "Requested") {
        const origVal = Template.currentInstance.purchaseOrderStat.get();
        $('#poStatus').val(origVal);
        toastr.warning('You cannot set the order status to "Requested" - it has already been submitted for authorisation.');
        return false;
      }
    }
  }
});

AutoForm.hooks({
  updatePurchaseOrderForm: {
    onError: function(formType, error) {
      toastr.error(`Purchase order editing error: ${error}`);
    },
    onSuccess: function() {
      Modal.hide();
    }
  }
});