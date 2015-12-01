Meteor.methods({

  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  },

  generateDemoData: function(groupId) {

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }

    if (Meteor.isServer) {
      Meteor.call('setDemoDataFlag', true);

      faker.locale = "en";
      Partitioner.bindGroup(groupId, function() {

        var companies = [];
        var contacts = [];
        var projects = [];
        var purchaseOrders = [];
        var purchaseOrderItems = [];
        var opportunities = [];
        var oppStageIds = [];
        var products = [];

        //Setup opportunity stages
        var userTenant = Tenants.findOne({});
        var stages = [];

        for (var i = 0; i < 4; i++) {
          var stageData = ({
            title: faker.commerce.color(),
            description: faker.lorem.sentence(),
            id: i
          });
          stages.push(stageData);
        }
        Tenants.update(userTenant._id, {
          $set: {
            'settings.opportunity.stages': stages
          }
        });

        for (var i = 0; i < 8; i++) {
          var userId = Accounts.createUser({
            email: faker.internet.email(),
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

          Roles.addUsersToRoles(userId, defaultPermissionsList);
          Partitioner.setUserGroup(userId, groupId);
        }

        // generate fake customer data
        _.each(_.range(_.random(50, 100)), function() {

          var usersArray = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor(Math.random() * usersArray.length);
          var randomUser = usersArray[randomIndex];

          do {
            randomIndex = Math.floor(Math.random() * usersArray.length);
            randomUser = usersArray[randomIndex];
          }
          while (randomUser === undefined);

          var cname = faker.company.companyName();
          var companyId = Companies.insert({
            name: cname,
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            county: faker.address.county(),
            postcode: faker.address.zipCode(),
            country: faker.address.country(),
            website: 'http://' + faker.internet.domainName(),
            phone: faker.phone.phoneNumber(),
            createdBy: randomUser._id
          });

          companies.push(companyId);

          _.each(_.range(_.random(0, 2)), function() {
            Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              activityTimestamp: faker.date.recent(100),
              primaryEntityId: companyId,
              primaryEntityType: 'companies',
              primaryEntityDisplayData: cname,
              companyId: companyId,
              createdBy: randomUser._id
            });
          });

          var productId = Products.insert({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            cost: parseInt(faker.finance.amount()),
            price: parseInt(faker.commerce.price()),
            createdBy: randomUser._id
          });

          products.push(productId);

          var oname = faker.company.bs();
          var oppId = Opportunities.insert({
            name: oname,
            description: faker.lorem.sentence(),
            currentStageId: oppStageIds[Math.floor(Math.random() * oppStageIds.length)],
            createdBy: randomUser._id,
            items: [],
            value: parseInt(faker.commerce.price()),
            companyId: companyId,
            date: faker.date.recent(100)
          });

          _.each(_.range(_.random(0, 2)), function() {
            Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              activityTimestamp: faker.date.recent(100),
              primaryEntityId: oppId,
              primaryEntityType: 'opportunities',
              primaryEntityDisplayData: oname,
              opportunityId: oppId,
              createdBy: randomUser._id
            });
          });

          opportunities.push(oppId);

          _.each(_.range(_.random(1, 10)), function() {
            var fname = faker.name.firstName();
            var sname = faker.name.lastName();
            var contactId = Contacts.insert({
              forename: fname,
              surname: sname,
              phone: faker.phone.phoneNumber(),
              mobile: faker.phone.phoneNumber(),
              companyId: companyId,
              createdBy: randomUser._id
            });

            contacts.push(contactId);

            _.each(_.range(_.random(0, 2)), function() {
              Activities.insert({
                type: _.sample(Schemas.Activity._schema.type.allowedValues),
                notes: faker.lorem.paragraphs(_.random(1, 3)),
                createdAt: faker.date.recent(100),
                activityTimestamp: faker.date.recent(100),
                companyId: companyId,
                contactId: contactId,
                primaryEntityId: contactId,
                primaryEntityType: 'contacts',
                primaryEntityDisplayData: fname + " " + sname,
                createdBy: randomUser._id
              });
            });
          });

          _.each(_.range(_.random(0, 2)), function() {
            var pname = faker.company.bs();
            var projectId = Projects.insert({
              name: pname,
              description: faker.lorem.sentence(),
              companyId: companyId,
              contactId: contacts[Math.floor(Math.random() * contacts.length)],
              userId: randomUser._id,
              value: parseInt(faker.commerce.price()),
              createdBy: randomUser._id
            });

            projects.push(projectId);

            _.each(_.range(_.random(0, 2)), function() {
              Activities.insert({
                type: _.sample(Schemas.Activity._schema.type.allowedValues),
                notes: faker.lorem.paragraphs(_.random(1, 3)),
                createdAt: faker.date.recent(100),
                activityTimestamp: faker.date.recent(100),
                primaryEntityId: projectId,
                primaryEntityType: 'projects',
                primaryEntityDisplayData: pname,
                projectId: projectId,
                createdBy: randomUser._id
              });
            });
          });

          _.each(_.range(_.random(0, 3)), function() {
            var poname = faker.commerce.product();
            var purchaseOrderId = PurchaseOrders.insert({
              userId: randomUser._id,
              supplierCompanyId: companyId,
              supplierContactId: contacts[Math.floor(Math.random() * contacts.length)],
              description: poname,
              supplierReference: faker.finance.account(),
              status: _.sample(Schemas.PurchaseOrder._schema.status.allowedValues),
              orderDate: faker.date.past(100),
              paymentMethod: _.sample(Schemas.PurchaseOrder._schema.paymentMethod.allowedValues),
              createdBy: randomUser._id
            });

            purchaseOrders.push(purchaseOrderId);

            _.each(_.range(_.random(0, 2)), function() {
              Activities.insert({
                type: _.sample(Schemas.Activity._schema.type.allowedValues),
                notes: faker.lorem.paragraphs(_.random(1, 3)),
                createdAt: faker.date.recent(100),
                activityTimestamp: faker.date.recent(100),
                purchaseOrderId: purchaseOrderId,
                primaryEntityId: purchaseOrderId,
                primaryEntityType: 'purchaseorders',
                primaryEntityDisplayData: poname,
                createdBy: randomUser._id
              });
            });

            _.each(_.range(_.random(0, 2)), function() {
              var poi = PurchaseOrderItems.insert({
                purchaseOrderId: purchaseOrderId,
                description: faker.commerce.productName(),
                productCode: faker.finance.account(),
                projectId: projects[Math.floor(Math.random() * projects.length)],
                value: faker.commerce.price(),
                quantity: _.random(1, 65),
                totalPrice: "0.00",
                createdBy: randomUser._id
              });

              purchaseOrderItems.push(poi);
            });
          });
        });

      });

    }

    Meteor.call('setDemoDataFlag', false);

    logEvent('debug', 'Demo data generated');

  },

  winOpportunity: function(opp) {
    var user = Meteor.user();
    var val = opp.value;
    if (!val) {
      val = 0;
    }
    var projId = Projects.insert({
      name: opp.name,
      description: opp.description,
      companyId: opp.companyId,
      contactId: opp.contactId,
      userId: user._id,
      value: val,
      createdBy: user._id
    });

    if (opp.items) {
      for (var i = 0; i < opp.items.length; i++) {
        var title = opp.items[i].name;
        var description = opp.items[i].description + " Value: " + opp.items[i].value + " Quantity: " + opp.items[i].quantity;
        Tasks.insert({
          title: title,
          description: description,
          assigneeId: user._id,
          createdBy: user._id,
          entityType: 'project',
          entityId: projId
        });
      }
    }

    Opportunities.update(opp._id, {
      $set: {
        isArchived: true,
        hasBeenWon: true,
        projectId: projId,
        currentStageId: null
      }
    });

    var note = user.profile.name + ' marked this opportunity as won';
    var date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      opportunityId: opp._id,
      createdBy: user._id
    });

    note = 'Converted from won opportunity "' + opp.name + '"';
    date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      projectId: projId,
      createdBy: user._id
    });

    return projId;
  }
});

logEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  if (Meteor.isServer) {
    Meteor.call('addEventToAuditLog', logLevel, logMessage, ((typeof logEntityType === 'undefined') ? undefined : logEntityType), ((typeof logEntityId === 'undefined') ? undefined : logEntityId), 'client', Guid.raw());
  }
}
