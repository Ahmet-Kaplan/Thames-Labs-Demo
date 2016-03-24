Template.smallSearchBox.helpers({
  index: function() {
    var mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  }
});

Template.smallSearchBox.events({
  'click #toggleFilters': function(e) {
    e.preventDefault();

    if (Session.get('search.showFilters')) {
      Session.set('search.showFilters', false);
    } else {
      Session.set('search.showFilters', true);
    }
  },
  'click #resetSearch': function() {
    var mainCollectionName = Template.instance().data.collectionName;
    var indexMethods = Collections[mainCollectionName].index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  },
  'click #searchHelp': function() {
    var mainCollectionName = Template.instance().data.collectionName
    Modal.show('searchHelp', {
      collection: mainCollectionName
    });
  }
});
