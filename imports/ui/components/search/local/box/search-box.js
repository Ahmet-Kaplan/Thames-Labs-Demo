import './search-box.html';
import './search-box.css';
import '../../filters/box/filter-box.js';
import { getFilters } from '/imports/api/search/search-functions.js';

Template.searchBox.onRendered(function() {
  Session.setDefault('search.showFilters', false);
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
    return Session.get('search.showFilters');
  }
});

Template.searchBox.events({
  'click #toggleFilters': function(e) {
    e.preventDefault();

    if (Session.get('search.showFilters')) {
      Session.set('search.showFilters', false);
    } else {
      const selectize = $('#filterBox')[0].selectize;
      selectize.clearOptions();
      Meteor.setTimeout(function() {
        $('#filtersSearch input').focus();
      }, 300);
      Session.set('search.showFilters', true);
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


