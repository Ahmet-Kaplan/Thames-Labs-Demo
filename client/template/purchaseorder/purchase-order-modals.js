Session.set('posc', null);
Session.set('poStat', null);
Session.set('poIsLocked', null);

/*******************************************************
                    newPurchaseOrderForm
*******************************************************/

Template.newPurchaseOrderForm.onRendered(function() {
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newPurchaseOrderForm.helpers({
  // showSupplierContacts: function() {
  //   if (Session.get('posc') === null) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    return moment();
  }
});

Template.newPurchaseOrderForm.events({
  'change #supplierCompanyId': function() {
    var c = $('select#supplierCompanyId').val();
    if (c) {
      Session.set('posc', c);
    } else {
      Session.set('posc', null);
    }
  }
});

/*******************************************************
              newCompanyPurchaseOrderForm
*******************************************************/

Template.newCompanyPurchaseOrderForm.onRendered(function() {
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newCompanyPurchaseOrderForm.helpers({
  showSupplierContacts: function() {
    if (Session.get('posc') === null) {
      return false;
    } else {
      return true;
    }
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  }
});

Template.newCompanyPurchaseOrderForm.events({
  'change #supplierCompanyId': function() {
    var c = $('select#supplierCompanyId').val();
    if (c) {
      Session.set('posc', c);
    } else {
      Session.set('posc', null);
    }
  }
});

/*******************************************************
              newContactPurchaseOrderForm
*******************************************************/

Template.newContactPurchaseOrderForm.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  }
});

/*******************************************************
              updatePurchaseOrderFormModal
*******************************************************/

Template.updatePurchaseOrderFormModal.onRendered(function() {
  Session.set('posc', null);
  Session.set('poStat', this.data.status);
  Session.set('poIsLocked', this.data.locked);

  if (this.data.status !== "Requested" && this.data.status !== "Requested" && this.data.status !== "Cancelled") {
    PurchaseOrders.update(this.data._id, {
      $set: {
        locked: true
      }
    });
    Session.set('poIsLocked', true);
  }

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.updatePurchaseOrderFormModal.events({
  'change #poStatus': function() {
    var user = Meteor.users.findOne(Meteor.userId());
    var level = parseFloat(user.profile.poAuthLevel);
    var selected = $('#poStatus').val();

    if (level === 0) {
      if (selected !== "Requested" && selected !== "Cancelled") {
        var origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('Your authorisation level only permits you to set order status to "Requested" or "Cancelled".');
        return false;
      }
    }

    if (Session.get('poIsLocked')) {
      if (selected === "Requested") {
        var origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('You cannot set the order status to "Requested" - it has already been submitted for authorisation.');
        return false;
      }
    }
  }
});

Template.updatePurchaseOrderFormModal.onDestroyed(function() {
  Session.set('posc', null);
  Session.set('poStat', null);
  Session.set('poIsLocked', null);
});

/*******************************************************
              addPurchaseOrderItemModal
*******************************************************/

Template.addPurchaseOrderItemModal.onRendered(function() {
  var v = $('#itemValue').val();
  var q = $('#currQuant').val();

  Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
    if (error) {

    } else {
      $('#activePrice').prop('value', result);
    }
  });
});

Template.addPurchaseOrderItemModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.addPurchaseOrderItemModal.events({
  'change #itemValue': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {

      } else {
        $('#activePrice').prop('value', result);
      }
    });
  },
  'change #currQuant': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {

      } else {
        $('#activePrice').prop('value', result);
      }
    });
  }
});

/*******************************************************
              editPurchaseOrderItemModal
*******************************************************/

Template.editPurchaseOrderItemModal.onRendered(function() {
  var pid = this.data.projectId;
  Meteor.subscribe('allProjects');

  if (pid) {
    $('#currProj').val(pid);
  }
});

Template.editPurchaseOrderItemModal.helpers({
  projectsAsOptions: function() {
    var data = [];
    var projects = Projects.find().fetch();

    _.each(projects, function(project) {
      if (project.companyId) {
        var company = Companies.findOne(project.companyId);
        var info = {
          'label': project.name + " (" + company.name + ")",
          'value': project._id
        };

        data.push(info);
      } else {
        var contact = Contacts.findOne(project.contactId);
        var info = {
          'label': project.name + " (" + contact.forename + " " + contact.surname + ")",
          'value': project._id
        };

        data.push(info);
      }
    });

    return data;
  }
});

Template.editPurchaseOrderItemModal.events({
  'change #itemValue': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {

      } else {
        $('#activePrice').prop('value', result);
      }
    });
  },
  'change #currQuant': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {

      } else {
        $('#activePrice').prop('value', result);
      }
    });
  }
});
