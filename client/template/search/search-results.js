Template.searchResults.onRendered(function() {
  var index = this.data.index,
  
  name = index.getComponentDict().name;
  
  
  //Update searches and filters from URL if exists
  var urlSearch = FlowRouter.getQueryParam("q");
  var urlFilter = FlowRouter.getQueryParam("f");

  if (urlSearch) {
    urlSearch = decodeURIComponent(urlSearch);
    index.getComponentMethods().search(urlSearch);
    $('input.easysearch-input').val(urlSearch);
  }
  else {
    index.getComponentMethods().search("");
    $('input.easysearch-input').val("");
  }

  if (urlFilter) {
    urlFilter = JSON.parse(decodeURIComponent(decodeURIComponent(urlFilter)));
    var searchOptions = { props: urlFilter };
    index.getComponentDict().set('searchOptions', searchOptions);
  }
  else {
    index.getComponentDict().set('searchOptions', {});
  }
    
  this.autorun(() => {
    searchDefinition = index.getComponentDict().get('searchDefinition');
    searchOptions = JSON.stringify(index.getComponentDict().get('searchOptions').props);
    
    if (searchDefinition == "") searchDefinition = undefined;
    if (searchOptions == "{}") searchOptions = undefined;
    
    FlowRouter.withReplaceState(function() {
      FlowRouter.setQueryParams({
        q: searchDefinition,
        f: searchOptions
       });
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