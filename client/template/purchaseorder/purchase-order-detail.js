Template.purchaseOrderDetail.onCreated(function() {
  this.autorun(() => {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access Purchase Orders');
      FlowRouter.go('/');
    }

    const purchaseOrder = PurchaseOrders.findOne(FlowRouter.getParam('id'));
    if (purchaseOrder) {
      this.subscribe('companyById', purchaseOrder.supplierCompanyId);
      this.subscribe('contactById', purchaseOrder.supplierContactId);
    }
    // Redirect if data doesn't exist
    if (FlowRouter.subsReady() && typeof purchaseOrder === "undefined") {
      FlowRouter.go('purchaseOrders');
    }
  });

  const purchaseOrderId = FlowRouter.getParam('id');
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
    const project = Projects.findOne(this.projectId);
    if (project) return project.name;
    return "No project";
  }
});

Template.purchaseOrderDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Purchase Order #" + this.sequencedIdentifier : "Purchase Order");
  },
  purchaseOrderData: function() {
    const purchaseOrderId = FlowRouter.getParam('id');
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
    const file = event.target.files[0];
    if (!file) return;
    if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      toastr.error("Unable to process file. Please ensure the provided file is a word document (.docx)");
      return;
    }

    const reader = new FileReader();
    reader.onload = function() {
      const doc = new Docxgen(reader.result),
            company = Companies.findOne(this.supplierCompanyId),
            orderDate = moment(this.orderDate).format("MMM Do YYYY"),
            orderItems = PurchaseOrderItems
              .find({
                purchaseOrderId: this._id
              })
              .fetch(),
            items = _
              .map(orderItems, (item) => ({
                name: item.description || '',
                count: item.quantity || '',
                value: item.value || '',
                total: parseFloat(item.totalPrice) || 0
              })),
            totalExcVat = _.sumBy(items, 'total'),
            vat = totalExcVat * 0.2,
            totalIncVat = totalExcVat + vat,
            addressFields = ['address', 'address2', 'city', 'county', 'country', 'postcode'],
            customerAddress = _
              .chain(company)
              .pickBy( (value, key) => _.includes(addressFields, key) )
              .values()
              .join('\n')
              .value();

      doc.setData({
        "supplierName": _.get(company, 'name') || '',
        "supplierAddress": customerAddress || '',
        "supplierReference": this.supplierReference || '',
        "orderNumber": this.sequencedIdentifier || '',
        "orderDate": orderDate || '',
        "items": items,
        "totalExcVat": parseFloat(totalExcVat).toFixed(2) || '',
        "vat": parseFloat(vat).toFixed(2) || '',
        "totalIncVat": parseFloat(totalIncVat).toFixed(2) || '',
        "description": this.description || '',
        "paymentMethod": this.paymentMethod || '',
        "notes": this.notes || '',
        "status": this.status || ''
      });

      try {
        doc.render();
        const docDataUri = doc.getZip().generate({
          type: 'blob'
        });
        docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        //Convert data into a blob format for sending to api
        const blob = new Blob([docDataUri], {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
        saveAs(blob, file.name);
        toastr.success("Your data has been successfully extracted.");

      } catch (err) {
        toastr.error("Unable to process file.");
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
    const poId = this._id;

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
    const itemId = this._id;
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
