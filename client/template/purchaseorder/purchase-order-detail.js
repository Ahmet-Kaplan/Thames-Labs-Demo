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

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var customerName = "",
          // customerContact = "",
          customerAddress = "",
          orderNumber = "";

      var company = Companies.findOne(this.customerCompanyId);
      customerName = company.name;
      customerAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;

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
        };

        running += parseFloat(oi.totalPrice);

        items.push(obj);
      });

      var vatAmount = parseFloat((running / 100) * 20);
      var totalValue = running + vatAmount;

      doc.setData({
        "customerName": customerName,
        // "customerContact": customerContact,
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
      docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      //Convert data into a blob format for sending to api
      var blob = new Blob([docDataUri], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      saveAs(blob, file.name);
    }.bind(this);
    reader.readAsArrayBuffer(file);
  },
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);

      var customerName = "",
          // customerContact = "",
          customerAddress = "",
          orderNumber = "";

      var company = Companies.findOne(this.customerCompanyId);
      customerName = company.name;
      customerAddress = company.address + "\r\n" + company.address2 + "\r\n" + company.city + "\r\n" + company.county + "\r\n" + company.country + "\r\n" + company.postcode;
      // if (this.customerContactId) {
      //   var contact = Contacts.findOne(this.customerContactId);
      //   customerContact = contact.title + " " + contact.forename + " " + contact.surname;
      // }
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
        };

        running += parseFloat(oi.totalPrice);

        items.push(obj);
      });

      var vatAmount = parseFloat((running / 100) * 20);
      var totalValue = running + vatAmount;

      doc.setData({
        "customerName": customerName,
        // "customerContact": customerContact,
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

      docDataUri.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      //Convert data into a blob format for sending to api
      var blob = new Blob([docDataUri], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      var data = new FormData();
      data.append('file', blob, 'purchaseorder.docx');
      data.append('type', 'pdf');
      data.append('assign', 'connection_number@&@30@&@connection_duration@&@30 sec');
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://gybra-swissknifedocs.p.mashape.com/docs');
      xhr.setRequestHeader('X-Mashape-Key', 'lkiGJfIdcNmshokW0VQBWvDBxzg4p12J1UEjsnBhpOquVKzczR');

      xhr.onload = function(r) {
        var fileName = JSON.parse(r.srcElement.response)['file_name'];
        var filePath = 'https://gybra-swissknifedocs.p.mashape.com/download/' + fileName;
        HTTP.get(filePath, {
          headers: {
            'X-Mashape-Key': 'lkiGJfIdcNmshokW0VQBWvDBxzg4p12J1UEjsnBhpOquVKzczR'
          }
        }, function(err, res) {

          function base64toBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
              var begin = sliceIndex * sliceSize;
              var end = Math.min(begin + sliceSize, bytesLength);

              var bytes = new Array(end - begin);
              var i, offset;
              for (offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
              }
              byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, {
              type: contentType
            });
          }

          //Convert returned base64 string into blob for download
          var blobData = base64toBlob(res.data.file, 'application/pdf');
          Meteor.call('remainingConversions', res.headers['x-ratelimit-requests-remaining'], function(err, res) {});
          saveAs(blobData, file.name.replace(".docx", ".pdf"));
        });
      };
      toastr.success("Your file will be downloaded shortly", "Processing...");
      xhr.send(data);
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
    Modal.show('updatePurchaseOrderFormModal',this);
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
