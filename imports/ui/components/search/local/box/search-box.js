import './search-box.html';
import './search-box.css';
import '../../filters/box/filter-box.js';
import { getFilters } from '/imports/api/search/search-functions.js';

Template.searchBox.onCreated(function() {
  this.showFilters = new ReactiveVar(false);
});

Template.searchBox.helpers({
  filtersList: function() {
    return getFilters(Template.instance().data.collectionName);
  },
  index: function() {
    const mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  },
  showFilters: function() {
    return Template.instance().showFilters.get();
  }
});

Template.searchBox.events({
  'click #toggleFilters': function(e) {
    e.preventDefault();

    if (Template.instance().showFilters.get()) {
      Template.instance().showFilters.set(false);
    } else {
      const selectize = $('#filterBox')[0].selectize;
      selectize.clearOptions();
      Meteor.setTimeout(function() {
        $('#filtersSearch input').focus();
      }, 300);
      Template.instance().showFilters.set(true);
    }
    $(e.target).blur();
  },
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


