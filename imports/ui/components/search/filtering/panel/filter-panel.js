import './filter-panel.html';
import './filter-panel.css';
import '../box/filter-box.js';
import '../tag/filter-tag.js';
import { getFilters } from '/imports/api/search/search-functions.js';

Template.filterPanel.onCreated(function() {
  this.totalCount = new ReactiveVar(0);
});

Template.filterPanel.onRendered(function() {
  const mainCollectionName = Template.instance().data.collectionName;
  console.log(Template.instance());
  this.autorun(() => {
    this.totalCount.set(Collections[mainCollectionName].index.getComponentDict().get('count'));
  });
});

Template.filterPanel.helpers({
  entityCount: function() {
    return Template.instance().totalCount.get();
  },
  multiple: function() {
    return Template.instance().totalCount.get() !== 1;
  },
  filtersList: function() {
    return getFilters(Template.instance().data.collectionName);
  },
  index: function() {
    const mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  }
});
