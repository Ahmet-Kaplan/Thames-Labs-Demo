import './small-search-box.html';

Template.smallSearchBox.helpers({
  index: function() {
    const mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  }
});

Template.smallSearchBox.events({
  'click #resetSearch': function() {
    const mainCollectionName = Template.instance().data.collectionName,
          indexMethods = Collections[mainCollectionName].index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  },
  'click #searchHelp': function() {
    const mainCollectionName = Template.instance().data.collectionName;
    Modal.show('searchHelp', {
      collection: mainCollectionName
    });
  }
});
