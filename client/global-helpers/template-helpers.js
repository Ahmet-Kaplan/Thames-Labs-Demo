import { currencyHelpers } from '/imports/api/currency/currency-helpers.js';
import { EventLog, Opportunities, Projects, Products, PurchaseOrders, Tasks} from '/imports/api/collections.js';
import { Tracker } from 'meteor/tracker';

Template.registerHelper('greaterThan', function(a, b) {
  return a > b;
});
Template.registerHelper('lessThan', function(a, b) {
  return a < b;
});
Template.registerHelper('equals', function(a, b) {
  return a === b;
});

Template.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index + 1;
      return item;
    });
  }
});

Template.registerHelper('decimal', function(number) {
  return currencyHelpers.toDecimal(number);
});

Template.registerHelper('longNumber', function(number) {
  if (!number) number = 0;
  number = parseFloat(number);
  return number.toLocaleString({
    style: 'decimal'
  });
});

Template.registerHelper('formatDateLocale', function(date, locale) {
  if (!locale) locale = 'GMT';
  if (date) {
    switch (locale) {
      case 'GMT':
        return moment(date).format('MMMM Do YYYY, h:mma');
    }
  }
});

Template.registerHelper('friendlyDate', function(date) {
  return moment(date).format("Do MMMM YYYY, HH:mm:ss");
});

setRouteDetails = function(title) {
  Tracker.nonreactive(function() {
    if (Meteor.userId()) {
      const user = Meteor.user();
      var profile = user.profile;
      if (profile) {
        profile.lastActivity = {
          page: title,
          url: FlowRouter.current().path
        };

        Meteor.users.update(user._id, {
          $set: {
            profile: profile
          }
        });
      }
    }
  });
};

Template.registerHelper("setPageTitle", function() {
  var title = "";
  for (var i = 0; i < arguments.length - 1; i++) {
    title += arguments[i];
  }
  document.title = title;
  setRouteDetails(title);
});

Template.registerHelper("getDomainFromUrl", function(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
});

Template.registerHelper("isMobile", function() {
  return bowser.mobile || bowser.tablet;
});

Template.registerHelper("isDesktop", function() {
  return !bowser.mobile && !bowser.tablet;
});

Template.registerHelper("isApp", function() {
  return Meteor.isCordova;
});

// Make search indices available to templates - e.g. for EasySearch components
Template.registerHelper('ActivitiesIndex', () => ActivitiesIndex);
Template.registerHelper('EventLogIndex', () => EventLog.index);
Template.registerHelper('CompaniesIndex', () => CompaniesIndex);
Template.registerHelper('ContactsIndex', () => ContactsIndex);
Template.registerHelper('OpportunitiesIndex', () => Opportunities.index);
Template.registerHelper('ProductsIndex', () => Products.index);
Template.registerHelper('ProjectsIndex', () => Projects.index);
Template.registerHelper('PurchaseOrdersIndex', () => PurchaseOrders.index);
Template.registerHelper('UsersIndex', () => UsersIndex);
Template.registerHelper('TasksIndex', () => Tasks.index);
Template.registerHelper('TagsIndex', () => TagsIndex);
Template.registerHelper('TenantsIndex', () => TenantsIndex);

// Return standard search input attributes for EasySearch
Template.registerHelper('searchInputAttributes', () => {
  if (bowser.mobile || bowser.tablet || Meteor.isCordova) {
    return {
      placeholder: 'Search...',
      class: 'form-control easysearch-input',
      autofocus: false
    };
  }
  return {
    placeholder: 'Search...',
    class: 'form-control easysearch-input',
    autofocus: true
  };
});

// Allow extended context without overwriting
Template.registerHelper('extendContext', function(key, value) {
  this[key] = value;
  return this;
});

Template.registerHelper('userCurrency', function() {
  if(!Meteor.user()) return 'gbp';

  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant) {
    return tenant.settings.currency || 'gbp';
  }
});

Template.registerHelper('userCurrencySymbol', function() {
  return currencyHelpers.userCurrencySymbol();
});

Template.registerHelper('setSelected', function(value, option) {
  return (value === option) ? 'selected' : '';
});

Template.registerHelper('isProTenant', function() {
  if(!Meteor.user()) return false;

  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (!tenant) return false;
  return isProTenant(tenant._id);
});

Template.registerHelper('hasDownloadSupport', function() {
  const a = document.createElement('a');
  if (typeof a.download != "undefined") {
    // download attribute is supported
    return true;
  }
  return false;
});