Collections.products = Products = new Mongo.Collection('products');

Partitioner.partitionCollection(Products);

Tags.TagsMixin(Products);

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.products.filters = {
  salesPriceLower: {
    display: 'Sales Price <',
    prop: 'salesPriceLower',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  salesPriceGreater: {
    display: 'Sales Price >',
    prop: 'salesPriceGreater',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  costPriceLower: {
    display: 'Cost Price <',
    prop: 'costPriceLower',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  costPriceGreater: {
    display: 'Cost Price >',
    prop: 'costPriceGreater',
    verify: function(value) {
      value = parseInt(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      } else {
        return true;
      }
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'products'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Product Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  }
};

////////////////////
// SEARCH INDICES //
////////////////////

Collections.products.index = ProductsIndex = new EasySearch.Index({
  collection: Products,
  fields: ['name'],
  permission: function(options) {
    var userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadProducts']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'name': 1
      }
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      return {
        'name': 1,
        'price': 1,
        'cost': 1,
        'tags': 1,
        'sequencedIdentifier': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier);
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      if (options.search.props.tags) {
        // n.b. tags is a comma separated string
        selector.tags = {
          $in: options.search.props.tags.split(',')
        };
      }

      if (options.search.props.salesPriceLower || options.search.props.salesPriceGreater) {
        selector.price = {};
        var priceLowerThan = parseInt(options.search.props.salesPriceLower);
        var priceGreaterThan = parseInt(options.search.props.salesPriceGreater);

        if (!isNaN(priceLowerThan)) {
          selector.price.$lte = priceLowerThan;
        }

        if (!isNaN(priceGreaterThan)) {
          selector.price.$gte = priceGreaterThan;
        }
      }

      if (options.search.props.costPriceLower || options.search.props.costPriceGreater) {
        selector.cost = {};
        var costLowerThan = parseInt(options.search.props.costPriceLower);
        var costGreaterThan = parseInt(options.search.props.costPriceGreater);

        if (!isNaN(costLowerThan)) {
          selector.cost.$lte = costLowerThan;
        }

        if (!isNaN(costGreaterThan)) {
          selector.cost.$gte = costGreaterThan;
        }
      }

      return selector;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Products.before.insert(function(userId, doc) {
  if (!Roles.userIsInRole(userId, ['superadmin'])) {
    var user = Meteor.users.findOne(userId);
    var tenant = Tenants.findOne(user.group);
    doc.sequencedIdentifier = tenant.settings.product.defaultNumber;
  }
});

Products.after.insert(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });

  LogClientEvent(LogLevel.Info, user.profile.name + " created a new product", 'product', doc._id);

  if (Meteor.isServer) {
    if (user) {
      var tenant = Tenants.findOne({
        _id: user.group
      });
      if (tenant) {
        if (!Roles.userIsInRole(userId, ['superadmin'])) {
          Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'product', function(err, res) {
            if (err) throw new Meteor.Error(err);
            _.each(res, function(ex) {
              CustomFields.insert({
                name: ex.name,
                value: (ex.value ? ex.value : ''),
                defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                type: ex.type,
                global: true,
                order: ex.order,
                target: 'product',
                listValues: '',
                entityId: doc._id
              }, function(err) {
                if (err) {
                  LogServerEvent(LogLevel.Warning, "An error occurred whilst instanciating the global custom field '" + ex.name + "': " + err, 'product', doc._id);
                }
              });
            });
          });
        }
      }
    }

    if (doc._groupId) {
      Tenants.update({
        _id: doc._groupId
      }, {
        $inc: {
          'settings.product.defaultNumber': 1
        }
      }, function(err) {
        if (err) {
          LogServerEvent(LogLevel.Error, "An error occurred whilst updating the tenant's RealTime ID product value: " + err, 'tenant', doc._groupId);
          return;
        }
      });
    }
  }
});

Products.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  var user = Meteor.users.findOne({
    _id: userId
  });

  if (doc.description !== this.previous.description) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's description", 'product', doc._id);
  }
  if (doc.name !== this.previous.name) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's name", 'product', doc._id);
  }
  if (doc.cost !== this.previous.cost) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's cost", 'product', doc._id);
  }
  if (doc.price !== this.previous.price) {
    LogClientEvent(LogLevel.Info, user.profile.name + " updated a company's price", 'product', doc._id);
  }
});

Products.after.remove(function(userId, doc) {
  if (Roles.userIsInRole(userId, ['superadmin'])) return;
  if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
    return;
  }

  var user = Meteor.users.findOne({
    _id: userId
  });
  LogClientEvent(LogLevel.Info, user.profile.name + " deleted product '" + doc.name + "'", undefined, undefined);
});