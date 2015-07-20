Session.set('posc', null);

Template.newPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newCompanyPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.newContactPurchaseOrderForm.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }
});

Template.updatePurchaseOrderFormModal.onRendered(function() {
  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);

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
    if (c){
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
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
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  }
});

Template.newPurchaseOrderForm.helpers({
  showContacts: function() {
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
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('posc')
    }).map(function(project) {
      return {
        'label': project.description,
        'value': project._id
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
  showContacts: function() {
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
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('posc')
    }).map(function(project) {
      return {
        'label': project.description,
        'value': project._id
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


Template.newContactPurchaseOrderForm.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  projectsAsOptions: function() {
    return Projects.find({
      contactId: this.supplierContactId
    }).map(function(project) {
      return {
        'label': project.description,
        'value': project._id
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


Template.updatePurchaseOrderFormModal.helpers({
  showContacts: function() {
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
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('posc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('posc')
    }).map(function(project) {
      return {
        'label': project.description,
        'value': project._id
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
