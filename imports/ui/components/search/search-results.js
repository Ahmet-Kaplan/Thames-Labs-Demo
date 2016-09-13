import './search-results.html';
import './search-results.less';

import '/imports/ui/components/loadmore/loadmore.js';

Template.searchResults.onRendered(function() {

  const index = this.data.index;
  const urlSearch = FlowRouter.getQueryParam("q") || '';
  const urlFilter = FlowRouter.getQueryParam("f") || {};

  // Update search and filters on first render
  index.getComponentMethods().search(urlSearch);
  $('input.easysearch-input').val(urlSearch);

  index.getComponentDict().set('searchOptions', {
    props: urlFilter
  });

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
    const templateName = Template.instance().data.listItemTemplateName;
    return Template[templateName];
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
    const indexMethods = Template.instance().data.index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  }
});
