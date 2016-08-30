import { EventLog, Products } from '/imports/api/collections.js';
Meteor.methods({
  'tenant.getPayingUsers': function() {
    var tenants = Tenants.find({
      plan: 'pro',
      'stripe.stripeSubs': {
        $exists: true
      }
    }).fetch();

    var userCount = 0;
    _.each(tenants, function(t) {
      userCount += Meteor.users.find({
        group: t._id
      }).fetch().length;
    });

    return userCount;
  },
  'tenant.getUsersForTenants': function(plan) {
    var tenants = Tenants.find({
      plan: plan
    }).fetch();

    var userCount = 0;
    _.each(tenants, function(t) {
      userCount += Meteor.users.find({
        group: t._id
      }).fetch().length;
    });

    return userCount;
  },
  'tenant.remove': function(tenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only superadmins may completely delete a tenant');
    }

    if (!tenantId) return 'Tenant ID not supplied';
    var tenant = Tenants.findOne({
      _id: tenantId
    });
    if (!tenant) return 'Tenant not found';
    try {
      Partitioner.bindGroup(tenantId, function() {
        console.log('Deleting tasks...');
        Tasks.remove({});
        console.log('Deleting tags...');
        Meteor.tags.remove({});
        console.log('Deleting events...');
                //EventLog is not partitioned
        EventLog.remove({
          group: tenantId
        });
        console.log('Deleting companies...');
        Companies.remove({});
        console.log('Deleting contacts...');
        Contacts.remove({});
        console.log('Deleting opportunities...');
        Opportunities.remove({});
        console.log('Deleting projects...');
        Projects.remove({});
        console.log('Deleting purchase order items...');
        PurchaseOrderItems.remove({});
        console.log('Deleting purchase orders...');
        PurchaseOrders.remove({});
        console.log('Deleting products...');
        Products.remove({});
        console.log('Deleting activities...');
        Activities.remove({});
      });

      console.log('Deleting users...');
      Meteor.users.remove({
        group: tenantId
      });

      console.log('Deleting tenant...');
      Tenants.remove({
        _id: tenantId
      });
    } catch (err) {
      return 'Error during tenant removal: ' + err;
    }

    return true;
  },
  setTenantDeletionFlag: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('deletingTenant', val);
  },

  'tenant.getExportData': function(tenants) {

    if (!this.userId) throw new Meteor.Error('401', 'Must be a logged in user to perform export');

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only admins may export tenant data');
    }

    var tenantArray = [];

    _.each(tenants, function(t) {
      var tenant = Tenants.findOne({name: t.name});

      if(tenant) {
        Partitioner.bindGroup(tenant._id, function() {
          var data = {
            name: tenant.name,
            createdAt: moment(tenant.createdAt).format('DD/MM/YYYY HH:mm'),
            plan: tenant.plan,
            companies: Companies.find({_groupId: tenant._id}).count(),
            contacts: Contacts.find({_groupId: tenant._id}).count(),
            opportunities: Opportunities.find({_groupId: tenant._id}).count(),
            projects: Projects.find({_groupId: tenant._id}).count(),
            products: Products.find({_groupId: tenant._id}).count(),
            purchaseOrders: PurchaseOrders.find({_groupId: tenant._id}).count(),
            activities: Activities.find({_groupId: tenant._id}).count(),
            tasks: Tasks.find({_groupId: tenant._id}).count(),
            currency: (tenant.settings.currency ? tenant.settings.currency : 'Not set'),
            coupon: (tenant.stripe && tenant.stripe.coupon ? tenant.stripe.coupon : '')
          };

          tenantArray.push(data);
        });
      }
    });

    return tenantArray;
  },

  'tenant.flagForDeletion': function() {
    const adminUser = Meteor.users.findOne(this.userId);
    if(!adminUser) return;

    const tenant = Tenants.findOne({
      _id: adminUser.group
    });

    Tenants.update({
      _id: tenant._id
    }, {
      $set: {
        'settings.toBeDeleted': true
      }
    });

    Partitioner.bindGroup(tenant._id, function() {
      Meteor.users.find({
        group: tenant._id
      }).forEach(function(user) {
        Roles.addUsersToRoles(user._id, ["Disabled"]);
        Meteor.users.update({
          _id: user._id
        }, {
          $set: {
            "services.resume.loginTokens": []
          }
        });
      });
    });

    const txt = 'Tenant administrator ' + adminUser.profile.name + ' for ' + tenant.name + ' has requested that their account be deleted. Please log into the administration area of RealTimeCRM to process this removal';
    Email.send({
      to: 'realtimecrm-notifications@cambridgesoftware.co.uk',
      from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
      subject: 'A RealTimeCRM account has been flagged for deletion',
      text: txt
    });

  },

  'tenant.cancelDeletion': function(tenantId) {
    const tenant = Tenants.findOne({
      _id: tenantId
    });

    Tenants.update({
      _id: tenant._id
    }, {
      $set: {
        'settings.toBeDeleted': false
      }
    });

    Partitioner.bindGroup(tenant._id, function() {
      Meteor.users.find({
        group: tenant._id
      }).forEach(function(user) {
        if(Roles.userIsInRole(user._id, "Disabled")) Roles.removeUsersFromRoles(user._id, ["Disabled"]);
      });
    });
  },

  'tenant.generateDemoData': function(tenantId, options) {
    var userId = this.userId;
    if (!Roles.userIsInRole(userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only superadmins may generate demo data for a tenant');
    }

    if (!tenantId) return 'Tenant ID not supplied';
    var tenant = Tenants.findOne({
      _id: tenantId
    });
    if (!tenant) return 'Tenant not found';

    faker.locale = "en_GB";

    if (!Meteor.isServer) return 'Must be ran on server.';

    Partitioner.bindGroup(tenantId, function() {
      if(options.users > 0) {
        for (var ux = 0; ux < options.users; ux++) {
          var uxId = Accounts.createUser({
            email: faker.internet.email().toLowerCase(),
            password: 'password',
            profile: {
              name: faker.name.findName(),
              lastLogin: faker.date.past(),
              lastActivity: {
                page: null,
                url: null
              },
              poAuthLevel: 100000
            }
          });

          Roles.addUsersToRoles(uxId, 'Administrator');
          Roles.addUsersToRoles(uxId, defaultPermissionsList);
          Partitioner.setUserGroup(uxId, tenantId);
        }
      }

      var usersArray = Meteor.users.find({group: tenantId}).fetch();
      var randomUser = null;

      var companyIDs = [];
      var contactIDs = [];
      var opportunityIDs = [];
      var projectIDs = [];
      var productIDs = [];
      var purchaseOrderIDs = [];
      var importTotal = 0;
      var percDone = 0;
      var newPerc = 0;
      var contactIndex = -1;
      var tempContact = null;

      _.each(_.omit(options, ['tasks', 'activities', 'users']), function(opt) {
        importTotal += opt;
      });
      var tempTotal = importTotal;

      importTotal += tempTotal * options.tasks;
      importTotal += tempTotal * options.activities;
      importTotal += options.users;

      function createTaskForEntity(entityType, entityId) {
        randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
        randomAssignee = usersArray[Math.floor(Math.random() * usersArray.length)];

        var completed = faker.random.boolean();
        var completedAt = completed ? faker.date.recent() : null;
        var title = faker.hacker.verb() + ' ' +
                    faker.hacker.adjective() + ' ' +
                    faker.hacker.noun() + ' ' +
                    faker.hacker.noun();

        Partitioner.bindGroup(tenantId, function() {
          Tasks.insert({
            title: title,
            description: faker.lorem.paragraphs(),
            dueDate: faker.date.future(),
            remindMe: false,
            isAllDay: faker.random.boolean(),
            assigneeId: (entityType === 'user' ? entityId : randomAssignee._id),
            completed: completed,
            completedAt: completedAt,
            entityType: entityType,
            entityId: entityId,
            createdBy: (entityType === 'user' ? entityId : randomUser._id),
          });
        });
      }

      function createActivityForEntity(entityType, entityId, displayData) {
        randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];

        Partitioner.bindGroup(tenantId, function() {
          Activities.insert({
            type: _.sample(Schemas.Activity._schema.type.allowedValues),
            notes: faker.lorem.paragraphs(_.random(1, 3)),
            createdAt: faker.date.recent(100),
            activityTimestamp: faker.date.recent(100),
            primaryEntityId: entityId,
            primaryEntityType: entityType,
            primaryEntityDisplayData: displayData,
            companyId: (entityType === "companies" ? entityId : null),
            contactId: (entityType === "contacts" ? entityId : null),
            projectId: (entityType === "projects" ? entityId : null),
            purchaseOrderId: (entityType === "purchaseorders" ? entityId : null),
            opportunityId: (entityType === "opportunities" ? entityId : null),
            taskId: (entityType === "tasks" ? entityId : null),
            createdBy: randomUser._id
          });
        });
      }

      function setPercentageComplete() {
        newPerc = Number(UserSession.get("importProgress", userId)) + Number(percDone);
        UserSession.set("importProgress", newPerc, userId);
      }

      percDone = (1 / importTotal) * 100;

      if(options.companies > 0) {
        for (var cx = 0; cx < options.companies; cx++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var cName = faker.company.companyName();
          var companyId = Companies.insert({
            name: cName,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            county: faker.address.county(),
            postcode: faker.address.zipCode(),
            country: faker.address.country(),
            website: 'http://' + faker.internet.domainName(),
            phone: faker.phone.phoneNumber(),
            createdBy: randomUser._id
          });

          companyIDs.push(companyId);

          if(options.tasks > 0) {
            for (var ctx = 0; ctx < options.tasks; ctx++) {
              setPercentageComplete();
              createTaskForEntity('company', companyId);
            }
          }

          if(options.activities > 0) {
            for (var cax = 0; cax < options.activities; cax++) {
              setPercentageComplete();
              createActivityForEntity('companies', companyId, cName);
            }
          }
        }
      }

      if(options.contacts > 0) {
        for (var xx = 0; xx < options.contacts; xx++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];

          var fname = faker.name.firstName();
          var sname = faker.name.lastName();
          var contactId = Contacts.insert({
            forename: fname,
            surname: sname,
            jobtitle: faker.name.jobTitle(),
            phone: faker.phone.phoneNumber(),
            mobile: faker.phone.phoneNumber(),
            companyId: (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null),
            createdBy: randomUser._id
          });

          contactIDs.push(contactId);

          if(options.tasks > 0) {
            for (var xtx = 0; xtx < options.tasks; xtx++) {
              setPercentageComplete();
              createTaskForEntity('contact', contactId);
            }
          }

          if(options.activities > 0) {
            for (var xax = 0; xax < options.activities; xax++) {
              setPercentageComplete();
              createActivityForEntity('contacts', contactId, `${fname} ${sname}`);
            }
          }
        }
      }

      if(options.opportunities > 0) {
        for (var ox = 0; ox < options.opportunities; ox++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var oname = faker.company.bs();
          var createdDate = faker.date.recent(100);
          var oCompId = (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null);
          var oContId = null;
          if(oCompId) {
            if(faker.random.boolean()) {
              contactIndex = Math.floor(Math.random() * Contacts.find({companyId: oCompId}).count());
              tempContact = Contacts.find({companyId: oCompId}).fetch()[contactIndex];
              if(tempContact) oContId = tempContact._id;
            }
          }
          var stages = tenant.settings.opportunity.stages;

          var oppId = Opportunities.insert({
            name: oname,
            description: faker.lorem.sentence(),
            currentStageId: Math.floor(Math.random() * stages.length),
            createdBy: randomUser._id,
            items: [],
            value: parseInt(faker.commerce.price(), 10),
            companyId: oCompId,
            contactId: oContId,
            date: createdDate,
            estCloseDate: faker.date.future(0.5, createdDate)
          });

          opportunityIDs.push(oppId);

          if(options.tasks > 0) {
            for (var otx = 0; otx < options.tasks; otx++) {
              setPercentageComplete();
              createTaskForEntity('opportunity', oppId);
            }
          }

          if(options.activities > 0) {
            for (var oax = 0; oax < options.activities; oax++) {
              setPercentageComplete();
              createActivityForEntity('opportunities', oppId, oname);
            }
          }
        }
      }

      if(options.projects > 0) {
        for (var px = 0; px < options.projects; px++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var pname = faker.company.bs();
          var pCompId = (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null);
          var pContId = null;
          if(pCompId) {
            if(faker.random.boolean()) {
              contactIndex = Math.floor(Math.random() * Contacts.find({companyId: pCompId}).count());
              tempContact = Contacts.find({companyId: pCompId}).fetch()[contactIndex];
              if(tempContact) pContId = tempContact._id;
            }
          }
          var projectId = Projects.insert({
            name: pname,
            description: faker.lorem.sentence(),
            companyId: pCompId,
            contactId: pContId,
            userId: randomUser._id,
            value: parseInt(faker.commerce.price(), 10),
            createdBy: randomUser._id
          });

          projectIDs.push(projectId);

          if(options.tasks > 0) {
            for (var ptx = 0; ptx < options.tasks; ptx++) {
              setPercentageComplete();
              createTaskForEntity('project', projectId);
            }
          }

          if(options.activities > 0) {
            for (var pax = 0; pax < options.activities; pax++) {
              setPercentageComplete();
              createActivityForEntity('projects', projectId, pname);
            }
          }
        }
      }

      if(options.products > 0) {
        for (var rx = 0; rx < options.products; rx++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var prName = faker.commerce.productName();

          var productId = Products.insert({
            name: prName,
            description: faker.lorem.sentence(),
            cost: parseInt(faker.finance.amount(), 10),
            price: parseInt(faker.commerce.price(), 10),
            createdBy: randomUser._id
          });

          productIDs.push(productId);

          // if(options.tasks > 0) {
          //   for (var rtx = 0; rtx < options.tasks; rtx++) {
          //     setPercentageComplete();
          //     createTaskForEntity('product', productId);
          //   }
          // }

          // if(options.activities > 0) {
          //   for (var rax = 0; rax < options.activities; rax++) {
          //     setPercentageComplete();
          //     createActivityForEntity('products', productId, prName);
          //   }
          // }
        }
      }

      if(options.purchaseOrders > 0) {
        for (var dx = 0; dx < options.purchaseOrders; dx++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var poCompId = (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null);
          var poContId = null;
          if(poCompId) {
            if(faker.random.boolean()) {
              contactIndex = Math.floor(Math.random() * Contacts.find({companyId: poCompId}).count());
              tempContact = Contacts.find({companyId: poCompId}).fetch()[contactIndex];
              if(tempContact) poContId = tempContact._id;
            }
          }
          var poname = faker.commerce.product();

          var purchaseOrderId = PurchaseOrders.insert({
            userId: randomUser._id,
            supplierCompanyId: poCompId,
            supplierContactId: poContId,
            description: poname,
            supplierReference: faker.finance.account(),
            status: _.sample(Schemas.PurchaseOrder._schema.status.allowedValues),
            orderDate: faker.date.past(100),
            paymentMethod: _.sample(Schemas.PurchaseOrder._schema.paymentMethod.allowedValues),
            createdBy: randomUser._id
          });

          purchaseOrderIDs.push(purchaseOrderId);

          // if(options.tasks > 0) {
          //   for (var dtx = 0; dtx < options.tasks; dtx++) {
          //     setPercentageComplete();
          //     createTaskForEntity('product', productId);
          //   }
          // }

          if(options.activities > 0) {
            for (var dax = 0; dax < options.activities; dax++) {
              setPercentageComplete();
              createActivityForEntity('purchaseorders', purchaseOrderId, poname);
            }
          }
        }
      }

      if(options.personalTasks > 0) {
        for (var pstx = 0; pstx < options.personalTasks; pstx++) {
          setPercentageComplete();
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          createTaskForEntity('user', randomUser._id);
        }
      }
    });
  }
});
