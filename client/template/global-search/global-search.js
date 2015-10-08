Template.globalSearch.onRendered(function() {
  var instance = EasySearch.getComponentInstance({
    index: 'gsCompaniesIndex'
  });
  instance.clear();

  instance = EasySearch.getComponentInstance({
    index: 'gsContactsIndex'
  });
  instance.clear();
});

Template.globalSearch.onDestroyed(function() {
  Session.set('gsfOpen', false);
});

Template.globalSearch.helpers({
  indexes: function() {
    return ['gsCompaniesIndex', 'gsContactsIndex'];
  }
});
