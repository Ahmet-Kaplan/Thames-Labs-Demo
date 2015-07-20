AutoForm.hooks({
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order updated.');
    }
  }
});

Template.purchaseOrderDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
     var purchaseOrder = PurchaseOrders.findOne(FlowRouter.getParam('id'));
     if (purchaseOrder) return;
     FlowRouter.go('purchaseOrders');
  });
});

Template.purchaseOrderDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  $.getScript('/vendor/docxgen.min.js');
});

Template.purchaseOrderDetail.events({
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var customerName = "",
        customerContact = "",
        customerAddress = "",
        orderNumber = "";

      var company = Companies.findOne(this.supplierCompanyId);
      customerName = company.name;
      customerAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
      if (this.supplierContactId) {
        var contact = Contacts.findOne(this.supplierContactId);
        customerContact = contact.title + " " + contact.forename + " " + contact.surname;
      }
      orderNumber = this.orderNumber;
      var orderDate = moment().format("MMM Do YYYY");

      var orderItems = PurchaseOrderItems.find({
        purchaseOrderId: this._id
      }).fetch();
      var items = [];
      var running = 0;

      _.each(orderItems, function(oi) {
        var obj = {
          name: oi.description,
          count: oi.quantity,
          value: oi.value,
          total: oi.totalPrice,
        }

        running = running + parseFloat(oi.totalPrice);

        items.push(obj);
      });

      var vatAmount = parseFloat((running / 100) * 20);
      var totalValue = running + vatAmount;

      doc.setData({
        "customerName": customerName,
        "customerContact": customerContact,
        "customerAddress": customerAddress,
        "orderNumber": orderNumber,
        "orderDate": orderDate,
        "items": items,
        "running": parseFloat(running).toFixed(2),
        "vat": parseFloat(vatAmount).toFixed(2),
        "total": parseFloat(totalValue).toFixed(2)
      });

      doc.render();
      var docDataUri = doc.getZip().generate({
        type: 'blob'
      });
      saveAs(docDataUri, file.name);
    }.bind(this);
    reader.readAsBinaryString(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #po-template-help': function() {
    Modal.show('poHelpModal');
  },
  'click #add-item': function() {
    Modal.show('addPurchaseOrderItemModal', {
      project: this
    });
  },
  'click #add-activity': function() {
    Modal.show('insertPurchaseOrderActivityModal', {
      purchaseOrder: this
    });
  },
  'click #edit-purchase-order': function() {
    Modal.show('updatePurchaseOrderFormModal', this);
  }
});

Template.purchaseOrderItem.events({
  'click #removePurchaseOrderItem': function() {
    PurchaseOrderItems.remove(this._id);
  },
  'click #edit-po-item': function() {
    Modal.show('editPurchaseOrderItemModal', this);
  }
});

Template.purchaseOrderItem.helpers({
  currencySymbol: function() {
    if (this.currency === "GBP") return "£";
    if (this.currency === "USD") return "$";
    if (this.currency === "EUR") return "€";
  }
});

Template.purchaseOrderDetail.helpers({
  purchaseOrderData: function() {
    var purchaseOrderId = FlowRouter.getParam('id');
    return PurchaseOrders.findOne(purchaseOrderId);
  },
  hasItems: function() {
    return PurchaseOrderItems.find({
      purchaseOrderId: this._id
    }).count() > 0;
  },
  purchaseOrderItems: function() {
    return PurchaseOrderItems.find({
      purchaseOrderId: this._id
    });
  },
  isOpen: function() {
    return(this.status !=="Closed" ? true : false);
  },
  canAddMoreItems: function() {
    return(this.status ==="Requested" ? true : false);
  }
});
