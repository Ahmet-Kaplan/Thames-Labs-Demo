Template.footer.helpers({
  tenantName: function() {
    var tenant = Tenants.findOne({});
    return !!tenant ? tenant.name : null;
  }
});

Template.footer.events({
  'click #fab': function(event) {
      $("#fab-menu").toggle(function() {
        $("i", "#fab-btn").toggleClass("fa fw-fa fa-plus fa fw-fa fa-times")
      })
  },
  'click #fabAddContacts': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateContacts'])) {
      toastr.warning('You do not have permission to create contacts. Please contact your system administrator.');
      return;
    }
    event.preventDefault();
    Modal.show('insertContactModal', this);
  },
  'click #fabAddCompanies': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateCompanies'])) {
      toastr.warning('You do not have permission to create companies. Please contact your system administrator.');
      return;
    }

    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  },
  'click #fabAddProject': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreateProjects'])) {
      toastr.warning('You do not have permission to create projects. Please contact your system administrator.');
      return;
    }
    event.preventDefault();
    Modal.show('newProjectForm', this);
  },
  'click #fabAddPurchaseOrder': function(event) {
    if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanCreatePurchaseOrders'])) {
      toastr.warning('You do not have permission to create purchase orders. Please contact your system administrator.');
      return;
    }
    event.preventDefault();
    Modal.show('newPurchaseOrderForm', this);
  }
});
