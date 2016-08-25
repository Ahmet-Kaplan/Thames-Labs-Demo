import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/purchase-orders/modals/insert/insert-purchase-order.js';
import '/imports/ui/components/purchase-orders/list-item/purchase-order-list-item.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/import/import.js';
import '/imports/ui/components/purchase-orders/reports/overview.js';

import './purchase-order-list.html';

Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access Purchase Orders');
      FlowRouter.go('/');
    }

    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
  Session.set("showItems", false);

  // Store search index dict on template to allow helpers to access
  this.index = PurchaseOrdersIndex;

  this.showItems = new ReactiveVar(false);
  this.totalPOs = new ReactiveVar(0);
});

Template.purchaseOrderList.onRendered(function() {

  this.autorun(() => {
    this.totalPOs.set(Collections['purchaseorders'].index.getComponentDict().get('count'));
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: ".list-header-right"
  });

  if(!_.get(Collections['purchaseorders'].index.getComponentDict().get('searchOptions').props, "active")) {
    Collections['purchaseorders'].index.getComponentMethods().addProps('active', 'Yes');
  }
});

Template.purchaseOrderList.events({
  'click #toggle-item-view': function(event, template) {
    const curr = Session.get("showItems");
    Session.set("showItems", !curr);
    template.showItems.set(!curr);
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('insertPurchaseOrderModal', this);
  }
});

Template.purchaseOrderList.helpers({
  poCount: function() {
    return Template.instance().totalPOs.get();
  },
  hasMultiplePOs: function() {
    return Template.instance().totalPOs.get() !== 1;
  }
});
