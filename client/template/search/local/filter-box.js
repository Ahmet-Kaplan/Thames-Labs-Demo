var currentFilter = new ReactiveVar({});
var searchInput = new ReactiveVar('')
var handle = '';

function displayFilter(mainCollectionName, selectize) {
  var filters = Collections[mainCollectionName].filters;
  filters = _.sortBy(filters, 'display');

  handle = Tracker.autorun(function() {
    var search = searchInput.get();
    var matchedFilters = _.some(filters, function(filter) {

      var filterRegexp = new RegExp(filter.display.trim(), 'i')

      if(filterRegexp.test(search)) {

        currentFilter.set(filter);

        //Retrieve search input to update the filter's dropdown
        var searchString = search.toLowerCase().split(filter.display.toLowerCase())[1] ? search.toLowerCase().split(filter.display.toLowerCase())[1].trim() : '';
        //Defined additional props if needed (e.g. tags are restricted to the current collection)
        var props = filter.autosuggestFilter || {};
        props.autosuggest = true;

        selectize.clearOptions();

        //If filter is searchable, i.e. has a collection (unlike date, value...)
        if(filter.collectionName) {
          var recordsCursor = Collections[filter.collectionName].index.search(searchString, {
            props: props
          });
          if(recordsCursor.isReady()){
            var records = recordsCursor.fetch();
            _.each(records, function(record) {
              selectize.addOption({
                _id: record[filter.valueField], 
                name: filter.display + ' ' + record[filter.nameField]
              });
            });
          }

        //If filter doesn't have collection, allow creation to handle the search
        } else {
          selectize.addOption({_id: 'setUnlistedFilter', name: search});
          //If fixed default options have been set, list them
          if(filter.defaultOptions) {
            _.each(filter.defaultOptions, function(option, i) {
              selectize.addOption({
                _id: 'setUnlistedFilter' + i, 
                name: filter.display + ' ' + option
              });
            });
          }
        }

        selectize.refreshOptions(true);
        return true;
      }

    });

    //If no match, the user may have erased the entry
    //so the list is no longer valid
    if(!matchedFilters) {

      _.each(filters, function(filter) {
        selectize.addOption({_id: 'setFilter' + '_' + filter.prop , name: filter.display});
      });
      selectize.refreshOptions(true);
    }
  });
}

function applyFilter(text, value, mainCollectionName, selectize) {
  //If user click on an item in the generated filters list, trigger filter display
  if(value.search('setFilter') !== -1) {
    selectize.clearOptions();
    $('#filtersSearch input').val(text + ' ');
    searchInput.set(text + ' ');

  //If the filter is not a predefined value (e.g. date)
  } else if(value.search("setUnlistedFilter") !== -1) {
    var filter = currentFilter.get();
    text = text.split(filter.display);
    value = text[text.length -1].trim();

    if(filter.verify && !filter.verify(value)) {
      selectize.clearOptions();
      selectize.blur();
      return false;  
    } else {
      //Apply prop (no need to differenciate define/update since it's a unique value, not an array of values)
      Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, value);    
      selectize.clearOptions();
      selectize.blur();
    }

  //Otherwise apply the said filter
  } else {
    var filter = currentFilter.get();
    var filterRegexp = new RegExp(filter.display.trim(), 'i')

    if(filterRegexp.test(text)) {
      var searchOptions = Collections[mainCollectionName].index.getComponentDict().get('searchOptions');
      
      //If prop already exist, update corresponding list
      if(searchOptions.props[filter.prop] !== undefined){
        var updatedProp = searchOptions.props[filter.prop].split(',');
        updatedProp.push(value);
        //Note that only strings can be passed, the array is passed as a comma separated list
        Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, updatedProp.join(','));
      } else {
        Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, value);
      }
      selectize.clearOptions();
      selectize.blur();
    }
  }
}

Template.filterBox.onRendered(function() {
  var mainCollectionName = this.data.collectionName;

  $('#filterBox').selectize({
    placeholder: 'Apply filters...',
    valueField: '_id',
    labelField: 'name',
    searchField: ['name'],
    openOnFocus: false,
    hideSelected: true,
    highlight: false,
    closeAfterSelect: true,
    allowEmptyOption: true,
    create: false,
    delimiter: ',',
    persist: false,
    onFocus: function() {
      searchInput.set('');
      displayFilter(mainCollectionName, this);
    },
    onBlur: function() {
      this.clearOptions();
    },
    load: function(query) {
      this.clearOptions();
      searchInput.set(query);
      displayFilter(mainCollectionName, this);
    },
    onItemAdd: function(value, $item) {
      var text = $($item).text();
      applyFilter(text, value, mainCollectionName, this);
    }
  });
});

Template.filterBox.onDestroyed(function() {
  handle.stop();
})