import _ from 'lodash';

import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import './purchase-order-list-item.css';
import './purchase-order-list-item.html';

Template.purchaseOrderListItem.onCreated(function() {
  this.subscribe('companyById', this.data.supplierCompanyId);
  this.subscribe('contactById', this.data.supplierContactId);
  this.subscribe('companyById', this.data.customerCompanyId);
  this.subscribe('contactById', this.data.customerContactId);
  this.subscribe('projectById', this.data.projectId);

  this.showItems = new ReactiveVar(false);
});

Template.purchaseOrderListItem.onRendered(function() {
  this.autorun(() => {
    this.showItems.set(Session.get("showItems"));
  });
});

Template.purchaseOrderListItem.helpers({
  name: function() {
    const searchDef = Template.currentData().index.getComponentDict().get('searchDefinition');
    const pattern = new RegExp(searchDef, 'gi');
    return Template.currentData().description.replace(pattern, '<span class="highlighted-search">$&</span>');
  },
  showItems: function() {
    const value = Template.instance().showItems.get();
    return value;
  },
  items: function() {
    Meteor.subscribe('allPurchaseOrderItems', this.__originalId);

    const items = PurchaseOrderItems.find({
      purchaseOrderId: this.__originalId
    }).fetch();
    const returnData = [];

    _.each(items, function(item) {
      const data = {
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