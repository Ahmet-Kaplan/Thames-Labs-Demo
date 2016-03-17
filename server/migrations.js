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

// Migrations.add({
//   version: 12,
//   name: "Remove stripe.blocked from all tenants",
//   up: function() {
//     ServerSession.set('maintenance', true);
//     Tenants.update({}, {
//       $unset: {
//         'stripe.blocked': ''
//       }
//     });
//     ServerSession.set('maintenance', false);
//   }
// });

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

Migrations.add({
  version: 15,
  name: "Add project types to tenants",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      var projectType = {
        id: 0,
        name: "Standard Project",
        milestones: [{
          name: "Inception",
          description: "This is a newly-created project",
          id: 0
        }, {
          name: "Completion",
          description: "This project has been completed",
          id: 1
        }]
      };

      Tenants.update({}, {
        $set: {
          "settings.project.types": [projectType]
        }
      }, {
        multi: true
      });

      Projects.update({}, {
        $set: {
          projectTypeId: 0,
          projectMilestoneId: 0
        }
      }, {
        multi: true
      });
    });
    ServerSession.set('maintenance', false);
  }
});


Migrations.add({
  version: 16,
  name: "Add watchlist capability to all users",
  up: function() {
    ServerSession.set('maintenance', true);
    Meteor.users.update({}, {
      $set: {
        'profile.watchlist': []
      }
    }, {
      multi: true
    });
    ServerSession.set('maintenance', false);
  }
});


Migrations.add({
  version: 17,
  name: "Upgrade custom fields to new structure and include groupable-ness",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {

      var colls = ['companies', 'contacts', 'projects'];

      var tenants = Tenants.find({}).fetch();

      _.each(tenants, function(tenant) {

        _.each(colls, function(c) {

          var currentTenantData = null;
          switch (c) {
            case 'companies':
              currentTenantData = tenant.settings.extInfo.company;
              _.each(currentTenantData, function(ctd, i) {
                if (!ctd.dataOrder) ctd.dataOrder = i;
              });

              Tenants.update({
                _id: tenant._id
              }, {
                $set: {
                  'settings.extInfo.company': currentTenantData
                }
              });
              break;
            case 'contacts':
              currentTenantData = tenant.settings.extInfo.contact;
              _.each(currentTenantData, function(ctd, i) {
                if (!ctd.dataOrder) ctd.dataOrder = i;
              });

              Tenants.update({
                _id: tenant._id
              }, {
                $set: {
                  'settings.extInfo.contact': currentTenantData
                }
              });
              break;
            case 'projects':
              currentTenantData = tenant.settings.extInfo.project;
              _.each(currentTenantData, function(ctd, i) {
                if (!ctd.dataOrder) ctd.dataOrder = i;
              });

              Tenants.update({
                _id: tenant._id
              }, {
                $set: {
                  'settings.extInfo.project': currentTenantData
                }
              });
              break;
          }

          var currentData = Collections[c].find({}).fetch();
          _.each(currentData, function(data) {

            var fields = data.customFields;
            var newStructure = [];

            for (var i in fields) {
              if (fields.hasOwnProperty(i)) {
                var newInformation = {
                  dataName: i,
                  dataValue: fields[i].dataValue,
                  dataType: fields[i].dataType,
                  isGlobal: fields[i].isGlobal
                };

                var index = -1;
                for (var x = 0; x < newInformation.length - 1; x++) {
                  if (newStructure[x].dataName === i) {
                    index = x;
                  }
                }
                if (index === -1) {
                  newStructure.push(newInformation);
                }
              }
            }

            Collections[c].update({
              _id: data._id
            }, {
              $set: {
                extendedInformation: newStructure,
                customFields: {}
              }
            });

          });

        });

      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 18,
  name: "Add automatic calculation of PO total Price, set tenant currency",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      PurchaseOrders.find({}).forEach(function(po) {
        if (!po.totalValue) {
          PurchaseOrders.update({
            _id: po._id
          }, {
            $set: {
              totalValue: 0.00
            }
          });
        }
      });

      Tenants.find({}).forEach(function(tenant) {
        if (!tenant.settings.currency) {
          Tenants.update({
            _id: tenant._id
          }, {
            $set: {
              'settings.currency': 'gbp'
            }
          });
        }
      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 19,
  name: "Add the new tenant settings for sequential numbering",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {

      var tenants = Tenants.find({}).fetch();
      _.each(tenants, function(tenant) {

        //Remove the old numbering systems
        Tenants.update({
          _id: tenant._id
        }, {
          $set: {
            'settings.activity.defaultNumber': 0,
            'settings.task.defaultNumber': 0,
            'settings.company.defaultNumber': 0,
            'settings.contact.defaultNumber': 0,
            'settings.opportunity.defaultNumber': 0,
            'settings.project.defaultNumber': 0,
            'settings.product.defaultNumber': 0,
            'settings.purchaseorder.defaultPrefix': '',
            'settings.purchaseorder.defaultNumber': 0
          },
          $unset: {
            'settings.PurchaseOrderPrefix': "",
            'settings.PurchaseOrderStartingValue': ""
          }
        });
      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 20,
  name: "Add Default Permissions to all Administrators",
  up: function() {
    ServerSession.set('maintenance', true);
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
    Partitioner.directOperation(function() {
      Meteor.users.find({}).forEach(function(user) {
        if (Roles.userIsInRole(user._id, 'Administrator')) {
          permissions.forEach(function(perm) {
            Roles.addUsersToRoles(user._id, perm);
          });
        }
      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 21,
  name: "Update stripe object against tenants",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      var tenants = Tenants.find({}).fetch();
      _.each(tenants, function(t) {
        var stripe = t.stripe;
        var flag = false;
        if (stripe) {
          flag = (stripe.paying === true || stripe.freeUnlimited === true);
        }

        Tenants.update({
          _id: t._id
        }, {
          $set: {
            'plan': (flag === true ? 'pro' : 'free')
          },
          $unset: {
            'stripe.paying': "",
            'stripe.freeUnlimited': "",
            'stripe.totalRecords': ""
          }
        });
      });
    });
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 22,
  name: "Update custom fields to use new UUID system",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {

      var tenants = Tenants.find({}).fetch();

      _.each(tenants, function(t) {
        if (t.settings.extInfo) {
          var ei = t.settings.extInfo;
          var master = [];

          //Company instances
          _.each(ei.company, function(fl) {
            var instanceId = Guid.raw();
            fl.uuid = instanceId;
            master.push(fl);
            _.each(Companies.find({
              _groupId: t._id
            }).fetch(), function(objx) {
              cfMasterList = [];
              if (objx.extendedInformation) {
                for (var cf in objx.extendedInformation) {
                  if (objx.extendedInformation[cf].dataName === fl.name) {
                    objx.extendedInformation[cf].uuid = instanceId
                  }
                  cfMasterList.push(objx.extendedInformation[cf]);
                }
                Companies.update(objx._id, {
                  $set: {
                    extendedInformation: cfMasterList
                  }
                });
              }
            });
          });

          Tenants.update(t._id, {
            $set: {
              'settings.extInfo.company': master
            }
          });

          master = [];

          //Contact instances
          _.each(ei.contact, function(fl) {
            var instanceId = Guid.raw();
            fl.uuid = instanceId;
            master.push(fl);
            _.each(Contacts.find({
              _groupId: t._id
            }).fetch(), function(objx) {
              cfMasterList = [];
              if (objx.extendedInformation) {
                for (var cf in objx.extendedInformation) {
                  if (objx.extendedInformation[cf].dataName === fl.name) {
                    objx.extendedInformation[cf].uuid = instanceId
                  }
                  cfMasterList.push(objx.extendedInformation[cf]);
                }
                Contacts.update(objx._id, {
                  $set: {
                    extendedInformation: cfMasterList
                  }
                });
              }
            });
          });

          Tenants.update(t._id, {
            $set: {
              'settings.extInfo.contact': master
            }
          });

          master = [];

          //Project instances
          _.each(ei.project, function(fl) {
            var instanceId = Guid.raw();
            fl.uuid = instanceId;
            master.push(fl);
            _.each(Projects.find({
              _groupId: t._id
            }).fetch(), function(objx) {
              cfMasterList = [];
              if (objx.extendedInformation) {
                for (var cf in objx.extendedInformation) {
                  if (objx.extendedInformation[cf].dataName === fl.name) {
                    objx.extendedInformation[cf].uuid = instanceId
                  }
                  cfMasterList.push(objx.extendedInformation[cf]);
                }
                Projects.update(objx._id, {
                  $set: {
                    extendedInformation: cfMasterList
                  }
                });
              }
            });
          });

          Tenants.update(t._id, {
            $set: {
              'settings.extInfo.project': master
            }
          });

          master = [];

          //Products instances
          _.each(ei.products, function(fl) {
            var instanceId = Guid.raw();
            fl.uuid = instanceId;
            master.push(fl);
            _.each(Products.find({
              _groupId: t._id
            }).fetch(), function(objx) {
              cfMasterList = [];
              if (objx.extendedInformation) {
                for (var cf in objx.extendedInformation) {
                  if (objx.extendedInformation[cf].dataName === fl.name) {
                    objx.extendedInformation[cf].uuid = instanceId
                  }
                  cfMasterList.push(objx.extendedInformation[cf]);
                }
                Products.update(objx._id, {
                  $set: {
                    extendedInformation: cfMasterList
                  }
                });
              }
            });
          });

          Tenants.update(t._id, {
            $set: {
              'settings.extInfo.product': master
            }
          });

          master = [];

        }
      });

    });
  }
});

Migrations.add({
  version: 23,
  name: "Move all custom fields to new collection storage approach",
  up: function() {
    ServerSession.set('maintenance', true);

    var tenants = Tenants.find({}).fetch();

    _.each(tenants, function(tenant) {
      Partitioner.bindGroup(tenant._id, function() {

        // -----------------------------------------
        // Tenant companies
        // -----------------------------------------
        var companies = Companies.find({
          _groupId: tenant._id
        }).fetch();

        _.each(companies, function(company) {
          if (company.extendedInformation) {
            var sortedArray = company.extendedInformation.sort(function(a, b) {
              if (a.dataOrder < b.dataOrder) return -1;
              if (a.dataOrder > b.dataOrder) return 1;
              return 0;
            })
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType,
                  global: ei.isGlobal,
                  order: i,
                  target: 'company',
                  listValues: (ei.dataType === 'picklist' ? ei.listValues : ''),
                  entityId: company._id
                });
                if (cfId) {
                  Companies.update({
                    _id: company._id
                  }, {
                    $unset: {
                      extendedInformation: ''
                    }
                  })
                }
              }
            });
          }
        });
        // -----------------------------------------

        // -----------------------------------------
        // Tenant contacts
        // -----------------------------------------
        var contacts = Contacts.find({
          _groupId: tenant._id
        }).fetch();

        _.each(contacts, function(contact) {
          if (contact.extendedInformation) {
            var sortedArray = contact.extendedInformation.sort(function(a, b) {
              if (a.dataOrder < b.dataOrder) return -1;
              if (a.dataOrder > b.dataOrder) return 1;
              return 0;
            })
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType,
                  global: ei.isGlobal,
                  order: i,
                  target: 'contact',
                  listValues: (ei.dataType === 'picklist' ? ei.listValues : ''),
                  entityId: contact._id
                });
                if (cfId) {
                  Contacts.update({
                    _id: contact._id
                  }, {
                    $unset: {
                      extendedInformation: ''
                    }
                  })
                }
              }
            });
          }
        });
        // -----------------------------------------

        // -----------------------------------------
        // Tenant projects
        // -----------------------------------------
        var projects = Projects.find({
          _groupId: tenant._id
        }).fetch();

        _.each(projects, function(project) {
          if (project.extendedInformation) {
            var sortedArray = project.extendedInformation.sort(function(a, b) {
              if (a.dataOrder < b.dataOrder) return -1;
              if (a.dataOrder > b.dataOrder) return 1;
              return 0;
            })
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType,
                  global: ei.isGlobal,
                  order: i,
                  target: 'project',
                  listValues: (ei.dataType === 'picklist' ? ei.listValues : ''),
                  entityId: project._id
                });
                if (cfId) {
                  Projects.update({
                    _id: project._id
                  }, {
                    $unset: {
                      extendedInformation: ''
                    }
                  })
                }
              }
            });
          }
        });
        // -----------------------------------------

        // -----------------------------------------
        // Tenant products
        // -----------------------------------------
        var products = Products.find({
          _groupId: tenant._id
        }).fetch();

        _.each(products, function(product) {
          if (product.extendedInformation) {
            var sortedArray = product.extendedInformation.sort(function(a, b) {
              if (a.dataOrder < b.dataOrder) return -1;
              if (a.dataOrder > b.dataOrder) return 1;
              return 0;
            })
            _.each(sortedArray, function(ei, i) {

              if (ei.dataName !== "") {

                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType,
                  global: ei.isGlobal,
                  order: i,
                  target: 'product',
                  listValues: (ei.dataType === 'picklist' ? ei.listValues : ''),
                  entityId: product._id
                });
                if (cfId) {
                  Products.update({
                    _id: product._id
                  }, {
                    $unset: {
                      extendedInformation: ''
                    }
                  })
                }
              }
            });
          }
        });
        // -----------------------------------------

        // -----------------------------------------
        // Clean-up
        // -----------------------------------------
        Tenants.update({
          _id: tenant._id
        }, {
          $unset: {
            'settings.extInfo': ''
          }
        }, {
          multi: true
        });
        // -----------------------------------------

      });
    });

    ServerSession.set('maintenance', false);
  }
});