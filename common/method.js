import '/imports/api/opportunities/methods.js';
import '/imports/api/projects/methods.js';
import '/imports/api/global/tawk-to.js';

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

      var loopNumber = _.random(20, 40);
      Meteor.call('setProgress', 0, loopNumber);

      faker.locale = "en_GB";
      Partitioner.bindGroup(groupId, function() {

        var companies = [];
        var contacts = [];
        var projects = [];
        var purchaseOrders = [];
        var purchaseOrderItems = [];
        var opportunities = [];
        var products = [];

        var companiesSequenceId = 1;
        var contactsSequenceId = 1;
        var opportunitiesSequenceId = 1;
        var projectsSequenceId = 1;
        var purchaseOrdersSequenceId = 1;
        var productsSequenceId = 1;

        //Setup opportunity stages
        var userTenant = Tenants.findOne({
          _id: groupId
        });
        var stages = [];

        for (var j = 0; j < 4; j++) {
          var stageData = ({
            title: faker.commerce.color(),
            description: faker.lorem.sentence(),
            id: j
          });
          stages.push(stageData);
        }
        Tenants.update(userTenant._id, {
          $set: {
            'settings.opportunity.stages': stages
          }
        }, function(err) {
          if (err) {
            LogServerEvent(LogLevel.Error, "Demo data generation failed whilst updating tenant opportunity stages: " + err, "tenant", groupId);
            Meteor.call('setDemoDataFlag', false);
            return;
          }
        });

        for (var i = 0; i < MAX_FREE_USERS; i++) {
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
          Partitioner.setUserGroup(userId, groupId);
        }

        //Function to add task since the entity type can vary
        function addTask(entityType, entityId, createdBy) {
          if (faker.random.boolean()) {
            return;
          }
          var usersArray = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor(Math.random() * usersArray.length);
          var randomAssignee = usersArray[randomIndex];

          do {
            randomIndex = Math.floor(Math.random() * usersArray.length);
            randomAssignee = usersArray[randomIndex];
          }
          while (typeof randomAssignee === "undefined");

          var completed = faker.random.boolean();
          var completedAt = completed ? faker.date.recent() : void 0;
          var title = faker.hacker.verb() + ' ' +
            faker.hacker.adjective() + ' ' +
            faker.hacker.noun() + ' ' +
            faker.hacker.noun();

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
            createdBy: createdBy
          }, function(err, taskId) {
            if (err) {
              LogServerEvent(LogLevel.Error, "Demo data generation failed whilst updating tenant opportunity stages: " + err, "tenant", groupId);
              Meteor.call('setDemoDataFlag', false);
              return;
            }

            _.each(_.range(_.random(0, 5)), function() {
              Tasks.addTag(faker.hacker.verb(), {
                _id: taskId
              });
            });

            _.each(_.range(_.random(0, 2)), function() {
              Activities.insert({
                type: _.sample(Schemas.Activity._schema.type.allowedValues),
                notes: faker.lorem.paragraphs(_.random(1, 3)),
                createdAt: faker.date.recent(100),
                activityTimestamp: faker.date.recent(100),
                primaryEntityId: taskId,
                primaryEntityType: 'tasks',
                primaryEntityDisplayData: title,
                taskId: taskId,
                createdBy: createdBy
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a task activity: " + err, "tenant", groupId);
                  Meteor.call('setDemoDataFlag', false);
                  return;
                }
              });
            });
          });
        }

        // generate fake customer data
        _.each(_.range(loopNumber), function(step) {
          Meteor.call('setProgress', step + 1, loopNumber);

          var usersArray = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor(Math.random() * usersArray.length);
          var randomUser = usersArray[randomIndex];

          do {
            randomIndex = Math.floor(Math.random() * usersArray.length);
            randomUser = usersArray[randomIndex];
          }
          while (typeof randomUser === "undefined");

          addTask('user', randomUser._id, randomUser._id);

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
            createdBy: randomUser._id,
            sequencedIdentifier: companiesSequenceId
          }, function(err) {
            if (err) {
              LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a company: " + err, "tenant", groupId);
              Meteor.call('setDemoDataFlag', false);
              return;
            }
          });

          companiesSequenceId++;

          companies.push(companyId);

          _.each(_.range(_.random(0, 5)), function() {
            Companies.addTag(faker.company.catchPhraseAdjective(), {
              _id: companyId
            });
          });

          addTask('company', companyId, randomUser._id);

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
            }, function(err) {
              if (err) {
                LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a company activity: " + err, "tenant", groupId);
                Meteor.call('setDemoDataFlag', false);
                return;
              }
            });
          });

          var productId = Products.insert({
            name: faker.commerce.productName(),
            description: faker.lorem.sentence(),
            cost: parseInt(faker.finance.amount(), 10),
            price: parseInt(faker.commerce.price(), 10),
            createdBy: randomUser._id,
            sequencedIdentifier: productsSequenceId
          }, function(err) {
            if (err) {
              LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a product: " + err, "tenant", groupId);
              Meteor.call('setDemoDataFlag', false);
              return;
            }
          });

          productsSequenceId++;

          products.push(productId);

          var oname = faker.company.bs();
          var createdDate = faker.date.recent(100);
          var oppId = Opportunities.insert({
            name: oname,
            description: faker.lorem.sentence(),
            currentStageId: Math.floor(Math.random() * stages.length),
            createdBy: randomUser._id,
            items: [],
            value: parseInt(faker.commerce.price(), 10),
            companyId: companyId,
            date: createdDate,
            estCloseDate: faker.date.future(0.5, createdDate),
            sequencedIdentifier: opportunitiesSequenceId
          }, function(err) {
            if (err) {
              LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding an opportunity: " + err, "tenant", groupId);
              Meteor.call('setDemoDataFlag', false);
              return;
            }
          });

          opportunitiesSequenceId++;

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
            }, function(err) {
              if (err) {
                LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding an opportunity activity: " + err, "tenant", groupId);
                Meteor.call('setDemoDataFlag', false);
                return;
              }
            });
          });

          opportunities.push(oppId);

          _.each(_.range(_.random(0, 5)), function() {
            Opportunities.addTag(faker.hacker.noun(), {
              _id: oppId
            });
          });

          addTask('opportunity', oppId, randomUser._id);

          _.each(_.range(_.random(1, 10)), function() {
            var fname = faker.name.firstName();
            var sname = faker.name.lastName();
            var contactId = Contacts.insert({
              forename: fname,
              surname: sname,
              jobtitle: faker.name.jobTitle(),
              phone: faker.phone.phoneNumber(),
              mobile: faker.phone.phoneNumber(),
              companyId: companyId,
              createdBy: randomUser._id,
              sequencedIdentifier: contactsSequenceId
            }, function(err) {
              if (err) {
                LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a company contact: " + err, "tenant", groupId);
                Meteor.call('setDemoDataFlag', false);
                return;
              }
            });

            contactsSequenceId++;

            contacts.push(contactId);

            _.each(_.range(_.random(0, 5)), function() {
              Contacts.addTag(faker.name.jobType(), {
                _id: contactId
              });
            });

            addTask('contact', contactId, randomUser._id);

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
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a company contact activity: " + err, "tenant", groupId);
                  Meteor.call('setDemoDataFlag', false);
                  return;
                }
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
              value: parseInt(faker.commerce.price(), 10),
              createdBy: randomUser._id,
              sequencedIdentifier: projectsSequenceId
            }, function(err) {
              if (err) {
                LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a project: " + err, "tenant", groupId);
                Meteor.call('setDemoDataFlag', false);
                return;
              }
            });

            projectsSequenceId++;

            projects.push(projectId);

            _.each(_.range(_.random(0, 5)), function() {
              Projects.addTag(faker.hacker.verb(), {
                _id: projectId
              });
            });

            addTask('project', projectId, randomUser._id);

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
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a project activity: " + err, "tenant", groupId);
                  Meteor.call('setDemoDataFlag', false);
                  return;
                }
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
              createdBy: randomUser._id,
              sequencedIdentifier: 'PO-' + purchaseOrdersSequenceId
            }, function(err) {
              if (err) {
                LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a purchase order: " + err, "tenant", groupId);
                Meteor.call('setDemoDataFlag', false);
                return;
              }
            });

            purchaseOrdersSequenceId++;

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
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a purchase order activity: " + err, "tenant", groupId);
                  Meteor.call('setDemoDataFlag', false);
                  return;
                }
              });
            });

            _.each(_.range(_.random(1, 4)), function() {
              var price = faker.commerce.price();
              var qty = _.random(1, 40);
              var poi = PurchaseOrderItems.insert({
                purchaseOrderId: purchaseOrderId,
                description: faker.commerce.productName(),
                productCode: faker.finance.account(),
                projectId: projects[Math.floor(Math.random() * projects.length)],
                value: price,
                quantity: qty,
                totalPrice: parseFloat((price * qty).toFixed(2)),
                createdBy: randomUser._id
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Error, "Demo data generation failed whilst adding a purchase order item: " + err, "tenant", groupId);
                  Meteor.call('setDemoDataFlag', false);
                  return;
                }
              });

              purchaseOrderItems.push(poi);
            });

          });

        });

      });

    }

    Meteor.call('setDemoDataFlag', false);

    LogServerEvent(LogLevel.Verbose, "Demo data generation completed successfully", "tenant", groupId);

  },

  winOpportunity: function(opp, projType) {
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
      createdBy: user._id,
      projectTypeId: projType,
      projectMilestoneId: 0,
      sequencedIdentifier: Tenants.findOne({
        _id: user.group
      }).settings.project.defaultNumber
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of Project from won opportunity ['" + opp.name + "'] failed: " + err, "opportunity", opp._id);
        return;
      }
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
        }, function(err) {
          if (err) {
            LogClientEvent(LogLevel.Error, "Auto-creation of Project task from won opportunity item ['" + title + "'] failed: " + err, "project", projId);
          }
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
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-archiving of won opportunity ['" + opp.name + "'] failed: " + err, "opportunity", opp._id);
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
      primaryEntityId: opp._id,
      primaryEntityType: 'opportunities',
      primaryEntityDisplayData: opp.name,
      createdBy: user._id
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of won opportunity ['" + opp.name + "'] activity entry failed: " + err, "opportunity", opp._id);
      }
    });

    note = 'Converted from won opportunity "' + opp.name + '"';
    date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      projectId: projId,
      primaryEntityId: projId,
      primaryEntityType: 'projects',
      primaryEntityDisplayData: opp.name,
      createdBy: user._id
    }, function(err) {
      if (err) {
        LogClientEvent(LogLevel.Error, "Auto-creation of project ['" + opp.name + "'] activity entry on upgrading from opportunity failed: " + err, "project", projId);
      }
    });

    LogClientEvent(LogLevel.Info, "Auto-creation of project ['" + opp.name + "'] from won opportunity succeeded", "project", projId);
    return projId;
  }
});

LogClientEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  if (Meteor.isServer) {
    var user = Meteor.users.findOne({
      _id: this._id
    });
    if (user && user.group) {
      if (!isProTenant(user.group)) return;
    }
    Meteor.call('addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'client');
  }
};

LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  Meteor.call('addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'server');
};
