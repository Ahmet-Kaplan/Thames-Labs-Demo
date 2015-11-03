Template.searchResults.onRendered(function() {
  var index = this.data.index,
      name = index.getComponentDict().name,
      sessionVariableName = name + '.searchDefinition',
      previousSearch = Session.get(sessionVariableName);

  if (previousSearch) {
    index.getComponentMethods().search(previousSearch);
    $('input.easysearch-input').val(previousSearch);
  }

  this.autorun( () => {
    searchDefinition = index.getComponentDict().get('searchDefinition');
    Session.set(sessionVariableName, searchDefinition);
  });
});

Template.searchResults.helpers({
  listItem: function() {
    var templateName = Template.instance().data.listItemTemplateName;
    return Template[templateName]
  },
  resultsCount: function() {
    return Template.instance().data.index.getComponentDict().get('count');
  },
  hasMultipleResults: function() {
    return Template.instance().data.index.getComponentDict().get('count') !== 1;
  }
});

Template.searchResults.events({
  'click a.reset-search': function() {
    var indexMethods = Template.instance().data.index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  }
});
