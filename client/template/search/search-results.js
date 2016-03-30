Template.searchResults.onRendered(function() {

  const index = this.data.index,
        urlSearch = FlowRouter.getQueryParam("q"),
        urlFilter = FlowRouter.getQueryParam("f");

  // Update search on first render if present in URL
  if (urlSearch) {
    index.getComponentMethods().search(urlSearch);
    $('input.easysearch-input').val(urlSearch);
  }

  // Update filters on first render if present in URL
  if (urlFilter) {
    index.getComponentDict().set('searchOptions', {
      props: urlFilter
    });
  }

  // Update URL based on search and filters
  this.autorun(() => {
    const searchDefinition = index.getComponentDict().get('searchDefinition'),
          searchProps = index.getComponentDict().get('searchOptions').props;

    FlowRouter.withReplaceState(function() {
      FlowRouter.setQueryParams({
        q: searchDefinition ? searchDefinition : null,
        f: searchProps ? searchProps : null
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
