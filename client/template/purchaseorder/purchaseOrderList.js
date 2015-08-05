Template.purchaseOrderList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });


  // // Watch for session variable setting search
  // Session.set('purchaseOrderListSearchQuery', null);
  // Tracker.autorun(function() {
  //   var searchQuery = Session.get('purchaseOrderListSearchQuery');
  //   var easySearchInstance = EasySearch.getComponentInstance({index: 'purchaseorders'});
  //   if (searchQuery) {
  //     easySearchInstance.search(searchQuery);
  //     $('.sidebar input').val(searchQuery);
  //   }
  // });

  Meteor.subscribe("allContacts");
<<<<<<< HEAD
  $('[data-toggle="tooltip"]').tooltip({
    delay: {"show": 1000, "hide": 100}
  });
=======
>>>>>>> master
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
  },
  customerCompanyName: function() {
    var po = this;
    var comp = Companies.findOne({
      _id: po.customerCompanyId
    });

    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  },
  customerContactName: function() {
    var po = this;
    var cont = Contacts.findOne({
      _id: po.customerContactId
    });

    if (cont) {
      return cont.forename + ' ' + cont.surname;
    } else {
      return null;
    }
  },
  projectName: function() {
    var po = this;
    var proj = Projects.findOne({
      _id: po.projectId
    });

    if (proj) {
      return proj.description;
    } else {
      return null;
    }
  }
});
