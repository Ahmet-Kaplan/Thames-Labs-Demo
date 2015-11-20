/*
The filter box takes only one parameter which is the name of the collection on which the filters must be applied.
This parameter must be passed as a string. For instance, {{> filterBox collectionName='tasks'}} will apply filters on the task list.

The filters themselves are stored in the collection file as an object alongside the collection, index... as:
  Collections.nameOfYourCollection.filters = { filter1, filter2, ... }

The filter object itself is built as follow:

  nameOfTheFilter: {                                          Name of the property on which the filter will work. Note that this must be the name of the prop in the easy search index
    display: 'MyField:',                  String              Text that will be used for triggering the dropdown (case insensitive) and to display the filter tag
    prop: 'nameOfTheFilter',              String              The name of the prop in the easy search index. A corresponding rule must be defined in options.search.props.prop
                                                              MUST be identical to the key to allow displaying in tags (dirty hack)
    collectionName: 'myCollection',       String              The collection from which the dropdown list will be generated and looked for. 
                                                              The code will look for Collections[collectionName].index so an index must be defined as well
    autosuggestFilter: {prop1: 'value'},  Object (Optional)   The props that must be applied to the collection before the autosuggest is rendered.
                                                              For instance in the case of tags the filter could be {collection: 'tasks'} to restrict the autosuggest to only the tasks tags.
    valueField: '__originalId',           String              Name of the field returned by the search index that should be used as the value on the select <option value="valueField">nameField</option>
    nameField: 'name',                    String              Name of the field returned by the search index that should be used as the display on the select <option value="valueField">nameField</option>
    subscriptionById: 'fieldById',        String (Optional)   Name of the subscription that must be used to fetch the object to display on the filter tag
    displayValue: function(user) {        Function (Optional) Used to return the correct formatting of the field for the filter tag.
      if(user) {                                              Takes one argument which is the unique object returned by the subscription
        return user.profile.name;
      }
    },
    verify: function(value) {             Function (Optional) For filters that do not take a collection as input, you can use this function to check the validity of the input
      if(value.isValid()) {                                   before the prop is defined. The function must return true if the input is valid, false otherwise.
        return true;                                          In the latter case, the prop will not be set.
      } else {                                                For example, if the input must be a date, we can check that the date is valid before actually setting it.
        return false;
      }
    }
  }

With each filter, a search prop must be defined with the same name (hence the reason for having the name of the field identical to the prop parameter).
Note that between each filter, an 'AND' statement is applied while an 'OR' statement is applied inside a field. Since the search prop cannot be passed as an object,
it is returned as a comma separated list. The list is then obtained by using the split(',') method.
Here is what your rule should look like:
if(options.search.props.nameOfTheFilter) {
  selector.fieldToFilterBy = {$in: options.search.props.nameOfTheFilter.split(',')};
}
*/

var currentFilter = new ReactiveVar({});
var searchInput = new ReactiveVar('')
var handle = '';

function displayFilter(mainCollectionName, selectize) {
  var filters = Collections[mainCollectionName].filters;
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
              selectize.addOption({_id: record[filter.valueField], name: filter.display + ' ' + record[filter.nameField]});
            });
            selectize.refreshOptions(true);
          }
        //If filter doesn't have collection, allow creation to handle the search
        } else {
          selectize.addOption({_id: 'setUnlistedFilter', name: 'Apply ' + search});
          selectize.refreshOptions(true);
        }
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
  } else if(value === "setUnlistedFilter") {
    var filter = currentFilter.get();
    text = text.split(filter.display);
    value = text[text.length -1].trim();

    console.log(filter.verify, filter.verify(value));

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