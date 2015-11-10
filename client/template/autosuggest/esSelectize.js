Template.esSelectize.onRendered(function() {
  this.parent = new ReactiveVar('');
  this.query = new ReactiveVar(null);

  var selectize = $('#' + this.data.name)[0].selectize;

  // If parent is set, listen for updates to it's value
  if(this.data.parent) {
    var parentElt = $('#' + this.data.parent);
    this.parent.set(parentElt.val());
    parentElt.change( () => {
      this.parent.set(parentElt.val());
    });
  }

  // search update listener
  this.autorun( () => {
    var searchOptions = {
      props: {
        autosuggest: true
      }
    };
    var resultsCursor = null;
    var searchInput = this.query.get();

    if (searchInput == null && this.data.value) {
      // First run and value set, so perform a searchById
      searchOptions.props.searchById = this.data.value;
      resultsCursor = this.data.index.search('', searchOptions);
      if (resultsCursor.isReady()) {
        selectize.addOption(resultsCursor.fetch());
        selectize.setValue(this.data.value);
      }
    } else if (searchInput == null) {
      // First run and no value set, so do nothing
      return;
    } else {
      // Normal search
      if(this.parent.get() !== undefined && this.data.filter !== undefined) {
        searchOptions.props[this.data.filter] = this.parent.get();
      }
      resultsCursor = this.data.index.search(searchInput, searchOptions);
      if (resultsCursor.isReady()) {
        selectize.addOption(resultsCursor.fetch());
        selectize.refreshOptions(true);
      }
    }
  });
});

Template.esSelectize.helpers({
  initialize: function() {
    var self = Template.instance();
    var options = {
      closeAfterSelect: true,
      valueField: "__originalId",
      labelField: "name",
      searchField: "name",
      createOnBlur: false,
      load: (query) => {
        self.query.set(query);
      },
      onFocus: () => {
        if (!self.query.get()) {
          self.query.set('');
        }
      },
      onInitialize: function() {
        if(self.data.readonly) {
          this.disable();
        }
      }
    };
    if(this.allowCreate) {
      options.render = {
        option_create: function(data, escape) {
          return '<div data-selectable class="create">This will create a new Company <strong>' + escape(data.input) + '</strong></div>';
        },
      };
      options.create = function(input, callback) {
        return {
          __originalId: 'newRecord' + input,
          name: input
        };
      };
    } else {
      options.create = false;
    }
    return options;
  }
});
