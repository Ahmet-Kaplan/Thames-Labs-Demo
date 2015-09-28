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

  var name = Template.instance().data.name;
  var parent = Template.instance().data.parent;
  var selectizer = Template.instance().data.name;
  var selectize = $('#' + selectizer)[0].selectize;
  var defaultValue = this.data.value;
  var index = Template.instance().data.index;
  var filter = Template.instance().data.filter;

  if(parent) {
    var parentElt = $('#' + parent);
    Session.set('parent' + name, parentElt.val());
    parentElt.change(function() {
      Session.set('parent' + name, parentElt.val());
    });
  }

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
      selectize.setValue(defaultValue);
    }
  });
});

Template.esSelectize.helpers({
  initialize: function() {
    return {
      create: false,
      closeAfterSelect: true,
      valueField: "_id",
      labelField: "name",
      searchField: "name"
    };
  }
});

Template.esSelectize.events({
  'keyup input': function() {
    var selectize = Template.instance().selectize.get();
    var name = Template.instance().data.name;
    Session.set('search' + name , selectize.lastQuery);
  }
});
