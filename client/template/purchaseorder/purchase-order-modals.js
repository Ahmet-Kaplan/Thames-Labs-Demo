Session.set('posc', null);
Session.set('poStat', null);
Session.set('poIsLocked', null);

/*******************************************************
                    newPurchaseOrderForm
*******************************************************/

Template.insertPurchaseOrderModal.onRendered(function() {
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.insertPurchaseOrderModal.helpers({
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
    var dateTime = moment();
    var dateValue = moment({
      year: dateTime.year(),
      month: dateTime.month(),
      day: dateTime.date()
    });
    return dateValue;
  }
});

Template.insertPurchaseOrderModal.events({
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
    return (Session.get('posc') !== null);
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
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
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
  },
  supplierContactName: function() {
    var contact = Contacts.findOne({
      _id: this.supplierContactId
    });
    return contact.forename + " " + contact.surname;
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  }
});

/*******************************************************
              updatePurchaseOrderFormModal
*******************************************************/

Template.updatePurchaseOrderModal.onRendered(function() {
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

Template.updatePurchaseOrderModal.helpers({
  supplierCompanyName: function() {
    return Companies.findOne({
      _id: this.supplierCompanyId
    }).name;
  },
  supplierContactName: function() {
    var contact = Contacts.findOne({
      _id: this.supplierContactId
    });
    return contact.forename + " " + contact.surname;
  }
});

Template.updatePurchaseOrderModal.events({
  'change #poStatus': function() {
    var user = Meteor.users.findOne(Meteor.userId());
    var level = parseFloat(user.profile.poAuthLevel);
    var selected = $('#poStatus').val();

    if (level === 0) {
      if (selected !== "Requested" && selected !== "Cancelled") {
        const origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('Your authorisation level only permits you to set order status to "Requested" or "Cancelled".');
        return false;
      }
    }

    if (Session.get('poIsLocked')) {
      if (selected === "Requested") {
        const origVal = Session.get('poStat');
        $('#poStatus').val(origVal);
        toastr.warning('You cannot set the order status to "Requested" - it has already been submitted for authorisation.');
        return false;
      }
    }
  }
});

Template.updatePurchaseOrderModal.onDestroyed(function() {
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
      return false;
    }
    $('#activePrice').prop('value', result);
  });
});

Template.addPurchaseOrderItemModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.addPurchaseOrderItemModal.events({
  'change #itemValue, blur #itemValue': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  },
  'change #currQuant, blur #currQuant': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  }
});

/*******************************************************
              editPurchaseOrderItemModal
*******************************************************/

Template.updatePurchaseOrderItemModal.onRendered(function() {
  var pid = this.data.projectId;
  Meteor.subscribe('allProjects');

  if (pid) {
    $('#currProj').val(pid);
  }
});

Template.updatePurchaseOrderItemModal.helpers({
  projectsAsOptions: function() {
    var data = [];
    var projects = Projects.find().fetch();

    _.each(projects, function(project) {
      if (project.companyId) {
        var company = Companies.findOne(project.companyId);
        const info = {
          'label': project.name + " (" + company.name + ")",
          'value': project._id
        };

        data.push(info);
      } else {
        var contact = Contacts.findOne(project.contactId);
        const info = {
          'label': project.name + " (" + contact.forename + " " + contact.surname + ")",
          'value': project._id
        };

        data.push(info);
      }
    });

    return data;
  }
});

Template.updatePurchaseOrderItemModal.events({
  'change #itemValue': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  },
  'change #currQuant': function() {

    var v = $('#itemValue').val();
    var q = $('#currQuant').val();

    Meteor.call("calculatePurchaseOrderItemTotalValue", v, q, function(error, result) {
      if (error) {
        return false;
      }
      $('#activePrice').prop('value', result);
    });
  }
});
