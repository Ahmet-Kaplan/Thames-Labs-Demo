Collections = {};

Tenants = new Mongo.Collection('tenants');
Tenants.helpers({
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  }
});

Tenants.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
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
    return PurchaseOrders.find({
      supplierCompanyId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
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
    return [this.title, this.forename, this.surname].join(' ');
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
    return PurchaseOrders.find({
      supplierContactId: this._id
    }, {
      sort: {
        createdAt: -1
      }
    });
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
  company: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  activities: function() {
    return Activities.find({
      purchaseOrderId: this._id
    }, {
      sort: {
        activityTimestamp: -1
      }
    });
  },
  contact: function() {
    return Contacts.findOne(this.supplierContactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  }
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

Features = new Mongo.Collection('features');

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
