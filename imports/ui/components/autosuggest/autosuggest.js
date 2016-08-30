import './autosuggest.html';

Template.autosuggest.onRendered(function() {
  this.parent = new ReactiveVar('');
  this.query = new ReactiveVar('');
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
    const searchOptions = {props: {autosuggest: true}};
    if (this.data.excludes) {
      searchOptions.props.excludes = this.data.excludes;
    }
    if (typeof this.parent.get() !== "undefined" && typeof this.data.filter !== "undefined") {
      searchOptions.props[this.data.filter] = this.parent.get();
    }
    const resultsCursor = this.data.index.search(this.query.get(), searchOptions);
    if (resultsCursor.isReady()) {
      selectize.clearOptions();
      selectize.addOption(resultsCursor.fetch());
      //Show options dropdown if user has typed something
      selectize.refreshOptions(this.query.get() !== '');
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