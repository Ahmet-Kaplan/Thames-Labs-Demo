Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
});

Template.purchaseOrderList.onRendered(function() {
  // // Watch for session variable setting search
  // Session.set('purchaseOrderListSearchQuery', null);
  // Tracker.autorun(function() {
  //   var searchQuery = Session.get('purchaseOrderListSearchQuery');
  //   var easySearchInstance = EasySearch.getComponentInstance({index: 'purchaseorders'});
  //   if (searchQuery) {
  //     easySearchInstance.search(searchQuery);
  //     $('.stick-bar input').val(searchQuery);
  //   }
  // });
});

Template.purchaseOrderList.events({
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
  },
});

Template.purchaseOrderList.helpers({
  hasPurchaseOrders: function() {
    return PurchaseOrders.find({}).count() > 0;
  }
});

Template.purchaseOrderListItem.helpers({
  supplierCompanyName: function() {
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
  supplierContactName: function() {
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
