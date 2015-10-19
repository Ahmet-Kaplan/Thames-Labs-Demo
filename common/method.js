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
        for (var i = 0; i < 4; i++) {
          var id = OpportunityStages.insert({
            title: faker.commerce.color(),
            description: faker.lorem.sentence(),
            order: i
          });
          oppStageIds.push(id);
        }

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
        _.each(_.range(100), function() {

          var usersArray = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor(Math.random() * usersArray.length);
          var randomUser = usersArray[randomIndex];

          do {
            randomIndex = Math.floor(Math.random() * usersArray.length);
            randomUser = usersArray[randomIndex];
          }
          while (randomUser === undefined);

          var companyId = Companies.insert({
            name: faker.company.companyName(),
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

          var productId = Products.insert({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            cost: parseInt(faker.finance.amount()),
            price: parseInt(faker.commerce.price()),
            createdBy: randomUser._id
          });

          products.push(productId);

          var oppId = Opportunities.insert({
            name: faker.company.bs(),
            description: faker.lorem.sentence(),
            currentStageId: oppStageIds[Math.floor(Math.random() * oppStageIds.length)],
            createdBy: randomUser._id,
            items: [],
            companyId: companyId,
            date: faker.date.recent(100)
          });

          opportunities.push(oppId);

          _.each(_.range(_.random(1, 10)), function() {
            var contactId = Contacts.insert({
              forename: faker.name.firstName(),
              surname: faker.name.lastName(),
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
                createdBy: randomUser._id
              });
            });
          });

          _.each(_.range(_.random(0, 2)), function() {

            var projectId = Projects.insert({
              name: faker.company.bs(),
              description: faker.lorem.sentence(),
              companyId: companyId,
              contactId: contacts[Math.floor(Math.random() * contacts.length)],
              userId: randomUser._id,
              value: parseInt(faker.commerce.price()),
              probability: _.random(0, 100),
              lastActionDate: faker.date.past(100),
              createdBy: randomUser._id
            });

            projects.push(projectId);

            _.each(_.range(_.random(0, 2)), function() {
              Activities.insert({
                type: _.sample(Schemas.Activity._schema.type.allowedValues),
                notes: faker.lorem.paragraphs(_.random(1, 3)),
                createdAt: faker.date.recent(100),
                activityTimestamp: faker.date.recent(100),
                projectId: projectId,
                createdBy: randomUser._id
              });
            });
          });

          _.each(_.range(_.random(0, 3)), function() {
            var purchaseOrderId = PurchaseOrders.insert({
              userId: randomUser._id,
              supplierCompanyId: companyId,
              supplierContactId: contacts[Math.floor(Math.random() * contacts.length)],
              projectId: projects[Math.floor(Math.random() * projects.length)],
              description: faker.commerce.product(),
              supplierReference: faker.finance.account(),
              status: _.sample(Schemas.PurchaseOrder._schema.status.allowedValues),
              orderDate: faker.date.past(100),
              deliveryDate: faker.date.past(100),
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
                createdBy: randomUser._id
              });
            });

            _.each(_.range(_.random(0, 2)), function() {
              var poi = PurchaseOrderItems.insert({
                purchaseOrderId: purchaseOrderId,
                description: faker.commerce.productName(),
                productCode: faker.finance.account(),
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

  signUp: function(userDetails) {

    userDetails.email = userDetails.email.toLowerCase();
    check(userDetails, Schemas.UserSignUp);

    var user = {
      email: userDetails.email,
      password: userDetails.password,
      roles: [],
      group: "",
      name: userDetails.name
    };

    check(user, Schemas.User);

    var userId = Accounts.createUser({
      email: userDetails.email,
      password: userDetails.password,
      profile: {
        name: userDetails.name,
        lastLogin: null,
        lastActivity: {
          page: null,
          url: null
        },
        poAuthLevel: 100000
      }
    });

    //This needs to be run on the server, otherwise client errors occur
    if (Meteor.isServer) {

      Roles.addUsersToRoles(userId, ["Administrator"]);

      var tenantId = Tenants.insert({
          name: userDetails.companyName,
          settings: {
            "PurchaseOrderPrefix": "",
            "PurchaseOrderStartingValue": 0,
            extInfo: {
              company: [],
              contact: []
            }
          },
          stripe: {
            "totalRecords": 0,
            "paying": false,
            "blocked": false,
            "coupon": userDetails.coupon
          },
          createdAt: new Date()
        },
        function(error, result) {
          if (error) {
            //Remove user account as signup wasn't successful
            Meteor.users.remove(userId);
            return "The tenant could not be created. Please contact support";
          }
        }
      );

      Partitioner.setUserGroup(userId, tenantId);

      SSR.compileTemplate('emailText', Assets.getText('email-template.html'));
      Template.emailText.helpers({
        getDoctype: function() {
          return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
        },
        subject: function() {
          return 'Your RealTimeCRM details';
        },
        name: function() {
          return userDetails.name;
        },
        email: function() {
          return userDetails.email;
        },
        password: function() {
          return userDetails.password;
        }
      });
      var html = '<' + SSR.render("emailText");

      // See server/startup.js for MAIL_URL environment variable

      Email.send({
        to: userDetails.email,
        from: 'admin@realtimecrm.co.uk',
        subject: 'Your RealTimeCRM details',
        html: html
      });

      var txt = 'New sign up from ' + userDetails.name + ' at company ' + userDetails.companyName;
      Email.send({
        to: 'david.mcleary@cambridgesoftware.co.uk',
        from: 'admin@realtimecrm.co.uk',
        subject: 'New RealTimeCRM sign up!',
        text: txt
      });
    }
    return true;
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
  },

  deleteOpportunityStage: function(stageId) {
    //This method ensures that opportunities on a deleted stage are moved to a stage
    var opportunitiesAtStage = Opportunities.find({
      currentStageId: stageId
    }).fetch();
    if (!!opportunitiesAtStage) {
      var firstOppStageId = OpportunityStages.findOne({
        order: 0
      })._id;
      if (firstOppStageId == stageId) {
        firstOppStageId = OpportunityStages.findOne({
          order: 1
        })._id;
      }
      for (var i = 0; i < opportunitiesAtStage.length; i++) {
        Opportunities.update(opportunitiesAtStage[i]._id, {
          $set: {
            currentStageId: firstOppStageId
          }
        });
      }
      OpportunityStages.remove(stageId);
      //Orders the remaining stages
      var oppStages = OpportunityStages.find({}, {
        sort: {
          order: 1
        }
      }).fetch();
      for (var i = 0; i < oppStages.length; i++) {
        OpportunityStages.update(oppStages[i]._id, {
          $set: {
            order: i
          }
        });
      }
    }
  }
});

logEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('addEventToAuditLog', logLevel, logMessage, ((typeof logEntityType === 'undefined') ? undefined : logEntityType), ((typeof logEntityId === 'undefined') ? undefined : logEntityId), 'client', Guid.raw());
}
