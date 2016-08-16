import { getList } from '../local/search-box.js';

Template.filterPanel.helpers({
  filtersList: function() {
    return getList(Template.instance().data.collectionName);
  },
  index: function() {
    var mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  }
});
