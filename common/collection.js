g_Tenants = new Mongo.Collection('tenant');
g_Tenants.helpers({
  users: function() {
    return Meteor.users.find({ group: this._id });
  }
});

g_Companies = new Mongo.Collection('company');
Partitioner.partitionCollection(g_Companies);
g_Companies.helpers({
  contacts: function() {
    return g_Contacts.find({ companyId: this._id });
  },
  activities: function() {
    return g_Activities.find({ companyId: this._id }, { sort: { createdAt: -1 } });
  },
  projects: function() {
    return g_Projects.find({ companyId: this._id }, { sort: { createdAt: -1 } });
  },
  purchaseOrders: function() {
    return g_PurchaseOrders.find({ supplierCompanyId: this._id }, { sort: { createdAt: -1 } });
  }
});
g_Companies.initEasySearch('name', {
  limit: 50
});

g_Contacts = new Mongo.Collection('contact');
Partitioner.partitionCollection(g_Contacts);
g_Contacts.helpers({
  name: function() {
    return [this.title, this.forename, this.surname].join(' ');
  },
  company: function() {
    return g_Companies.findOne(this.companyId);
  },
  activities: function() {
    return g_Activities.find({ contactId: this._id }, { sort: { createdAt: -1 } });
  },
  purchaseOrders: function() {
    return g_PurchaseOrders.find({ supplierContactId: this._id }, { sort: { createdAt: -1 } });
  }
});
g_Contacts.initEasySearch(['forename', 'surname'], {
  limit: 50
});

g_Activities = new Mongo.Collection('activity');
Partitioner.partitionCollection(g_Activities);
g_Activities.helpers({
  company: function() {
    return g_Companies.findOne(this.companyId);
  },
  contact: function() {
    return g_Contacts.findOne(this.contactId);
  },
  project: function() {
    return g_Projects.findOne(this.projectId );
  },
  purchaseOrder: function() {
    return g_PurchaseOrders.findOne(this.purchaseOrderId);
  }
});
g_Activities.initEasySearch('notes', {
  limit: 50
});

g_Projects = new Mongo.Collection('project');
Partitioner.partitionCollection(g_Projects);
g_Projects.helpers({
  company: function() {
    return g_Companies.findOne(this.companyId);
  },
  activities: function() {
    return g_Activities.find({ projectId: this._id }, { sort: { createdAt: -1 } });
  },
  contact: function() {
    return g_Contacts.findOne(this.contactId);
  },
  purchaseOrders: function() {
    return g_PurchaseOrders.find({ projectId: this._id }, { sort: { createdAt: -1 } });
  }
});
g_Projects.initEasySearch('description', {
  limit: 50
});

g_PurchaseOrders = new Mongo.Collection('purchaseorder');
Partitioner.partitionCollection(g_PurchaseOrders);
g_PurchaseOrders.helpers({
  company: function() {
    return g_Companies.findOne(this.supplierCompanyId);
  },
  activities: function() {
    return g_Activities.find({ purchaseOrderId: this._id }, { sort: { createdAt: -1 } });
  },
  contact: function() {
    return g_Contacts.findOne(this.supplierContactId);
  },
  project: function() {
    return g_Projects.findOne(this.projectId);
  }
});
g_PurchaseOrders.initEasySearch('description', {
  limit: 50
});

g_PurchaseOrderItems = new Mongo.Collection('purchaseorderitem');
Partitioner.partitionCollection(g_PurchaseOrderItems);
g_PurchaseOrderItems.initEasySearch('description', {
  limit: 50
});
