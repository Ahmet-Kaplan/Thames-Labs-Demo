var filters = {
  assignee: {
    regexp: /assignee:/i,   //RexExp, The trigger regexp
    display: 'Assignee:',   //String, So far needs to match the regexp
    prop: 'assigneeId',     //String, The parameters to look for in the mongoDB of the collection. 
                            //i.e. if you are on the tasks list page and want to select the assigneeId, put 'assigneeId'
                            //Note that the corresponding rule must exist in the collection file
    index: 'UsersIndex',    //String, Index to search in
    value: '__originalId',  //String, The parameter from the index used as value in the select dropdown
    name: 'name',            //String, The parameter from the index used as display in the select dropdown
    allowMultiple: false
  },
  company: {
    regexp: /company:/i,
    display: 'Company:',
    prop: 'entityId',
    index: 'CompaniesIndex',
    value: '__originalId',
    name: 'name',
    allowMultiple: false
  }
};

var filtersTags = new ReactiveVar([]);
var currentFilter = new ReactiveVar({});
var searchIndex = '';

function displayFilter(search, selectize) {
  var matchedFilters = 0;
  _.each(filters, function(filter) {

    if(filter.regexp.test(search)) {

      currentFilter.set(filter);
      matchedFilters++;
      //Retrieve search input to update the filter's dropdown
      var searchString = search.toLowerCase().split(filter.display.toLowerCase())[1].trim() || '';
      var recordsCursor = this[filter.index].search(searchString, {props: {autosuggest: true}});

      if(recordsCursor.isReady()){
        records = recordsCursor.fetch();

        _.each(records, function(record) {
          selectize.addOption({_id: record[filter.value], name: filter.display + ' ' + record[filter.name]});
        });

        selectize.refreshOptions(true);
      }

    }

  })

  //If no match, the user has erased the entry
  //so the list is no longer valid
  if(!matchedFilters) {
    selectize.clearOptions()
  }
}

function applyFilter(text, value, selectize) {
  var filter = currentFilter.get();
  var currentTags = filtersTags.get();

  if(filter.regexp.test(text)) {
    searchIndex.getComponentMethods().addProps(filter.prop, value);
    currentTags.push({
        prop: filter.prop,
        name: text,
        value: value
      });
    filtersTags.set(currentTags);
    selectize.clearOptions();
    return true;
  }
  return false;
}

function removeFilter(prop, val) {
  var currentTags = filtersTags.get();

  //For filter with unique value
  searchIndex.getComponentMethods().removeProps(prop);
  currentTags.some(function(tag, index) {
    if(tag.prop === prop) {
      currentTags.splice(index, 1);
      filtersTags.set(currentTags);
      return true;
    }
  })
}

Template.filterBox.onRendered(function() {
  var searchInputs = [];
  searchIndex = Template.instance().data.index;

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
    create: true,
    delimiter: ',',
    persist: false,
    load: function(query) {
      displayFilter(query, this);
    },
    onItemAdd: function(value, $item) {
      var text = $($item).text();
      applyFilter(text, value, this)
      TasksIndex.getComponentMethods().search('');
    }
  });
});

Template.filterBox.helpers({
  filtersList: function() {
    var searchIndex = Template.instance().data.index
    var searchOptions = searchIndex.getComponentDict().get('searchOptions');
    var filtersList = [];
    var self = this;
    if(searchOptions && searchOptions.props) {
      _.each(searchOptions.props, function(propValues, propIndex) {
        var values = propValues.split(',');
        var filter = Collections.tasks.filters[propIndex];

        _.each(values, function(value) {

          var displayName = value;

          if(filter && filter.index) {
            var searchOptions = {
              props: {
                autosuggest: true,
                searchById: value
              }
            }
            resultsCursor = Collections[filter.index].index.search('', searchOptions);
            if (resultsCursor.isReady()) {
              console.log(searchOptions, value, resultsCursor.fetch())
              displayName = resultsCursor.fetch()[0].name
            }
          }

          filtersList.push({
            prop: propIndex,
            name: filter.display + displayName,
            value: propIndex + '_' + value
          });

        });
      });
    }
    return filtersList;
  }
});

Template.filterBox.events({
  'click .removeProp': function(e) {
    e.preventDefault();
    var id = e.target.id;
    var prop = id.split('_')[0];
    var val = id.split('_')[1];
    removeFilter(prop, val);
  }
});
