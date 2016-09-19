import { Companies, Contacts, CustomFields, Projects, Products, PurchaseOrders, Opportunities, Tenants } from '/imports/api/collections.js';
Migrations.add({
  version: 24,
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
            });
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType || 'text',
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
                  });
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
            });
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType || 'text',
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
                  });
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
            });
            _.each(sortedArray, function(ei, i) {
              if (ei.dataName !== "") {
                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType || 'text',
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
                  });
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
            });
            _.each(sortedArray, function(ei, i) {

              if (ei.dataName !== "") {

                var cfId = CustomFields.insert({
                  name: ei.dataName,
                  value: ei.dataValue,
                  defaultValue: ei.dataValue,
                  type: ei.dataType || 'text',
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
                  });
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

Migrations.add({
  version: 25,
  name: "Fix sequencing system",
  up: function() {
    ServerSession.set('maintenance', true);

    var tenants = Tenants.find({}).fetch();

    _.each(tenants, function(tenant) {
      Partitioner.bindGroup(tenant._id, function() {
        var companyCount = Companies.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var contactCount = Contacts.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var opportunitiesCount = Opportunities.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var projectCount = Projects.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var purchaseOrderCount = PurchaseOrders.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var productCount = Products.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();

        Tenants.update({
          _id: tenant._id
        }, {
          $set: {
            'settings.company.defaultNumber': companyCount,
            'settings.contact.defaultNumber': contactCount,
            'settings.opportunity.defaultNumber': opportunitiesCount,
            'settings.project.defaultNumber': projectCount,
            'settings.purchaseorder.defaultNumber': purchaseOrderCount,
            'settings.product.defaultNumber': productCount,
          }
        });

        var pos = PurchaseOrders.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).fetch();
        var prefix = tenant.settings.purchaseorder.defaultPrefix;
        _.each(pos, function(po) {
          if (po.sequencedIdentifier) {
            if (po.sequencedIdentifier.indexOf('undefined') > -1) {
              var newID = po.sequencedIdentifier.replace('undefined', prefix);
              PurchaseOrders.update({
                _id: po._id
              }, {
                $set: {
                  sequencedIdentifier: newID
                }
              });
            }
          }
        });
      });
    });

    ServerSession.set('maintenance', false);
  }
});

//Note: migration 26 had issues so was replaced by 28

Migrations.add({
  version: 27,
  name: "Set tenants to the new Free/Pro model",
  up: function() {
    const tenants = Tenants.find({}).fetch();
    _.each(tenants, function(tenant) {
      Tenants.update(tenant._id, {
        $set: {
          'stripe.maxFreeUsers': 1
        },
        $unset: {
          plan: ''
        }
      });
    });
  }
});

//Note: migration 26 & 28 had issues so was replaced by 29

Migrations.add({
  version: 29,
  name: "Adds sort column to companies",
  up() {
    // This is how to get access to the raw MongoDB node collection that the Meteor server collection wraps
    const compBatch = Companies.rawCollection().initializeUnorderedBulkOp();
    const contactBatch = Contacts.rawCollection().initializeUnorderedBulkOp();
    Partitioner.directOperation(() => {
      Companies.find({name: {$exists: true}}).forEach((elem) => {
        compBatch.find({_id: elem._id}).updateOne({$set: {name_sort: elem.name.toLowerCase()}});
      });
      Contacts.find({forename: {$exists: true}, surname: {$exists: true}}).forEach((elem) => {
        contactBatch.find({_id: elem._id}).updateOne({$set: {name_sort: elem.surname.toLowerCase() + ' ' + elem.forename.toLowerCase()}});
      });
    });

    // We need to wrap the async function to get a synchronous API that migrations expects
    const companyExecute = Meteor.wrapAsync(compBatch.execute, compBatch);
    companyExecute();
    const contactExecute = Meteor.wrapAsync(compBatch.execute, contactBatch);
    contactExecute();

  }
});