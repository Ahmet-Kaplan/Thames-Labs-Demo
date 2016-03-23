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

  this.showClosed = new ReactiveVar(false);
  this.totalPurchaseOrders = new ReactiveVar(0);
  this.totalApprovedPo = new ReactiveVar(0);
  this.totalArrivedPo = new ReactiveVar(0);
  this.totalClosedPo = new ReactiveVar(0);
  this.totalCancelledPo = new ReactiveVar(0);
  this.totalRejectedPo = new ReactiveVar(0);
});

Template.purchaseOrderList.onRendered(function() {
  var template = this;

  var curr = Session.get("showItems");
  if (curr === true) {
    $('#toggle-item-view').addClass('btn-success').removeClass('btn-default');
    $(".po-list-item").css('margin-bottom', '4px');
    $(".po-list-item").css('padding-bottom', '0');
  } else {
    $('#toggle-item-view').removeClass('btn-success').addClass('btn-default');
    $(".po-list-item").css('margin-bottom', '');
    $(".po-list-item").css('padding-bottom', '');
  }

  this.autorun(() => {
    var searchComponent = PurchaseOrdersIndex.getComponentMethods();
    if (this.showClosed.get()) {
      searchComponent.addProps('showClosed', 'true');
    } else {
      searchComponent.removeProps('showClosed');
    }
  });

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
    container: "#btn-popover"
  });
});

Template.purchaseOrderList.events({
  'click #toggle-item-view': function(event, template) {
    var curr = Session.get("showItems");
    Session.set("showItems", !curr);

    if (Session.get("showItems") === true) {
      $('#toggle-item-view').addClass('btn-success').removeClass('btn-default');
      $(".po-list-item").css('margin-bottom', '4px');
      $(".po-list-item").css('padding-bottom', '0');
    } else {
      $('#toggle-item-view').removeClass('btn-success').addClass('btn-default');
      $(".po-list-item").css('margin-bottom', '');
      $(".po-list-item").css('padding-bottom', '');
    }
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
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
  },
  'click #toggle-closed': function(event) {
    event.preventDefault();
    var showClosed = Template.instance().showClosed.get();
    Template.instance().showClosed.set(!showClosed);
    $(event.target).blur();
  },
});

Template.purchaseOrderList.helpers({
  closedShown: function() {
    return Template.instance().showClosed.get();
  },
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
});