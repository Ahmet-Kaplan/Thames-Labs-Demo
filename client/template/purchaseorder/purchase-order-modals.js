Session.set('posc', null);
Session.set('poStat', null);
Session.set('poIsLocked', null);

Template.newPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("activeTenantData", groupId);
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newCompanyPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("activeTenantData", groupId);
  Meteor.subscribe("allCompanies");
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newContactPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("activeTenantData", groupId);
  Meteor.subscribe("allCompanies");
  Session.set('posc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.updatePurchaseOrderFormModal.onDestroyed(function() {
  Session.set('posc', null);
  Session.set('poStat', null);
  Session.set('poIsLocked', null);
});

Template.updatePurchaseOrderFormModal.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("activeTenantData", groupId);
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

Template.newPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      // Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  }
});

Template.newCompanyPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      // Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  }
});

Template.newContactPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      // Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  }
});

Template.updatePurchaseOrderFormModal.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      // Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  },
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

Template.newPurchaseOrderForm.helpers({
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
  },
  companiesAsOptions: function() {
    return Companies.find({}, {sort: {name: 1}}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  supplierContactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }, {sort: {forename: 1}}).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});

Template.newCompanyPurchaseOrderForm.helpers({
  companiesAsOptions: function() {
    return Companies.find({}, {sort: {name: 1}}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  showSupplierContacts: function() {
    if (Session.get('posc') === null) {
      return false;
    } else {
      return true;
    }
  },
  supplierContactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }, {sort: {forename: 1}}).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});


Template.newContactPurchaseOrderForm.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  showSupplierContacts: function() {
    if (Session.get('posc') === null) {
      return false;
    } else {
      return true;
    }
  },
  supplierContactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: undefined
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  }
});


Template.updatePurchaseOrderFormModal.helpers({
  showSupplierContacts: function() {
    if (Session.get('posc') === null) {
      return false;
    } else {
      return true;
    }
  },
  supplierContactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  companiesAsOptions: function() {
    return Companies.find({}, {sort: {name: 1}}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  }
});

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
  },
  projectsAsOptions: function() {
    var data = [];
    var projects = Projects.find().fetch();

    _.each(projects, function(project) {
      if (project.companyId) {
        var company = Companies.findOne(project.companyId);
        var info = {
          'label': project.description + " (" + company.name + ")",
          'value': project._id
        };

        data.push(info);
      } else {
        var contact = Contacts.findOne(project.contactId);
        var info = {
          'label': project.description + " (" + contact.forename + " " + contact.surname + ")",
          'value': project._id
        };

        data.push(info);
      }
    });

    return data;
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

Template.editPurchaseOrderItemModal.helpers({
  projectsAsOptions: function() {
    var data = [];
    var projects = Projects.find().fetch();

    _.each(projects, function(project) {
      if (project.companyId) {
        var company = Companies.findOne(project.companyId);
        var info = {
          'label': project.description + " (" + company.name + ")",
          'value': project._id
        };

        data.push(info);
      } else {
        var contact = Contacts.findOne(project.contactId);
        var info = {
          'label': project.description + " (" + contact.forename + " " + contact.surname + ")",
          'value': project._id
        };

        data.push(info);
      }
    });

    return data;
  }
});

Template.editPurchaseOrderItemModal.onRendered(function() {
  var pid = this.data.projectId;
  Meteor.subscribe('allProjects');

  if (pid) {
    $('#currProj').val(pid);
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
