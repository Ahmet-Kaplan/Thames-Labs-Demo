Template.esSelectize.onRendered(function() {
  this.parent = new ReactiveVar('');
  this.query = new ReactiveVar(null);

  var selectize = $('#' + this.data.name)[0].selectize;

  // Set defaults
  if(this.data.value) {
    selectize.setValue(this.data.value);
  }
  if(this.data.readonly) {
    selectize.disable();
  }

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
    var searchInput = this.query.get();
    if (searchInput == null) return;
    var searchOptions = {
      props: {
        autosuggest: true
      }
    };
    if(this.parent.get() !== undefined && this.data.filter !== undefined) {
      searchOptions.props[this.data.filter] = this.parent.get();
    }
    resultsCursor = this.data.index.search(searchInput, searchOptions);
    if (resultsCursor.isReady()) {
      selectize.clearOptions();
      selectize.addOption(resultsCursor.fetch());
      selectize.refreshOptions(true);
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
