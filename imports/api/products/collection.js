import { Mongo } from 'meteor/mongo';
import { ProductSchema } from './schema.js';
import { ProductHooks } from './collection-hooks.js';
import { ProductFilters } from './filters.js';

class ProductsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const result = super.insert(doc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const result = super.remove(selector);
    return result;
  }
}

export const Products = new ProductsCollection('products');

Products.attachSchema(ProductSchema);

Partitioner.partitionCollection(Products);

Tags.TagsMixin(Products);

// SEARCH FILTERS //
Products.filters = ProductFilters;


// COLLECTION HOOKS //
// Eventually these should be migrated into the ProductsCollection class
Products.before.insert(ProductHooks.beforeInsert);
Products.after.insert(ProductHooks.afterInsert);
Products.after.update(ProductHooks.afterUpdate);
Products.after.remove(ProductHooks.afterRemove);

// SECURITY //
Products.permit(['insert']).ifLoggedIn().ifHasRole('CanCreateProducts').apply();
Products.permit(['update']).ifLoggedIn().ifHasRole('CanEditProducts').apply();
Products.permit(['remove']).ifLoggedIn().ifHasRole('CanDeleteProducts').apply();
Products.allowTags(function(userId) {
  return !!userId;
});

// SEARCH INDEX //
Products.index = new EasySearch.Index({
  collection: Products,
  fields: ['name'],
  permission: function(options) {
    const userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadProducts']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({ 'name': 1 }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      return {
        'name': 1,
        'price': 1,
        'cost': 1,
        'tags': 1,
        'sequencedIdentifier': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      const selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      if (options.search.props.sequencedIdentifier) {
        selector.sequencedIdentifier = parseInt(options.search.props.sequencedIdentifier, 10);
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
        const priceLowerThan = parseInt(options.search.props.salesPriceLower, 10);
        const priceGreaterThan = parseInt(options.search.props.salesPriceGreater, 10);

        if (!isNaN(priceLowerThan)) {
          selector.price.$lte = priceLowerThan;
        }

        if (!isNaN(priceGreaterThan)) {
          selector.price.$gte = priceGreaterThan;
        }
      }

      if (options.search.props.costPriceLower || options.search.props.costPriceGreater) {
        selector.cost = {};
        const costLowerThan = parseInt(options.search.props.costPriceLower, 10);
        const costGreaterThan = parseInt(options.search.props.costPriceGreater, 10);

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
