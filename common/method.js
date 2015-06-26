Meteor.methods({
  calculatePurchaseOrderItemTotalValue: function (price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  },

 generateDemoData: function(id) {

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }

    Partitioner.bindGroup(id, function() {

      // generate fake customer data
      _.each(_.range(100), function() {
        var usersArray = Meteor.users.find({}).fetch();
        var randomIndex = Math.floor(Math.random() * usersArray.length);
        var randomUser = usersArray[randomIndex];

        var randomName = faker.company.companyName();
        var companyId = g_Companies.insert({
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

        contacts = [];
        projects = [];

        _.each(_.range(_.random(1, 10)), function() {
          var contactId = g_Contacts.insert({
            title: _.sample(Schemas.Contact._schema.title.allowedValues),
            forename: faker.name.firstName(),
            surname: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            mobile: faker.phone.phoneNumber(),
            companyId: companyId,
            createdBy: randomUser._id
          });

          contacts.push(contactId);

          _.each(_.range(_.random(0, 2)), function() {
            var activityId = g_Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              companyId: companyId,
              contactId: contactId,
              createdBy: randomUser._id
            });
          });
        });

        _.each(_.range(_.random(0, 2)), function() {
          var array = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor(Math.random() * array.length);
          var element = array[randomIndex];

          var projectId = g_Projects.insert({
            description: faker.lorem.sentence(),
            companyId: companyId,
            contactId: contacts[Math.floor(Math.random() * contacts.length)],
            userId: randomUser._id,
          //  status: _.sample(Schemas.Project._schema.status.allowedValues),
            value: _.random(100, 3000),
            probability: _.random(0, 100),
            lastActionDate: faker.date.past(100),
            nextActionBy: element._id,
            createdBy: randomUser._id
          });

          projects.push(projectId);

          _.each(_.range(_.random(0, 2)), function() {
            var activityId = g_Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              projectId: projectId,
              createdBy: randomUser._id
            });
          });
        });

        _.each(_.range(_.random(0, 3)), function() {
          var purchaseOrderId = g_PurchaseOrders.insert({
            userId: randomUser._id,
            supplierCompanyId: companyId,
            supplierContactId: contacts[Math.floor(Math.random() * contacts.length)],
            projectId: projects[Math.floor(Math.random() * projects.length)],
            description: faker.lorem.sentence(),
            supplierReference: faker.random.uuid(),
            status: _.sample(Schemas.PurchaseOrder._schema.status.allowedValues),
            orderDate: faker.date.past(100),
            deliveryDate: faker.date.past(100),
            paymentMethod: _.sample(Schemas.PurchaseOrder._schema.paymentMethod.allowedValues),
         //   currency: _.sample(Schemas.PurchaseOrder._schema.currency.allowedValues),
            createdBy: randomUser._id
          });

          _.each(_.range(_.random(0, 2)), function() {
            var activityId = g_Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              purchaseOrderId: purchaseOrderId,
              createdBy: randomUser._id
            });
          });

          _.each(_.range(_.random(0, 2)), function() {
            var PurchaseOrderItemId = g_PurchaseOrderItems.insert({
              purchaseOrderId: purchaseOrderId,
              description: faker.lorem.sentence(),
              productCode: faker.random.uuid(),
         //     currency: _.sample(Schemas.PurchaseOrderItem._schema.currency.allowedValues),
              value: parseFloat(_.random(1, 35)).toFixed(2),
              quantity: _.random(1, 65),
              totalPrice: "0.00",
              createdBy: randomUser._id
            });
          });
        });
      });

    });

  }

});

GetRoutedPageTitle = function(currentName) {
  var title = currentName;
  return title.charAt(0).toUpperCase() + title.slice(1);
};

SetRouteDetails = function(title) {
  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  if (user) {

    var profile = user.profile;
    if (profile) {
      profile.lastActivity = {
        page: title,
        url: Router.current().url
      };

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });
    }

  }
};
