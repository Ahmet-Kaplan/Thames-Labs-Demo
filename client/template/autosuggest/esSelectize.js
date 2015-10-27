function searchOptions(index, search, optionsList, parent, filter) {
  if(index === undefined) {
    //No search index set up
    return false;
  }

  var searchOptions = {
    props: {
      autosuggest: true
    }
  };

  if(parent !== undefined && filter !== undefined) {
    searchOptions.props[filter] = parent;
  }

  var searchInput = search || '';
  var results = index.search(searchInput, searchOptions).fetch();
  optionsList.set(results);
}

Template.esSelectize.onRendered(function() {
  this.optionsList = new ReactiveVar([]);
  this.selectize = new ReactiveVar({});
  this.parent = new ReactiveVar('');
  this.search = new ReactiveVar('');

  var parent = this.data.parent;
  var selectizer = this.data.name;
  var selectize = $('#' + selectizer)[0].selectize;
  var defaultValue = this.data.value;
  var index = this.data.index;
  var filter = this.data.filter;
  if(parent) {
    var parentElt = $('#' + parent);
    this.parent.set(parentElt.val());
    parentElt.change( () => {
      this.parent.set(parentElt.val());
    });
  }
  var readonly = this.data.readonly;

  //search update listener
  this.autorun(function() {
    var parent = Template.instance().parent.get();
    var search = Template.instance().search.get() || '';
    searchOptions(index, search, Template.instance().optionsList, parent, filter);
  });

  //display update listener
  this.autorun(function() {
    var optionsList = Template.instance().optionsList.get();
    Template.instance().selectize.set(selectize);
    if(optionsList) {
      selectize.clearOptions();
      selectize.addOption(optionsList);
      selectize.refreshOptions(false);
    }
    if(defaultValue) {
      Template.instance().search.set(defaultValue);
      selectize.setValue(defaultValue);
    }
    if(readonly) {
      selectize.disable();
    }
  });
});

Template.esSelectize.helpers({
  initialize: function() {
    var options = {
      closeAfterSelect: true,
      valueField: "__originalId",
      labelField: "name",
      searchField: "name",
      createOnBlur: false,
    };
    if(this.allowCreate) {
      options.render = {
        option_create: function(data, escape) {
          return '<div data-selectable class="create">This will create a new Company <strong>' + escape(data.input) + '</strong></div>';
        },
      };
      options.create = function(input, callback) {
        return {
          _id: 'newRecord' + input,
          name: input
        };
      };
    } else {
      options.create = false;
    }
    return options;
  }
});

Template.esSelectize.events({
  'keyup input': function(e) {
    var selectize = Template.instance().selectize.get();
    if(e.keyCode === 13 || e.keyCode === 9) {
      return;
    }
    Template.instance().search.set(selectize.lastQuery);
  }
});
