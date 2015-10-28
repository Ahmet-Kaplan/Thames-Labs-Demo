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
