Collections = {};

Tenants = new Mongo.Collection('tenants');
Tenants.helpers({
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  }
});

Companies = new Mongo.Collection('companies');
Partitioner.partitionCollection(Companies);
Companies.helpers({
  contacts: function() {
    return Contacts.find({
      companyId: this._id
    });
  },
  activities: function() {
    return Activities.find({
      companyId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  projects: function() {
    return Projects.find({
      companyId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  purchaseOrders: function() {
    var data = [];
    var projects = Projects.find({
      companyId: this._id
    }).fetch();

    if (projects) {
      _.each(projects, function(p) {
        Meteor.subscribe('allPurchaseOrderItemsByProject', p._id);

        var items = PurchaseOrderItems.find({
          projectId: p._id
        }).fetch();

        if (items) {
          _.each(items, function(i) {
            Meteor.subscribe('purchaseOrderById', i.purchaseOrderId);
            var purchaseOrder = PurchaseOrders.findOne({
              _id: i.purchaseOrderId
            });
            if (purchaseOrder) {
              if (_.findWhere(data, purchaseOrder) === undefined) {
                data.push(purchaseOrder);
              }
            }
          });
        }
      })
    };

    return data;
  }
});
Companies.initEasySearch(['name', 'tags'], {
  limit: 50,
  sort: function() {
    return {
      'name': 1
    };
  }
});
Tags.TagsMixin(Companies);
Collections.companies = Companies;

Contacts = new Mongo.Collection('contacts');
Partitioner.partitionCollection(Contacts);
Contacts.helpers({
  name: function() {
    return [this.forename, this.surname].join(' ');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    return Activities.find({
      contactId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  purchaseOrders: function() {
    var data = [];
    var projects = Projects.find({
      contactId: this._id
    }).fetch();

    if (projects) {
      _.each(projects, function(p) {
        Meteor.subscribe('allPurchaseOrderItemsByProject', p._id);

        var items = PurchaseOrderItems.find({
          projectId: p._id
        }).fetch();

        if (items) {
          _.each(items, function(i) {
            Meteor.subscribe('purchaseOrderById', i.purchaseOrderId);
            var purchaseOrder = PurchaseOrders.findOne({
              _id: i.purchaseOrderId
            });
            if (purchaseOrder) {
              if (_.findWhere(data, purchaseOrder) === undefined) {
                data.push(purchaseOrder);
              }
            }
          });
        }
      })
    };

    return data;
  }
});
Contacts.initEasySearch(['forename', 'surname', 'tags'], {
  limit: 50,
  sort: function() {
    return {
      'surname': 1
    };
  }
});
Tags.TagsMixin(Contacts);
Collections.contacts = Contacts;

Activities = new Mongo.Collection('activities');
Partitioner.partitionCollection(Activities);
Activities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  },
  purchaseOrder: function() {
    return PurchaseOrders.findOne(this.purchaseOrderId);
  }
});
Activities.initEasySearch('notes', {
  limit: 50
});

Projects = new Mongo.Collection('projects');
Partitioner.partitionCollection(Projects);
Projects.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  activities: function() {
    return Activities.find({
      projectId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  },
  purchaseOrders: function() {
    return PurchaseOrders.find({
      projectId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});
Projects.initEasySearch(['description', 'tags'], {
  limit: 50
});
Tags.TagsMixin(Projects);
Collections.projects = Projects;

PurchaseOrders = new Mongo.Collection('purchaseorders');
Partitioner.partitionCollection(PurchaseOrders);
PurchaseOrders.helpers({
  supplierCompany: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  // customerCompany: function() {
  //   return Companies.findOne(this.customerCompanyId);
  // },
  activities: function() {
    return Activities.find({
      purchaseOrderId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  supplierContact: function() {
    return Contacts.findOne(this.supplierContactId);
  },
  // customerContact: function() {
  //   return Contacts.findOne(this.customerContactId);
  // },
  // project: function() {
  //   return Projects.findOne(this.projectId);
  // }
});
PurchaseOrders.initEasySearch('description', {
  limit: 50,
  sort: function() {
    return {
      'orderNumber': 1
    };
  }
});
Collections.purchaseOrders = PurchaseOrders;

PurchaseOrderItems = new Mongo.Collection('purchaseorderitems');
Partitioner.partitionCollection(PurchaseOrderItems);
PurchaseOrderItems.initEasySearch('description', {
  limit: 50
});

Notifications = new Mongo.Collection('notifications');

Chatterbox = new Mongo.Collection('chatterbox');
Partitioner.partitionCollection(Chatterbox);

// The tags package introduces Meteor.tags as a collection
Partitioner.partitionCollection(Meteor.tags);

Tasks = new Mongo.Collection('tasks');
Partitioner.partitionCollection(Tasks);

AuditLog = new Mongo.Collection('audit');
Partitioner.partitionCollection(AuditLog);

Payments = new Mongo.Collection('payments');

//////////////////////
// COLLECTION HOOKS //
//////////////////////

var checkRecordsNumber = function() {
  if(!Tenants.findOne({})) {
    return true;
  }
  var payingTenant = Tenants.findOne({}).stripe.paying;
  var blockedTenant = Tenants.findOne({}).stripe.blocked;
  var totalRecords = (Tenants.findOne({}) === undefined) ? 0 : Tenants.findOne({}).stripe.totalRecords;
  totalRecords += 1;
  if(payingTenant) {
    return true;
  } else {
    if(Meteor.isServer) {
      if(totalRecords == MAX_RECORDS) {
        Meteor.call('tenantLimitReached');
      } else if(blockedTenant && totalRecords > MAX_RECORDS) {
        return false;
      }
      return true;
    }

    if(Meteor.isClient) {
      if(blockedTenant && totalRecords > MAX_RECORDS) {
        toastr.error('You have reached the maximum number of records and you are not able to add new ones.<br />Please upgrade to enjoy the full functionalities of RealitmeCRM.', 'Account Locked', {preventDuplicates: true});
        return false;
      } else if(totalRecords >= MAX_RECORDS) {
        toastr.options.preventDuplicates = true;
        toastr.warning('You have reached the maximum number of records.<br />Please consider upgrading.', 'Limit Reached');
      }
      return true;
    }
  }
};

Tenants.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
Tenants.after.insert(function(userId, doc) {
  logEvent('info', 'A new tenant has been created: ' + doc.name);
});
Tenants.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing tenant has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  var prevdoc = this.previous;
  var key;
  if(doc.settings !== undefined) {
    for (key in doc.settings) {
      if (doc.settings.hasOwnProperty(key)) {
        if (doc.settings[key] !== prevdoc.settings[key]) {
          logEvent('info', 'An existing tenant has been updated: The value of tenant setting "' + key + '" was changed from ' + prevdoc.settings[key] + " to " + doc.settings[key]);
        }
      }
    }
  }
});
Tenants.after.remove(function(userId, doc) {
  logEvent('info', 'A tenant has been deleted: ' + doc.name);
});

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Meteor.users.after.insert(function(userId, doc) {
  logEvent('info', 'A user has been created: ' + doc.name);
});

Meteor.users.after.remove(function(userId, doc) {
  logEvent('info', 'A user has been removed: ' + doc.name);
});

Companies.before.insert(function(userId, doc) {
  if(!checkRecordsNumber()) {
    return false;
  }
  return true;
});
Companies.after.insert(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A new company has been created: ' + doc.name);

});
Companies.after.update(function(userId, doc, fieldNames, modifier, options) {

  if (this.previous.website !== doc.website && doc.website !== '') {
    Meteor.call('getClearbitData', 'company', doc._id);
  }

  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing company has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  if (doc.address !== this.previous.address) {
    logEvent('info', 'An existing company has been updated: The value of "address" was changed from ' + this.previous.address + " to " + doc.address);
  }
  if (doc.address2 !== this.previous.address2) {
    logEvent('info', 'An existing company has been updated: The value of "address2" was changed from ' + this.previous.address2 + " to " + doc.address2);
  }
  if (doc.city !== this.previous.city) {
    logEvent('info', 'An existing company has been updated: The value of "city" was changed from ' + this.previous.city + " to " + doc.city);
  }
  if (doc.county !== this.previous.county) {
    logEvent('info', 'An existing company has been updated: The value of "county" was changed from ' + this.previous.county + " to " + doc.county);
  }
  if (doc.postcode !== this.previous.postcode) {
    logEvent('info', 'An existing company has been updated: The value of "postcode" was changed from ' + this.previous.postcode + " to " + doc.postcode);
  }
  if (doc.country !== this.previous.country) {
    logEvent('info', 'An existing company has been updated: The value of "country" was changed from ' + this.previous.country + " to " + doc.country);
  }
  if (doc.website !== this.previous.website) {
    logEvent('info', 'An existing company has been updated: The value of "website" was changed from ' + this.previous.website + " to " + doc.website);
  }
  if (doc.phone !== this.previous.phone) {
    logEvent('info', 'An existing company has been updated: The value of "phone" was changed from ' + this.previous.phone + " to " + doc.phone);
  }
}, {
  fetchPrevious: true
});
Companies.after.remove(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A company has been deleted: ' + doc.name);
});

Contacts.before.insert(function(userId, doc) {
  if(!checkRecordsNumber()) {
    return false;
  }
  return true;
});
Contacts.after.insert(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A new contact has been created: ' + doc.forename + " " + doc.surname);
});
Contacts.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (this.previous.email !== doc.email && doc.email !== '' && doc.email !== undefined) {
    Meteor.call('getClearbitData', 'contact', doc._id);
  }

  if (doc.forename !== this.previous.forename) {
    logEvent('info', 'An existing contact has been updated: The value of "forename" was changed from ' + this.previous.forename + " to " + doc.forename);
  }
  if (doc.surname !== this.previous.surname) {
    logEvent('info', 'An existing contact has been updated: The value of "surname" was changed from ' + this.previous.surname + " to " + doc.surname);
  }
  if (doc.email !== this.previous.email) {
    logEvent('info', 'An existing contact has been updated: The value of "email" was changed from ' + this.previous.email + " to " + doc.email);
  }
  if (doc.phone !== this.previous.phone) {
    logEvent('info', 'An existing contact has been updated: The value of "phone" was changed from ' + this.previous.phone + " to " + doc.phone);
  }
  if (doc.mobile !== this.previous.mobile) {
    logEvent('info', 'An existing contact has been updated: The value of "mobile" was changed from ' + this.previous.mobile + " to " + doc.mobile);
  }
  if (doc.jobtitle !== this.previous.jobtitle) {
    logEvent('info', 'An existing contact has been updated: The value of "jobtitle" was changed from ' + this.previous.jobtitle + " to " + doc.jobtitle);
  }
  if (doc.companyId !== this.previous.companyId) {
    var prevComp = Companies.findOne(this.previous.companyId);
    var newComp = Companies.findOne(doc.companyId);
    if (prevComp === undefined) {
      prevComp = {
        name: 'None'
      };
    }
    if (newComp === undefined) {
      newComp = {
        name: 'None'
      };
    }
    logEvent('info', 'An existing contact has been updated: The value of "companyId" was changed from ' + this.previous.companyId + '(' + prevComp.name + ") to " + doc.companyId + ' (' + newComp.name + ')');
  }
});
Contacts.after.remove(function(userId, doc) {
  Meteor.call('updateTotalRecords');
  logEvent('info', 'A contact has been deleted: ' + doc.forename + " " + doc.surname);
});


Projects.after.insert(function(userId, doc) {
  logEvent('info', 'A new project has been created: ' + doc.description);
});
Projects.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing project has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description);
  }
  if (doc.companyId !== this.previous.companyId) {
    var prevComp = Companies.findOne(this.previous.companyId);
    var newComp = Companies.findOne(doc.companyId);
    logEvent('info', 'An existing project has been updated: The value of "companyId" was changed from ' + this.previous.companyId + '(' + prevComp.name + ") to " + doc.companyId + ' (' + newComp.name + ')');
  }
  if (doc.contactId !== this.previous.contactId) {
    var prevCont = Contacts.findOne(this.previous.contactId);
    var newCont = Contacts.findOne(doc.contactId);
    logEvent('info', 'An existing project has been updated: The value of "contactId" was changed from ' + this.previous.contactId + '(' + prevCont.forename + " " + prevCont.surname + ") to " + doc.contactId + ' (' + newCont.forename + " " + newCont.surname + ')');
  }
  if (doc.userId !== this.previous.userId) {
    var prevUser = Meteor.users.findOne(this.previous.userId);
    var newUser = Meteor.users.findOne(doc.userId);
    logEvent('info', 'An existing project has been updated: The value of "userId" was changed from ' + this.previous.userId + '(' + prevUser.profile.name + ") to " + doc.userId + ' (' + newUser.profile.name + ')');
  }
  if (doc.value !== this.previous.value) {
    logEvent('info', 'An existing project has been updated: The value of "value" was changed from ' + this.previous.value + " to " + doc.value);
  }
});
Projects.after.remove(function(userId, doc) {
  logEvent('info', 'A project has been deleted: ' + doc.description);
});


PurchaseOrders.after.insert(function(userId, doc) {
  logEvent('info', 'A new purchase order has been created: ' + doc.description);
});

PurchaseOrders.before.update(function(userId, doc) {
  if (userId) {
    // if (doc.status) {

    // if (doc.status === "Requested" && doc.locked) {
    //   //can't return to requested once above it - cancel update
    //   toastr.warning('The status of this purchase order cannot be set to "Requested" - it has already been submitted.');
    //   return false;
    // }

    // if (doc.status !== "" && doc.status !== "Requested" && doc.status !== "Cancelled") {

    var user = Meteor.users.findOne(userId);
    var level = parseFloat(user.profile.poAuthLevel);

    // if (level === 0) {
    //   toastr.warning('Your current authorisation level restricts you to requests and cancellations only. Please contact your system administrator.');
    //   Modal.hide();
    //   return false;
    // } else {

    var items = PurchaseOrderItems.find({
      purchaseOrderId: doc._id
    }).fetch();

    var total = 0;
    _.each(items, function(i) {
      total += parseFloat(i.totalPrice);
    });

    if (total > level) {
      toastr.warning('The value of this purchase order is currently higher than your current authorisation level allows. Please contact your system administrator.');
      Modal.hide();
      return false;
    }
    // }
    // }
    // }
  }
});

PurchaseOrders.after.update(function(userId, doc, fieldNames, modifier, options) {
  // if (doc.status !== "Requested" || doc.status !== "") {
  //   PurchaseOrders.update(doc._id, {
  //     $set: {
  //       locked: true
  //     }
  //   });
  // }

  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing purchase order has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description);
  }
  if (doc.userId !== this.previous.userId) {
    var prevUser = Meteor.users.findOne(this.previous.userId);
    var newUser = Meteor.users.findOne(doc.userId);
    logEvent('info', 'An existing purchase order has been updated: The value of "userId" was changed from ' + this.previous.userId + '(' + prevUser.profile.name + ") to " + doc.userId + ' (' + newUser.profile.name + ')');
  }
  if (doc.orderNumber !== this.previous.orderNumber) {
    logEvent('info', 'An existing purchase order has been updated: The value of "orderNumber" was changed from ' + this.previous.orderNumber + " to " + doc.orderNumber);
  }
  if (doc.supplierReference !== this.previous.supplierReference) {
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierReference" was changed from ' + this.previous.supplierReference + " to " + doc.supplierReference);
  }
  if (doc.status !== this.previous.status) {
    logEvent('info', 'An existing purchase order has been updated: The value of "status" was changed from ' + this.previous.status + " to " + doc.status);
  }
  if (doc.orderDate !== this.previous.orderDate) {
    logEvent('info', 'An existing purchase order has been updated: The value of "orderDate" was changed from ' + this.previous.orderDate + " to " + doc.orderDate);
  }
  if (doc.paymentMethod !== this.previous.paymentMethod) {
    logEvent('info', 'An existing purchase order has been updated: The value of "paymentMethod" was changed from ' + this.previous.paymentMethod + " to " + doc.paymentMethod);
  }
  if (doc.notes !== this.previous.notes) {
    logEvent('info', 'An existing purchase order has been updated: The value of "notes" was changed from ' + this.previous.notes + " to " + doc.notes);
  }
  if (doc.supplierCompanyId !== this.previous.supplierCompanyId) {
    var prevComp = Companies.findOne(this.previous.supplierCompanyId);
    var newComp = Companies.findOne(doc.supplierCompanyId);
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierCompanyId" was changed from ' + this.previous.supplierCompanyId + '(' + prevComp.name + ") to " + doc.supplierCompanyId + ' (' + newComp.name + ')');
  }
  if (doc.supplierContactId !== this.previous.supplierContactId) {
    var prevCont = Contacts.findOne(this.previous.supplierContactId);
    var newCont = Contacts.findOne(doc.supplierContactId);
    logEvent('info', 'An existing purchase order has been updated: The value of "supplierContactId" was changed from ' + this.previous.supplierContactId + '(' + prevCont.forename + " " + prevCont.surname + ") to " + doc.supplierContactId + ' (' + newCont.forename + " " + newCont.surname + ')');
  }
  // if (doc.projectId !== this.previous.projectId) {
  //   var prevProj = Projects.findOne(this.previous.projectId);
  //   var newProj = Projects.findOne(doc.projectId);
  //   logEvent('info', 'An existing purchase order has been updated: The value of "projectId" was changed from ' + this.previous.projectId + '(' + prevProj.description + ") to " + doc.projectId + ' (' + newProj.description + ')');
  // }
});
PurchaseOrders.after.remove(function(userId, doc) {
  logEvent('info', 'A purchase order has been deleted: ' + doc.description);
});


PurchaseOrderItems.after.insert(function(userId, doc) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);
  logEvent('info', 'A new purchase order item has been created: ' + doc.name + '(' + currentPurchaseOrder.description + ")");
});
PurchaseOrderItems.after.update(function(userId, doc, fieldNames, modifier, options) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);

  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.productCode !== this.previous.productCode) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "productCode" was changed from ' + this.previous.productCode + " to " + doc.productCode + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.value !== this.previous.value) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "value" was changed from ' + this.previous.value + " to " + doc.value + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.quantity !== this.previous.quantity) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "quantity" was changed from ' + this.previous.quantity + " to " + doc.quantity + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.totalPrice !== this.previous.totalPrice) {
    logEvent('info', 'An existing purchase order item has been updated: The value of "totalPrice" was changed from ' + this.previous.totalPrice + " to " + doc.totalPrice + '(' + currentPurchaseOrder.description + ")");
  }
  if (doc.purchaseOrderId !== this.previous.purchaseOrderId) {
    var prevPO = Projects.findOne(this.previous.purchaseOrderId);
    var newPO = Projects.findOne(doc.purchaseOrderId);
    logEvent('info', 'An existing purchase order has been updated: The value of "purchaseOrderId" was changed from ' + this.previous.purchaseOrderId + '(' + prevPO.description + ") to " + doc.purchaseOrderId + ' (' + newPO.description + ')');
  }
});
PurchaseOrderItems.after.remove(function(userId, doc) {
  var currentPurchaseOrder = PurchaseOrders.findOne(doc.purchaseOrderId);
  logEvent('info', 'A purchase order item has been deleted: ' + doc.name + ' (' + currentPurchaseOrder.description + ")");
});


Activities.after.insert(function(userId, doc) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = PurchaseOrders.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  var content = TagStripper.strip(doc.notes, "", "", false);

  logEvent('info', 'A new activity has been created: ' + content + ' (' + entityName + ")");
});
Activities.after.update(function(userId, doc, fieldNames, modifier, options) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = Projects.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  if (doc.type !== this.previous.type) {
    logEvent('info', 'An existing activity has been updated: The value of "type" was changed from ' + this.previous.type + " to " + doc.type + ' (' + entityName + ")");
  }
  if (doc.notes !== this.previous.notes) {
    logEvent('info', 'An existing activity has been updated: The value of "notes" was changed. (' + entityName + ")");
  }
  if (doc.activityTimestamp !== this.previous.activityTimestamp) {
    logEvent('info', 'An existing activity has been updated: The value of "activityTimestamp" was changed from ' + this.previous.activityTimestamp + " to " + doc.activityTimestamp + ' (' + entityName + ")");
  }
});
Activities.after.remove(function(userId, doc) {
  var entity;
  var entityName;
  if (doc.companyId) {
    entity = Companies.findOne(doc.companyId);
    entityName = "Company: " + entity.name;
  }
  if (doc.contactId) {
    entity = Contacts.findOne(doc.contactId);
    entityName = "Contact: " + entity.forename + " " + entity.surname;
  }
  if (doc.projectId) {
    entity = Projects.findOne(doc.projectId);
    entityName = "Project: " + entity.description;
  }
  if (doc.purchaseOrderId) {
    entity = Projects.findOne(doc.purchaseOrderId);
    entityName = "Purchase Order: " + entity.description;
  }

  var content = TagStripper.strip(doc.notes, "", "", false);
  logEvent('info', 'An existing activity has been deleted: ' + content + ' (' + entityName + ")");
});


Tasks.after.insert(function(userId, doc) {
  var entity;
  var entityName;
  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }

  logEvent('info', 'A new task has been created: ' + doc.title + ' (' + entityName + ")");
});
Tasks.after.update(function(userId, doc, fieldNames, modifier, options) {
  var entity;
  var entityName;

  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }

  if (doc.title !== this.previous.title) {
    logEvent('info', 'An existing task has been updated: The value of "title" was changed from ' + this.previous.title + " to " + doc.title + ' (' + entityName + ")");
  }
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing task has been updated: The value of "description" was changed from ' + this.previous.description + " to " + doc.description + ' (' + entityName + ")");
  }
  if (doc.dueDate !== this.previous.dueDate) {
    logEvent('info', 'An existing task has been updated: The value of "dueDate" was changed from ' + this.previous.dueDate + " to " + doc.dueDate + ' (' + entityName + ")");
  }
  if (doc.completed !== this.previous.completed) {
    logEvent('info', 'An existing task has been updated: The value of "completed" was changed from ' + this.previous.completed + " to " + doc.completed + ' (' + entityName + ")");
  }
  if (doc.entityType !== this.previous.entityType) {
    logEvent('info', 'An existing task has been updated: The value of "entityType" was changed from ' + this.previous.entityType + " to " + doc.entityType + ' (' + entityName + ")");
  }

  if (doc.entityId !== this.previous.entityId) {
    var prevEntity;
    var prevEntityName;
    switch (this.previous.entityType) {
      case 'company':
        prevEntity = Companies.findOne(this.previous.entityId);
        prevEntityName = "Company: " + prevEntity.name;
        break;
      case 'contact':
        prevEntity = Contacts.findOne(this.previous.entityId);
        prevEntityName = "Contact: " + prevEntity.forename + " " + prevEntity.surname;
        break;
      case 'project':
        prevEntity = Projects.findOne(this.previous.entityId);
        prevEntityName = "Project: " + prevEntity.description;
        break;
      case 'user':
        prevEntity = Meteor.users.findOne(this.previous.entityId);
        prevEntityName = "User: " + prevEntity.profile.name;
        break;
    }

    logEvent('info', 'An existing task has been updated: The value of "entityId" was changed from ' + this.previous.entityId + ' (' + prevEntityName + ") to " + doc.entityId + ' (' + entityName + ")");
  }
  if (doc.assigneeId !== this.previous.assigneeId) {
    var prevUser = Meteor.users.findOne(this.previous.assigneeId);
    var newUser = Meteor.users.findOne(doc.assigneeId);
    logEvent('info', 'An existing task has been updated: The value of "assigneeId" was changed from ' + this.previous.assigneeId + '(' + prevUser.profile.name + ") to " + doc.assigneeId + ' (' + newUser.profile.name + ')');
  }
});
Tasks.after.remove(function(userId, doc) {
  var entity;
  var entityName;
  switch (doc.entityType) {
    case 'company':
      entity = Companies.findOne(doc.entityId);
      entityName = "Company: " + entity.name;
      break;
    case 'contact':
      entity = Contacts.findOne(doc.entityId);
      entityName = "Contact: " + entity.forename + " " + entity.surname;
      break;
    case 'project':
      entity = Projects.findOne(doc.entityId);
      entityName = "Project: " + entity.description;
      break;
    case 'user':
      entity = Meteor.users.findOne(doc.entityId);
      entityName = "User: " + entity.profile.name;
      break;
  }

  logEvent('info', 'An existing task has been deleted: ' + doc.title + '(' + entityName + ")");
});


//Products
Products = new Mongo.Collection('products');
Partitioner.partitionCollection(Products);
Products.initEasySearch(['name'], {
  limit: 50
});
Collections.products = Products;

Products.after.insert(function(userId, doc) {
  logEvent('info', 'A new product has been created: ' + doc.name);
});
Products.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing product has been updated: The value of "description" was changed');
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing product has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  if (doc.cost !== this.previous.cost) {
    logEvent('info', 'An existing product has been updated: The value of "cost price" was changed from ' + this.previous.cost + " to " + doc.cost);
  }
  if (doc.price !== this.previous.price) {
    logEvent('info', 'An existing product has been updated: The value of "sales price" was changed from ' + this.previous.price + " to " + doc.price);
  }
});
Products.after.remove(function(userId, doc) {
  logEvent('info', 'A product has been deleted: ' + doc.name);
});


//Opportunities
Opportunities = new Mongo.Collection('opportunities');
Opportunities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },
  contact: function() {
    return Contacts.findOne(this.contactId);
  }
});
Partitioner.partitionCollection(Opportunities);
Opportunities.initEasySearch(['name', 'tags'], {
  limit: 50,
  props: {
    showArchived: false
  },
  query: function(searchString) {
    var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
    if (!this.props.showArchived) {
      query.isArchived = {
        $ne: true
      };
    }
    return query;
  }
});
Tags.TagsMixin(Opportunities);
Collections.opportunities = Opportunities;

OpportunityStages = new Mongo.Collection('opportunitystages');
Partitioner.partitionCollection(OpportunityStages);


Opportunities.after.insert(function(userId, doc) {
  logEvent('info', 'A new opportunity has been created: ' + doc.name);
});
Opportunities.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing opportunity has been updated: The value of "description" was changed');
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing opportunity has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
});
Opportunities.after.remove(function(userId, doc) {
  logEvent('info', 'An opportunity has been deleted: ' + doc.name);
});
