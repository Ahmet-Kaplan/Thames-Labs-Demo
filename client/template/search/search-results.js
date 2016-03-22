Template.searchResults.onRendered(function() {
  var index = this.data.index,
    name = index.getComponentDict().name,
    sessionVariableName = name + '.searchDefinition',
    previousSearch = Session.get(sessionVariableName);

  if (previousSearch) {
    index.getComponentMethods().search(previousSearch);
    $('input.easysearch-input').val(previousSearch);
  }
  
  //Update searches and filters from URL if exists
  var urlSearch = FlowRouter.getQueryParam("q");
  if (urlSearch) {
    urlSearch = decodeURIComponent(urlSearch);
    index.getComponentMethods().search(urlSearch);
    $('input.easysearch-input').val(urlSearch);
  }
  
  var urlFilter = FlowRouter.getQueryParam("f");
  if (urlFilter) {
    urlFilter = JSON.parse(decodeURIComponent(decodeURIComponent(urlFilter)));
    var searchOptions = { props: urlFilter };
    index.getComponentDict().set('searchOptions', searchOptions);
  }

  this.autorun(() => {
    searchDefinition = index.getComponentDict().get('searchDefinition');
    searchOptions = index.getComponentDict().get('searchOptions').props;

    Session.set(sessionVariableName, searchDefinition);
    
    var encodedSO = JSON.stringify(searchOptions);
    if (encodedSO == "{}") encodedSO = undefined;
    if (searchDefinition == "") searchDefinition = undefined;
    
    //FlowRouter automatically performs encodeURIComponent on variables, no need to repeat
    FlowRouter.setQueryParams({
      q: searchDefinition,
      f: encodedSO
    });
    
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