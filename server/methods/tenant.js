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
        console.log('Deleting chatter...');
        Chatterbox.remove({});
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
  'tenant.generateDemoData': function(tenantId, options) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
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
      for (var ux = 0; ux < 2; ux++) {
        var userId = Accounts.createUser({
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

        Roles.addUsersToRoles(userId, 'Administrator');
        Roles.addUsersToRoles(userId, defaultPermissionsList);
        Partitioner.setUserGroup(userId, tenantId);
      }

      var usersArray = Meteor.users.find({group: tenantId}).fetch();
      var randomUser = null;

      var companyIDs = [];
      var contactIDs = [];
      var opportunityIDs = [];
      var projectIDs = [];
      var productIDs = [];
      var purchaseOrderIDs = [];

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
            assigneeId: randomAssignee._id,
            completed: completed,
            completedAt: completedAt,
            entityType: entityType,
            entityId: entityId,
            createdBy: randomUser._id
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

      if(options.companies > 0) {
        for (var cx = 0; cx < options.companies; cx++) {
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
              createTaskForEntity('company', companyId);
            }
          }

          if(options.activities > 0) {
            for (var cax = 0; cax < options.activities; cax++) {
              createActivityForEntity('companies', companyId, cName);
            }
          }
        }
      }

      if(options.contacts > 0) {
        for (var xx = 0; xx < options.contacts; xx++) {
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
              createTaskForEntity('contact', contactId);
            }
          }

          if(options.activities > 0) {
            for (var xax = 0; xax < options.activities; xax++) {
              createActivityForEntity('contacts', contactId, cName);
            }
          }
        }
      }

      if(options.opportunities > 0) {
        for (var ox = 0; ox < options.opportunities; ox++) {
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var oname = faker.company.bs();
          var createdDate = faker.date.recent(100);
          var oCompId = (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null);
          var oContId = ((faker.random.boolean() && oCompId) ? Contacts.find({companyId: oCompId}).fetch()[Math.floor(Math.random() * Contacts.find({companyId: oCompId}).count())] : null);
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
              createTaskForEntity('opportunity', oppId);
            }
          }

          if(options.activities > 0) {
            for (var oax = 0; oax < options.activities; oax++) {
              createActivityForEntity('opportunities', oppId, oname);
            }
          }
        }
      }

      if(options.projects > 0) {
        for (var px = 0; px < options.projects; px++) {
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];
          var pname = faker.company.bs();
          var pCompId = (faker.random.boolean() ? companyIDs[Math.floor(Math.random() * companyIDs.length)] : null);
          var pContId = ((faker.random.boolean() && pCompId) ? Contacts.find({companyId: pCompId}).fetch()[Math.floor(Math.random() * Contacts.find({companyId: pCompId}).count())] : null);
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
              createTaskForEntity('project', projectId);
            }
          }

          if(options.activities > 0) {
            for (var pax = 0; pax < options.activities; pax++) {
              createActivityForEntity('projects', projectId, pname);
            }
          }
        }
      }

      if(options.products > 0) {
        for (var rx = 0; rx < options.products; rx++) {
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];

          if(options.tasks > 0) {
            for (var rtx = 0; rtx < options.tasks; rtx++) {

            }
          }

          if(options.activities > 0) {
            for (var rax = 0; rax < options.activities; rax++) {

            }
          }
        }
      }

      if(options.purchaseOrders > 0) {
        for (var dx = 0; dx < options.purchaseOrders; dx++) {
          randomUser = usersArray[Math.floor(Math.random() * usersArray.length)];

          if(options.tasks > 0) {
            for (var dtx = 0; dtx < options.tasks; dtx++) {

            }
          }

          if(options.activities > 0) {
            for (var dax = 0; dax < options.activities; dax++) {

            }
          }
        }
      }
    });
  }
});
