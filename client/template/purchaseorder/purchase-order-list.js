import '/imports/ui/components/tags/tag-management/tag-management.js';

Template.purchaseOrderList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access Purchase Orders');
      FlowRouter.go('/');
    }

    redirectWithoutPermission(Meteor.userId(), 'CanReadPurchaseOrders');
  });
  Session.set("showItems", false);

  // Store search index dict on template to allow helpers to access
  this.index = PurchaseOrdersIndex;

  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);

  this.showItems = new ReactiveVar(false);
  this.totalPOs = new ReactiveVar(0);
});

Template.purchaseOrderList.onRendered(function() {

  this.autorun(() => {
    this.totalPOs.set(Collections['purchaseorders'].index.getComponentDict().get('count'));
  });

  var template = this;

  var curr = Session.get("showItems");
  if (curr === true) {
    $(".po-list-item").css('margin-bottom', '4px');
    $(".po-list-item").css('padding-bottom', '0');
  } else {
    $(".po-list-item").css('margin-bottom', '');
    $(".po-list-item").css('padding-bottom', '');
  }

  Meteor.call('report.numberOfPurchaseOrders', function(err, data) {
    template.totalPurchaseOrders.set(data.Count);
  });
  Meteor.call('report.ApprovedPo', function(err, data) {
    template.totalApprovedPo.set(data.Count);
  });
  Meteor.call('report.ArrivedPo', function(err, data) {
    template.totalArrivedPo.set(data.Count);
  });
  Meteor.call('report.ClosedPo', function(err, data) {
    template.totalClosedPo.set(data.Count);
  });
  Meteor.call('report.CancelledPo', function(err, data) {
    template.totalCancelledPo.set(data.Count);
  });
  Meteor.call('report.RejectedPo', function(err, data) {
    template.totalRejectedPo.set(data.Count);
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
    var curr = Session.get("showItems");
    Session.set("showItems", !curr);
    template.showItems.set(!curr);

    if (Session.get("showItems") === true) {
      $(".po-list-item").css('margin-bottom', '4px');
      $(".po-list-item").css('padding-bottom', '0');
    } else {
      $(".po-list-item").css('margin-bottom', '');
      $(".po-list-item").css('padding-bottom', '');
    }
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('insertPurchaseOrderModal', this);
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('purchaseorders');
  },
  'click #ref_poOverviewWidget': function(event, template) {

    Meteor.call('report.numberOfPurchaseOrders', function(err, data) {
      template.totalPurchaseOrders.set(data.Count);
    });
    Meteor.call('report.ApprovedPo', function(err, data) {
      template.totalApprovedPo.set(data.Count);
    });
    Meteor.call('report.ArrivedPo', function(err, data) {
      template.totalArrivedPo.set(data.Count);
    });

    Meteor.call('report.ClosedPo', function(err, data) {
      template.totalClosedPo.set(data.Count);
    });
    Meteor.call('report.CancelledPo', function(err, data) {
      template.totalCancelledPo.set(data.Count);
    });
    Meteor.call('report.RejectedPo', function(err, data) {
      template.totalRejectedPo.set(data.Count);
    });
  }
});

Template.purchaseOrderList.helpers({
  totalPurchaseOrders: function() {
    return Template.instance().totalPurchaseOrders.get();
  },
  totalApprovedPo: function() {
    return Template.instance().totalApprovedPo.get();
  },
  totalArrivedPo: function() {
    return Template.instance().totalArrivedPo.get();
  },
  totalClosedPo: function() {
    return Template.instance().totalClosedPo.get();
  },
  totalCancelledPo: function() {
    return Template.instance().totalCancelledPo.get();
  },
  totalRejectedPo: function() {
    return Template.instance().totalRejectedPo.get();
  },
  showItems: function() {
    return Template.instance().showItems.get();
  },
  poCount: function() {
    return Template.instance().totalPOs.get();
  },
  hasMultiplePOs: function() {
    return Template.instance().totalPOs.get() !== 1;
  }
});
