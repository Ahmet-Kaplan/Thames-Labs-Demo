Template.purchaseOrderListItem.onCreated(function() {
  this.subscribe('companyById', this.data.supplierCompanyId);
  this.subscribe('contactById', this.data.supplierContactId);
  this.subscribe('companyById', this.data.customerCompanyId);
  this.subscribe('contactById', this.data.customerContactId);
  this.subscribe('projectById', this.data.projectId);

  this.showItems = new ReactiveVar(false);
});

Template.purchaseOrderListItem.onRendered(function() {
  var self = this;

  this.autorun(function() {
    self.showItems.set(Session.get("showItems"));
  })
});

Template.purchaseOrderListItem.helpers({
  showItems: function() {
    var value = Template.instance().showItems.get();
    return value;
  },
  items: function() {
    Meteor.subscribe('allPurchaseOrderItems', this.__originalId);

    var items = PurchaseOrderItems.find({
      purchaseOrderId: this.__originalId
    }).fetch();
    var returnData = [];

    _.each(items, function(item) {
      var data = {
        description: item.description,
        code: item.productCode,
        price: item.totalPrice,
        quantity: item.quantity
      };
      returnData.push(data);
    });

    return returnData;
  },
  supplierCompany: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  supplierContact: function() {
    return Contacts.findOne(this.supplierContactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  }
});