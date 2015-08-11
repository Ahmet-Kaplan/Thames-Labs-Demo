Session.set('posc', null);
Session.set('pocc', null);

Template.newPurchaseOrderForm.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);
  Session.set('posc', null);
  Session.set('pocc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }

  var cc = this.data.customerCompanyId;
  if (cc) {
    Session.set('pocc', cc);
  } else {
    Session.set('pocc', null);
  }
});

Template.newCompanyPurchaseOrderForm.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);
  Meteor.subscribe("allCompanies");
  Session.set('posc', null);
  Session.set('pocc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }

  var cc = this.data.customerCompanyId;
  if (cc) {
    Session.set('pocc', cc);
  } else {
    Session.set('pocc', null);
  }
});

Template.newContactPurchaseOrderForm.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);
  Meteor.subscribe("allCompanies");
  Session.set('posc', null);
  Session.set('pocc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }

  var cc = this.data.customerCompanyId;
  if (cc) {
    Session.set('pocc', cc);
  } else {
    Session.set('pocc', null);
  }
});

Template.updatePurchaseOrderFormModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  var groupId = Meteor.users.findOne(Meteor.userId()).group;
  Meteor.subscribe("myTenant", groupId);
  Session.set('posc', null);
  Session.set('pocc', null);

  var c = this.data.supplierCompanyId;
  if (c) {
    Session.set('posc', c);
  } else {
    Session.set('posc', null);
  }

  var cc = this.data.customerCompanyId;
  if (cc) {
    Session.set('pocc', cc);
  } else {
    Session.set('pocc', null);
  }
});

Template.newPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  },
  'change #selectedCustomer': function() {
    var c = $('select#selectedCustomer').val();
    if (c) {
      Session.set('pocc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Meteor.subscribe('allContacts', c);
      Session.set('pocc', null);
    }
  }
});

Template.newCompanyPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  },
  'change #selectedCustomer': function() {
    var c = $('select#selectedCustomer').val();
    if (c) {
      Session.set('pocc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Meteor.subscribe('allContacts', c);
      Session.set('pocc', null);
    }
  }
});

Template.newContactPurchaseOrderForm.events({
  'change #selectedSupplier': function() {
    var c = $('select#selectedSupplier').val();
    if (c) {
      Session.set('posc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('posc', null);
    }
  },
  'change #selectedCustomer': function() {
    var c = $('select#selectedCustomer').val();
    if (c) {
      Session.set('pocc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Meteor.subscribe('allContacts', c);
      Session.set('pocc', null);
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
  },
  'change #selectedCustomer': function() {
    var c = $('select#selectedCustomer').val();
    if (c) {
      Session.set('pocc', c);
      Meteor.subscribe('contactsByCompanyId', c);
      Meteor.subscribe('projectsByCompanyId', c);
    } else {
      Session.set('pocc', null);
    }
  }
});

Template.newPurchaseOrderForm.helpers({
  showContacts: function() {
    if (Session.get('pocc') === null) {
      return false;
    } else {
      return true;
    }
  },
  showSupplierContacts: function() {
    if (Session.get('posc') === null) {
      return false;
    } else {
      return true;
    }
  },
  showProjects: function() {
    if (Session.get('pocc') === null) {
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
    if (Session.get('pocc') !== null) {
      return Contacts.find({
        companyId: Session.get('pocc')
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
    } else {
      return Contacts.find({
        companyId: undefined
      }).map(function(contact) {
        return {
          'label': contact.forename + " " + contact.surname,
          'value': contact._id
        };
      });
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
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('pocc')
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
  companiesAsOptions: function() {
    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  showContacts: function() {
    if (Session.get('pocc') === null) {
      return false;
    } else {
      return true;
    }
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
  currentUser: function() {
    return Meteor.userId();
  },
  currentDateTime: function() {
    // return new Date();
    return moment();
  },
  contactsAsOptions: function() {
    return Contacts.find({
      companyId: Session.get('pocc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('pocc')
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
      contactId: this.customerContactId,
      companyId: undefined
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
  showContacts: function() {
    if (Session.get('pocc') === null) {
      return false;
    } else {
      return true;
    }
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
      companyId: Session.get('pocc')
    }).map(function(contact) {
      return {
        'label': contact.forename + " " + contact.surname,
        'value': contact._id
      };
    });
  },
  projectsAsOptions: function() {
    return Projects.find({
      companyId: Session.get('pocc')
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
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

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

Template.editPurchaseOrderItemModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
})
