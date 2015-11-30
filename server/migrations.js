// For documentation see
// https://github.com/percolatestudio/meteor-migrations

Migrations.add({
  version: 1,
  name: "Adds activityTimestamp to existing activities",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      Activities.find({
        activityTimestamp: null
      }).forEach(
        function(doc) {
          Activities.update(doc._id, {
            $set: {
              activityTimestamp: doc.createdAt
            }
          });
        }
      );
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 2,
  name: "Adds createdAt to existing tenants and users",
  up: function() {
    ServerSession.set('maintenance', true);
    var date = new Date();
    Meteor.users.find({
      createdAt: null
    }).forEach(
      function(doc) {
        Meteor.users.update(doc._id, {
          $set: {
            createdAt: date
          }
        });
      }
    );
    Tenants.find({
      createdAt: null
    }).forEach(
      function(doc) {
        Tenants.update(doc._id, {
          $set: {
            createdAt: date
          }
        });
      }
    );
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 3,
  name: "Adds _groupId to tasks created before collection was partitioned",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      Tasks.find({
        _groupId: {
          $exists: false
        }
      }).forEach(
        function(doc) {
          var userGroup = Partitioner.getUserGroup(doc.createdBy);
          Tasks.update(
            doc._id, {
              $set: {
                _groupId: userGroup
              }
            }, {
              filter: false,
              validate: false
            }
          );
        }
      );
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 4,
  name: "Merge features and notifications",
  up: function() {
    ServerSession.set('maintenance', true);
    Notifications.remove({});
    ServerSession.set('maintenance', false);
  }
});

var updateCustomFields = function(collection) {
  Partitioner.directOperation(function() {
    Collections[collection].find({
      customFields: {
        $exists: true
      }
    }).forEach(function(doc) {
      var customFields = doc.customFields;
      customFields = lodash.mapValues(customFields, function(value) {
        return typeof value === 'object' ? value : {
          'dataValue': value,
          'dataType': 'text'
        };
      });
      Collections[collection].update(doc._id, {
        $set: {
          'customFields': customFields
        }
      });
    });
  });
};
Migrations.add({
  version: 5,
  name: "Add type to existing extended information fields",
  up: function() {
    ServerSession.set('maintenance', true);
    updateCustomFields('contacts');
    updateCustomFields('companies');
    ServerSession.set('maintenance', false);
  }
});

var updateUserPermissions = function() {
  var permissions = [
    "CanReadContacts",
    "CanReadCompanies",
    "CanCreateCompanies",
    "CanEditCompanies",
    "CanDeleteCompanies",
    "CanCreateContacts",
    "CanEditContacts",
    "CanDeleteContacts",
    "CanReadProjects",
    "CanCreateProjects",
    "CanEditProjects",
    "CanDeleteProjects",
    "CanReadProducts",
    "CanCreateProducts",
    "CanEditProducts",
    "CanDeleteProducts",
    "CanReadTasks",
    "CanCreateTasks",
    "CanEditTasks",
    "CanDeleteTasks",
    "CanReadPurchaseOrders",
    "CanCreatePurchaseOrders",
    "CanEditPurchaseOrders",
    "CanDeletePurchaseOrders",
    "CanReadEventLog",
    "CanCreateEventLog",
    "CanEditEventLog",
    "CanDeleteEventLog",
    "CanReadOpportunities",
    "CanCreateOpportunities",
    "CanEditOpportunities",
    "CanDeleteOpportunities"
  ];

  Meteor.users.find({}).forEach(
    function(u) {
      lodash.each(permissions, function(p) {
        if (!Roles.userIsInRole(u, p)) {
          Roles.addUsersToRoles(u, p);
        }
      });
    }
  );
};
var revertUserPermissions = function() {
  var permissions = [
    "CanReadContacts",
    "CanReadCompanies",
    "CanCreateCompanies",
    "CanEditCompanies",
    "CanDeleteCompanies",
    "CanCreateContacts",
    "CanEditContacts",
    "CanDeleteContacts",
    "CanReadProjects",
    "CanCreateProjects",
    "CanEditProjects",
    "CanDeleteProjects",
    "CanReadProducts",
    "CanCreateProducts",
    "CanEditProducts",
    "CanDeleteProducts",
    "CanReadTasks",
    "CanCreateTasks",
    "CanEditTasks",
    "CanDeleteTasks",
    "CanReadPurchaseOrders",
    "CanCreatePurchaseOrders",
    "CanEditPurchaseOrders",
    "CanDeletePurchaseOrders",
    "CanReadEventLog",
    "CanCreateEventLog",
    "CanEditEventLog",
    "CanDeleteEventLog",
    "CanReadOpportunities",
    "CanCreateOpportunities",
    "CanEditOpportunities",
    "CanDeleteOpportunities"
  ];

  Meteor.users.find({}).forEach(
    function(u) {
      lodash.each(permissions, function(p) {
        if (!Roles.userIsInRole(u, p)) {
          Roles.removeUsersFromRoles(u, p);
        }
      });
    }
  );
};

Migrations.add({
  version: 6,
  name: "Add default permissions",
  up: function() {
    ServerSession.set('maintenance', true);
    updateUserPermissions();
    ServerSession.set('maintenance', false);
  },
  down: function() {
    ServerSession.set('maintenance', true);
    revertUserPermissions();
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 7,
  name: "Clear existing audit log",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      AuditLog.remove({});
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 8,
  name: "Remove title field on contacts",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      Contacts.update({}, {
        $unset: {
          title: ''
        }
      }, {
        multi: true,
        validate: false
      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 9,
  name: "Add default parameters to Tenants to enable Stripe implementation",
  up: function() {
    ServerSession.set('maintenance', true);
    Tenants.find({}).forEach(function(tenant) {
      if (tenant.stripe === undefined || (tenant.stripe.totalRecords === undefined && tenant.stripe.paying === undefined && tenant.stripe.blocked === undefined)) {
        var totalRecordsNumber = Partitioner.bindGroup(tenant._id, function() {
          return Companies.find().count() + Contacts.find().count();
        });
        Tenants.update(tenant._id, {
          $set: {
            "stripe.totalRecords": totalRecordsNumber,
            "stripe.paying": false,
            "stripe.blocked": false
          }
        });
      }
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 10,
  name: "Transfer project description to project name to allow the implementation of an actual project description",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      Projects.find({}).forEach(function(project) {
        if (project.name === undefined) {
          Projects.update(project._id, {
            $set: {
              name: project.description,
              description: ''
            }
          });
        }
      });
    });
    ServerSession.set('maintenance', false);
  }
});

var defineGlobalCustomFields = function(collection) {
  Partitioner.directOperation(function() {
    Collections[collection].find({
      customFields: {
        $exists: true
      }
    }).forEach(function(doc) {
      var customFields = doc.customFields;

      var cfMaster = {};
      for (var cf in customFields) {
        cfMaster[cf] = customFields[cf];
        cfMaster[cf]['isGlobal'] = false;
      }

      Collections[collection].update(doc._id, {
        $set: {
          'customFields': cfMaster
        }
      });
    });
  });
};
Migrations.add({
  version: 11,
  name: "Update extended information fields to flag globals",
  up: function() {
    ServerSession.set('maintenance', true);
    defineGlobalCustomFields('companies');
    defineGlobalCustomFields('contacts');
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 12,
  name: "Remove stripe.blocked from all tenants",
  up: function() {
    ServerSession.set('maintenance', true);
    Tenants.update({}, {
      $unset: {
        'stripe.blocked': ''
      }
    });
    ServerSession.set('maintenance', false);
  }
});


Migrations.add({
  version: 13,
  name: "Migrate opportunity stages from collection to tenant settings object",
  up: function() {
    ServerSession.set('maintenance', true);
    var OpportunityStages = new Mongo.Collection('opportunitystages');
    Partitioner.partitionCollection(OpportunityStages);
    var tenants = Tenants.find({}).fetch();

    _.forEach(tenants, function(t) {

      Partitioner.bindGroup(t._id, function() {
        var stages = [];
        var currentStages = OpportunityStages.find({}).fetch();

        currentStages = _.sortBy(currentStages, 'order');

        _.each(currentStages, function(stage, i) {
          var stageData = {
            title: stage.title,
            description: stage.description,
            id: i
          };

          Opportunities.update({
            currentStageId: stage._id
          }, {
            $set: {
              currentStageId: i
            }
          }, {
            multi: true
          });

          stages.push(stageData);
        });

        Tenants.update(t._id, {
          $set: {
            'settings.opportunity.stages': stages
          }
        });

      });

    });


    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 14,
  name: "Auto-verify existing user emails",
  up: function() {
    ServerSession.set('maintenance', true);

    Meteor.users.update({}, {
      $set: {
        "emails.0.verified": true
      }
    }, {
      multi: true
    });
    ServerSession.set('maintenance', false);
  }
});
