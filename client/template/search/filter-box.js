/*
The filter box takes only one parameter which is the name of the collection on which the filters must be applied.
This parameter must be passed as a string. For instance, {{> filterBox collectionName='tasks'}} will apply filters on the task list.

The filters themselves are stored in the collection file as an object alongside the collection, index... as:
  Collections.nameOfYourCollection.filters = { filter1, filter2, ... }

The filter object itself is built as follow:

  nameOfTheFilter: {                                      Name of the property on which the filter will work. Note that this must be the name of the prop in the easy search index
    display: 'MyField:',              String              Text that will be used for triggering the dropdown (case insensitive) and to display the filter tag
    prop: 'nameOfTheFilter',          String              The name of the prop in the easy search index. A corresponding rule must be defined in options.search.props.prop
                                                          MUST be identical to the key to allow displaying in tags (dirty hack)
    collectionName: 'myCollection',   String              The collection from which the dropdown list will be generated and looked for. 
                                                          The code will look for Collections[collectionName].index so an index must be defined as well
    valueField: '__originalId',       String              Name of the field returned by the search index that should be used as the value on the select <option value="valueField">nameField</option>
    nameField: 'name',                String              Name of the field returned by the search index that should be used as the display on the select <option value="valueField">nameField</option>
    subscriptionById: 'fieldById',    String (Optional)   Name of the subscription that must be used to fetch the object to display on the filter tag
    displayValue: function(user) {    Function (Optional) Used to return the correct formatting of the field for the filter tag.
      if(user) {                                          Takes one argument which is the unique object returned by the subscription
        return user.profile.name;
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
var handle = '';

function displayFilter(search, mainCollectionName, selectize) {
  var filters = Collections[mainCollectionName].filters;
  var matchedFilters = _.some(filters, function(filter) {

    var filterRegexp = new RegExp(filter.display.trim(), 'i')

    if(filterRegexp.test(search)) {

      currentFilter.set(filter);

      //Retrieve search input to update the filter's dropdown
      var searchString = search.toLowerCase().split(filter.display.toLowerCase())[1] ? search.toLowerCase().split(filter.display.toLowerCase())[1].trim() : '';

      handle = Tracker.autorun(function() {
      var recordsCursor = Collections[filter.collectionName].index.search(searchString, {props: {autosuggest: true}});

        if(recordsCursor.isReady()){
          records = recordsCursor.fetch();
            selectize.clearOptions();
          _.each(records, function(record) {
            selectize.addOption({_id: record[filter.valueField], name: filter.display + ' ' + record[filter.nameField]});
          });

          selectize.refreshOptions(true);
        }
      })

      return true;
    }

  })

  //If no match, the user may have erased the entry
  //so the list is no longer valid
  if(!matchedFilters) {
    selectize.clearOptions();

    _.each(filters, function(filter) {
      selectize.addOption({_id: 'setFilter' + '_' + filter.prop , name: filter.display});
    });
    selectize.refreshOptions(true);
  }
}

function applyFilter(text, value, mainCollectionName, selectize) {
  if(value.search('setFilter') !== -1) {
    selectize.clearOptions();
    $('#filtersSearch input').val(text + ' ');
    displayFilter(text + ' ', mainCollectionName, selectize)
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
      return true;
    }
    return false;
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
      displayFilter('', mainCollectionName, this);
    },
    load: function(query) {
      displayFilter(query, mainCollectionName, this);
    },
    onItemAdd: function(value, $item) {
      var text = $($item).text();
      applyFilter(text, value, mainCollectionName, this)
    }
  });
});

Template.filterBox.onDestroyed(function() {
  handle.stop();
})