function getCurrencySymbol(currency) {
  var currencySymbol = {
    gbp: '£',
    eur: '€',
    usd: '$'
  }

  return currencySymbol[currency] || '£';
}

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
  if (!number) number = 0;
  number = parseFloat(number);
  var allowedCurrencies = ['gbp', 'eur', 'usd'];
  var tenantCurrency = Tenants.findOne({}).settings.currency;
  var currency = (allowedCurrencies.indexOf(tenantCurrency) === -1) ? 'gbp' : tenantCurrency;
  var currencyLocale = {
    gbp: 'en-gb',
    eur: 'fr',
    usd: 'en'
  }
  var displayLocale = currencyLocale[currency] || 'en-gb';

  return number.toLocaleString(displayLocale, {
    style: 'currency',
    currency: currency.toUpperCase()
  });
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

setRouteDetails = function(title) {
  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  if (user) {

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

Template.registerHelper("isApp", function() {
  return Meteor.isCordova;
});

// Make search indices available to templates - e.g. for EasySearch components
Template.registerHelper('AuditLogIndex', () => AuditLogIndex);
Template.registerHelper('ActivitiesIndex', () => ActivitiesIndex);
Template.registerHelper('GlobalAuditIndex', () => GlobalAuditIndex);
Template.registerHelper('CompaniesIndex', () => CompaniesIndex);
Template.registerHelper('ContactsIndex', () => ContactsIndex);
Template.registerHelper('OpportunitiesIndex', () => OpportunitiesIndex);
Template.registerHelper('ProductsIndex', () => ProductsIndex);
Template.registerHelper('ProjectsIndex', () => ProjectsIndex);
Template.registerHelper('PurchaseOrdersIndex', () => PurchaseOrdersIndex);
Template.registerHelper('UsersIndex', () => UsersIndex);
Template.registerHelper('TasksIndex', () => TasksIndex);
Template.registerHelper('TagsIndex', () => TagsIndex);
Template.registerHelper('TenantsIndex', () => TenantsIndex);

// Return standard search input attributes for EasySearch
Template.registerHelper('searchInputAttributes', () => {
  if (bowser.mobile || bowser.tablet) {
    return {
      placeholder: 'Search...',
      class: 'form-control easysearch-input',
      autofocus: false
    };
  } else {
    return {
      placeholder: 'Search...',
      class: 'form-control easysearch-input',
      autofocus: true
    };
  };
});

// Allow extended context without overwriting
Template.registerHelper('extendContext', function(key, value) {
  this[key] = value;
  return this;
});

Template.registerHelper('userCurrency', function() {
  var tenant = Tenants.findOne({});
  if (tenant) {
    return tenant.settings.currency || 'gbp';
  }
});

Template.registerHelper('userCurrencySymbol', function() {
  var tenant = Tenants.findOne({});
  if (tenant) {
    var currency = tenant.settings.currency || 'gbp';
    return getCurrencySymbol(currency);
  }
});

Template.registerHelper('setSelected', function(value, option) {
  return (value === option) ? 'selected' : '';
});

Template.registerHelper('isProTenant', function() {
  var tenant = Tenants.findOne({});
  if (!tenant) return false;
  return isProTenant(tenant._id);
});
