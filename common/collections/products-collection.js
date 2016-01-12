Collections.products = Products = new Mongo.Collection('products');

Partitioner.partitionCollection(Products);

////////////////////
// SEARCH FILTERS //
////////////////////

Collections.products.filters = {
  salesPriceLower: {
    display: 'Sales Price <',
    prop: 'salesPriceLower',
    verify: function(value) {
      value = parseInt(value)
      if(isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
  salesPriceGreater: {
    display: 'Sales Price >',
    prop: 'salesPriceGreater',
    verify: function(value) {
      value = parseInt(value)
      if(isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
  costPriceLower: {
    display: 'Cost Price <',
    prop: 'costPriceLower',
    verify: function(value) {
      value = parseInt(value)
      if(isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
  costPriceGreater: {
    display: 'Cost Price >',
    prop: 'costPriceGreater',
    verify: function(value) {
      value = parseInt(value)
      if(isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false
      } else {
        return true;
      }
    }
  },
}

////////////////////
// SEARCH INDICES //
////////////////////

Collections.products.index = ProductsIndex = new EasySearch.Index({
  collection: Products,
  fields: ['name'],
  engine: new EasySearch.MongoDB({
    sort: () => {
      return {
        'name': 1
      }
    },
    permission: function(options) {
      var userId = options.userId;
      return Roles.userIsInRole(userId, [ 'CanReadProducts']);
    },
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {}
      }
      return {
        'name': 1,
        'price': 1,
        'cost': 1
      }
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }

      if(options.search.props.salesPriceLower || options.search.props.salesPriceGreater) {
        selector.price = {};
        var priceLowerThan = parseInt(options.search.props.salesPriceLower);
        var priceGreaterThan = parseInt(options.search.props.salesPriceGreater);

        if(!isNaN(priceLowerThan)) {
          selector.price.$lte = priceLowerThan;
        }

        if(!isNaN(priceGreaterThan)) {
          selector.price.$gte = priceGreaterThan;
        }
      }

      if(options.search.props.costPriceLower || options.search.props.costPriceGreater) {
        selector.cost = {};
        var costLowerThan = parseInt(options.search.props.costPriceLower);
        var costGreaterThan = parseInt(options.search.props.costPriceGreater);

        if(!isNaN(costLowerThan)) {
          selector.cost.$lte = costLowerThan;
        }

        if(!isNaN(costGreaterThan)) {
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

Products.after.insert(function(userId, doc) {
  logEvent('info', 'A new product has been created: ' + doc.name);
});

Products.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.description !== this.previous.description) {
    logEvent('info', 'An existing product has been updated: The value of "description" was changed');
  }
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing product has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  if (doc.cost !== this.previous.cost) {
    logEvent('info', 'An existing product has been updated: The value of "cost price" was changed from ' + this.previous.cost + " to " + doc.cost);
  }
  if (doc.price !== this.previous.price) {
    logEvent('info', 'An existing product has been updated: The value of "sales price" was changed from ' + this.previous.price + " to " + doc.price);
  }
});

Products.after.remove(function(userId, doc) {
  logEvent('info', 'A product has been deleted: ' + doc.name);
});
