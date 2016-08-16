import './filter-panel.html';
import './filter-panel.css';
import '../box/filter-box.js';
import '../tag/filter-tag.js';
import { getFilters } from '/imports/api/search/search-functions.js';

Template.filterPanel.helpers({
  filtersList: function() {
    return getFilters(Template.instance().data.collectionName);
  },
  index: function() {
    const mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  }
});
