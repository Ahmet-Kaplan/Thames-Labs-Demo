Template.purchaseOrderList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.purchaseOrderList.events({
    'click #add-purchase-order': function() {
      Modal.show('newPurchaseOrderForm', this);
    },
});

Template.purchaseOrderList.helpers({
  hasPurchaseOrders: function() {
    return PurchaseOrders.find({}).count() > 0;
  }
});

Template.purchaseOrderListItem.helpers({
  companyName: function() {
    var po = this;
    var comp = Companies.findOne({
      _id: po.supplierCompanyId
    });

    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  },
  contactName: function() {
    var po = this;
    var cont = Contacts.findOne({
      _id: po.supplierContactId
    });

    if (cont) {
      return cont.forename + ' ' + cont.surname;
    } else {
      return null;
    }
  }
});
