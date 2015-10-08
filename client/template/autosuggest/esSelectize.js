function searchOptions(index, search, optionsList, parent, filter) {
  if(index === undefined) {
    //No search index set up
    return false;
  }
  if(parent !== undefined && filter !== undefined) {
    EasySearch.changeProperty(index, filter, parent);
  }

  var searchInput = search || '';
  EasySearch.search(index, searchInput, function(err, data) {
    if(err) {
      toastr.error('Unable to retrieve list');
      return false;
    }
    optionsList.set(data.results);
    return true;
  });
}

Template.esSelectize.onRendered(function() {
  this.optionsList = new ReactiveVar([]);
  this.selectize = new ReactiveVar({});

  var name = this.data.name;
  var parent = this.data.parent;
  var selectizer = this.data.name;
  var selectize = $('#' + selectizer)[0].selectize;
  var defaultValue = this.data.value;
  var index = this.data.index;
  var filter = this.data.filter;
  if(parent) {
    var parentElt = $('#' + parent);
    Session.set('parent' + name, parentElt.val());
    parentElt.change(function() {
      Session.set('parent' + name, parentElt.val());
    });
  }
  var readonly = this.data.readonly;

  //search update listener
  this.autorun(function() {
    var parent = Session.get('parent' + name);
    var search = Session.get('search' + name) || '';
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
      Session.set('search' + name , defaultValue);
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
      valueField: "_id",
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
    var name = Template.instance().data.name;
    if(e.keyCode === 13 || e.keyCode === 9) {
      return;
    }
    Session.set('search' + name , selectize.lastQuery);
  }
});

Template.esSelectize.onDestroyed(function() {
  var name = this.data.name;
  Session.set('search' + name , '');
  Session.set('parent' + name , '');
});
