import './autosuggest.html';

Template.autosuggest.onRendered(function() {
  this.parent = new ReactiveVar('');
  this.query = new ReactiveVar(null);
  const selectize = $(`#${this.data.name}`)[0].selectize;

  // If parent is set, listen for updates to it's value
  if (this.data.parent) {
    const parentElt = $(`#${this.data.parent}`);
    this.parent.set(parentElt.val());
    parentElt.change(() => {
      this.parent.set(parentElt.val());
    });
  }

  // search update listener
  this.autorun(() => {
    const searchOptions = {
      props: {
        autosuggest: true
      }
    };

    let resultsCursor = null;
    const searchInput = this.query.get();

    if (this.data.excludes) {
      searchOptions.props.excludes = this.data.excludes;
    }

    if (searchInput === null && !this.data.value) {
      // First run and no value set, so do nothing
      return;
    }

    if (searchInput === null) {
      // First run and value set, so perform a searchById
      searchOptions.props.searchById = this.data.value;
      resultsCursor = this.data.index.search('', searchOptions);
      if (resultsCursor.isReady()) {
        selectize.addOption(resultsCursor.fetch());
        selectize.setValue(this.data.value);
      }
    } else {
      // Normal search
      if (typeof this.parent.get() !== "undefined" && typeof this.data.filter !== "undefined") {
        searchOptions.props[this.data.filter] = this.parent.get();
      }
      resultsCursor = this.data.index.search(searchInput, searchOptions);
      if (resultsCursor.isReady()) {
        selectize.clearOptions();
        selectize.addOption(resultsCursor.fetch());
        // only open the selectize dropdown if the input is empty
        // to be honest, Max and I are not really sure why...
        selectize.refreshOptions(searchInput === '');
      }
    }
  });
});

Template.autosuggest.helpers({
  initialize: function() {
    const tasksIndex = (this.index.config.name === "tasks");

    const self = Template.instance();
    const options = {
      closeAfterSelect: true,
      valueField: "__originalId",
      labelField: (tasksIndex ? "title" : "name"),
      searchField: (tasksIndex ? "title" : "name"),
      createOnBlur: false,
      selectOnTab: true,
      openOnFocus: true,
      load: (query) => {
        self.query.set(query);
      },
      onInitialize: function() {
        if (self.data.readonly) {
          this.disable();
        }
      }
    };
    if (this.allowCreate) {
      options.render = {
        option_create: function(data, escape) {
          return `<div data-selectable class="create">This will create a new Company <strong>${escape(data.input)}</strong></div>`;
        },
      };
      options.create = function(input, callback) {
        return {
          __originalId: `newRecord${input}`,
          name: input
        };
      };
    } else {
      options.create = false;
    }
    return options;
  }
});