import $ from 'jquery';
import './update-purchase-order.html';

//TODO: Update these session variables

Template.updatePurchaseOrderModal.onRendered(function() {
  Session.set('posc', null);
  Session.set('poStat', this.data.status);
  Session.set('poIsLocked', this.data.locked);

  if (this.data.status !== "Requested" && this.data.status !== "Requested" && this.data.status !== "Cancelled") {
    PurchaseOrders.update(this.data._id, {
      $set: {
        locked: true
      }
    });
    Session.set('poIsLocked', true);
  }

  const c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
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
        const origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('Your authorisation level only permits you to set order status to "Requested" or "Cancelled".');
        return false;
      }
    }

    if (Session.get('poIsLocked')) {
      if (selected === "Requested") {
        const origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('You cannot set the order status to "Requested" - it has already been submitted for authorisation.');
        return false;
      }
    }
  }
});

Template.updatePurchaseOrderModal.onDestroyed(function() {
  Session.set('posc', null);
  Session.set('poStat', null);
  Session.set('poIsLocked', null);
});