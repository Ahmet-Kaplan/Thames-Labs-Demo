const currentFilter = new ReactiveVar({}),
      searchInput = new ReactiveVar(''),
      activeSelection = new ReactiveVar({});

function updateActiveSelection() {
  if ($('#filtersSearch').find('.active').length) {
    activeSelection.set({
      text: $('#filtersSearch').find('.active').text(),
      value: $('#filtersSearch').find('.active').data('value')
    });
  }
}

function displayFilter(mainCollectionName, selectize, template) {
  let filters = Collections[mainCollectionName].filters;
  filters = _.sortBy(filters, 'display');

  template.handle = Tracker.autorun(function() {
    const search = searchInput.get(),
          matchedFilters = _.some(filters, function(filter) {

            const filterRegexp = new RegExp(filter.display.trim(), 'i');

            if (filterRegexp.test(search)) {

              currentFilter.set(filter);

              //Retrieve search input to update the filter's dropdown
              const searchString = search.toLowerCase().split(filter.display.toLowerCase())[1] ? search.toLowerCase().split(filter.display.toLowerCase())[1].trim() : '',
                    //Defined additional props if needed (e.g. tags are restricted to the current collection)
                    props = filter.autosuggestFilter || {};
              props.autosuggest = true;

              selectize.clearOptions();

              //If filter is searchable, i.e. has a collection (unlike date, value...)
              if (filter.collectionName) {
                const recordsCursor = Collections[filter.collectionName].index.search(searchString, {
                  props: props
                });
                if (recordsCursor.isReady()) {
                  const records = recordsCursor.fetch();
                  _.each(records, function(record) {
                    selectize.addOption({
                      _id: record[filter.valueField],
                      name: filter.display + ' ' + record[filter.nameField]
                    });
                  });
                }

                //If filter doesn't have collection, allow creation to handle the search
              } else {
                //If fixed default options have been set, list them
                if (filter.defaultOptions) {
                  _.each(filter.defaultOptions(), function(option, i) {
                    selectize.addOption({
                      _id: 'setUnlistedFilter' + i,
                      name: filter.display + ' ' + option
                    });
                  });
                  //If defaultOptions are not the only possible values
                  if (filter.strict !== true) {
                    selectize.addOption({
                      _id: 'setUnlistedFilter',
                      name: search
                    });
                  }
                } else {
                  selectize.addOption({
                    _id: 'setUnlistedFilter',
                    name: search
                  });
                }
              }

              selectize.refreshOptions(true);
              return true;
            }

          });

    //If no match, the user may have erased the entry
    //so the list is no longer valid
    if (!matchedFilters) {

      _.each(filters, function(filter) {
        selectize.addOption({
          _id: 'setFilter' + '_' + filter.prop,
          name: filter.display
        });
      });
      selectize.refreshOptions(true);
    }
  });
}

function applyFilter(text, value, mainCollectionName, selectize) {

  const filter = currentFilter.get(),
        searchProps = Collections[mainCollectionName].index.getComponentDict().get('searchOptions').props || {},
        updatedProp = (typeof searchProps[filter.prop] === 'string') ? searchProps[filter.prop].split(',') : [];

  //If user clicked on an item in the generated filters list, trigger filter display
  if (value.search('setFilter') !== -1) {
    selectize.clearOptions();
    $('#filtersSearch input').val(text + ' ');
    searchInput.set(text + ' ');

    //If the filter is not a predefined value (e.g. date)
  } else if (value.search("setUnlistedFilter") !== -1) {
    text = text.split(filter.display);
    value = text[text.length - 1].trim();

    if (filter.verify && !filter.verify(value)) {
      selectize.clearOptions();
      selectize.blur();
      return false;
    }
    //Apply prop taking into account whether the filter accepts multiple values or not
    if (filter.allowMultiple === true) {
      updatedProp.push(value);
      //Note that only strings can be passed, the array is passed as a comma separated list
      Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, updatedProp.join(','));
    } else {
      Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, value);
    }

    selectize.clearOptions();
    selectize.blur();

    //Otherwise apply the said filter
  } else {
    const filterRegexp = new RegExp(filter.display.trim(), 'i');

    if (filterRegexp.test(text)) {
      updatedProp.push(value);
      //Note that only strings can be passed, the array is passed as a comma separated list
      Collections[mainCollectionName].index.getComponentMethods().addProps(filter.prop, updatedProp.join(','));
      selectize.clearOptions();
      selectize.blur();
    }
  }
}

Template.filterBox.onRendered(function() {
  const mainCollectionName = this.data.collectionName,
        self = this;
  this.handle = null;

  const $select = $('#filterBox').selectize({
    placeholder: this.data.placeholder,
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
    maxItems: 2,
    maxOptions: 15,
    selectOnTab: true,
    onFocus: function() {
      searchInput.set('');
      displayFilter(mainCollectionName, this, self);
    },
    onBlur: function() {
      this.clearOptions();
    },
    onType: function(query) {
      this.clearOptions();
      searchInput.set(query);
    },
    onItemAdd: function(value, $item) {
      applyFilter($($item).text(), value, mainCollectionName, this);
    }
  });

  //Trick to handle the use of enter key twice which is not taken care of by Selectize
  $('#filtersSearch').on('keyup', function(evt) {
    if (evt.keyCode === 13) {
      const data = activeSelection.get();
      if (data && data.text && data.value) {
        const text = data.text,
              value = data.value;
        applyFilter(text, value, mainCollectionName, $($select)[0].selectize);
      }
    }
    updateActiveSelection();
  });
});

Template.filterBox.onDestroyed(function() {
  if (this.handle) {
    this.handle.stop();
  }
});
