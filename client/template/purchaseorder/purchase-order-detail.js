Template.purchaseOrderDetail.onCreated(function() {
  this.autorun(() => {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access Purchase Orders');
      FlowRouter.go('/');
    }

    var purchaseOrder = PurchaseOrders.findOne(FlowRouter.getParam('id'));
    if (purchaseOrder) {
      this.subscribe('companyById', purchaseOrder.supplierCompanyId);
      this.subscribe('contactById', purchaseOrder.supplierContactId);
    }
    // Redirect if data doesn't exist
    if (FlowRouter.subsReady() && typeof purchaseOrder === "undefined") {
      FlowRouter.go('purchaseOrders');
    }
  });

  var purchaseOrderId = FlowRouter.getParam('id');
  this.subscribe('allPurchaseOrderItems', purchaseOrderId);
  this.subscribe('activityByPurchaseOrderId', purchaseOrderId);
  this.subscribe('tasksByEntityId', purchaseOrderId);

  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
});

Template.purchaseOrderDetail.onRendered(function() {
  $.getScript('/vendor/docxgen.min.js');
});

Template.purchaseOrderItem.helpers({
  currencySymbol: function() {
    if (this.currency === "GBP") return "£";
    if (this.currency === "USD") return "$";
    if (this.currency === "EUR") return "€";
  },
  canAddMoreItems: function(parentContext) {
    this.parentContext = parentContext;
    return (this.parentContext.status === "Requested");
  },
  orderItemStatus: function() {
    if (typeof this.status === "undefined") {
      return "No status set.";
    }
    return this.status;
  },
  statusIcon: function() {
    switch (this.status) {
      case 'Dispatched':
        return "fa fa-fw fa-truck text-warning";
      case 'Delivered':
        return "fa fa-fw fa-check text-success";
      case 'Cancelled':
        return "fa fa-fw fa-times text-danger";
      default:
        return "";
    }
  },
  projectName: function() {
    var project = Projects.findOne(this.projectId);
    if (project) return project.name;
    return "No project";
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
    return (this.status !== "Closed");
  },
  canAddMoreItems: function() {
    return (this.status === "Requested");
  },
  canExportDocx: function() {
    if (bowser.safari) {
      return false;
    }
    return true;
  }
});

Template.purchaseOrderDetail.events({
  'change #template-upload-docx': function(event) {
    var file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to extract to file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);
      var customerName = "",
          customerAddress = "";

      var company = Companies.findOne(this.supplierCompanyId);
      customerName = company.name;
      customerAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;

      var orderDate = moment(this.orderDate).format("MMM Do YYYY");

      var orderItems = PurchaseOrderItems.find({
        purchaseOrderId: this._id
      }).fetch();
      var items = [];
      var running = 0;

      _.each(orderItems, function(oi) {
        var obj = {
          name: oi.description || '',
          count: oi.quantity || '',
          value: oi.value || '',
          total: oi.totalPrice || '',
        };

        running += parseFloat(oi.totalPrice);

        items.push(obj);
      });

      var vatAmount = parseFloat((running / 100) * 20);
      var totalValue = running + vatAmount;

      doc.setData({
        "supplierName": customerName || '',
        "supplierAddress": customerAddress || '',
        "supplierReference": this.supplierReference || '',
        "orderNumber": this.sequencedIdentifier || '',
        "orderDate": orderDate || '',
        "items": items,
        "running": parseFloat(running).toFixed(2) || '',
        "vat": parseFloat(vatAmount).toFixed(2) || '',
        "total": parseFloat(totalValue).toFixed(2) || '',
        "description": this.description || '',
        "paymentMethod": this.paymentMethod || '',
        "notes": this.notes || '',
        "status": this.status || ''
      });

      try {
        doc.render();
        var docDataUri = doc.getZip().generate({
          type: 'blob'
        });
        docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //Convert data into a blob format for sending to api
        var blob = new Blob([docDataUri], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        saveAs(blob, file.name);
        toastr.success("Your data has been successfully extracted.");

      } catch (err) {
        toastr.error("Unable to extract to file.");
      }
      $('#template-upload-docx').val('');
    }.bind(this);
    reader.readAsArrayBuffer(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-upload-link-docx': function() {
    document.getElementById('template-upload-docx').click();
  },
  'click #po-template-help': function(event) {
    event.preventDefault();
    Modal.show('poHelpModal');
  },
  'click #add-item': function(event) {
    event.preventDefault();
    Modal.show('addPurchaseOrderItemModal', {
      purchaseOrder: this
    });
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertPurchaseOrderActivityModal', {
      purchaseOrder: this
    });
  },
  'click #edit-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('updatePurchaseOrderFormModal', this);
  },
  'click #remove-purchase-order': function(event) {
    event.preventDefault();
    var poId = this._id;

    bootbox.confirm("Are you sure you wish to delete this purchase order?", function(result) {
      if (result === true) {
        PurchaseOrders.remove(poId);
      }
    });
  },
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('updatePurchaseOrderFormModal', this);
  }
});

Template.purchaseOrderItem.events({
  'click #removePurchaseOrderItem': function(event) {
    event.preventDefault();
    var itemId = this._id;
    bootbox.confirm("Are you sure you wish to delete this item?", function(result) {
      if (result === true) {
        PurchaseOrderItems.remove(itemId);
      }
    });
  },
  'click #edit-po-item': function(event) {
    event.preventDefault();
    Modal.show('editPurchaseOrderItemModal', {
      purchaseOrder: Template.parentData(),
      purchaseOrderItem: this
    });
  }
});
