var parent;

function searchOptions(index, search, optionsList, filter) {
  if(index === undefined) {
    //No search index set up
    return false;
  }

  if(filter) {
    EasySearch.changeProperty(index, 'filterCompanyId', filter);
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

  if(parent) {
    var parentElt = $('#' + parent);
    Session.set('filter' + name, parentElt.val());
    parentElt.change(function() {
      Session.set('filter' + name, parentElt.val());
    });
  }

  this.autorun(function() {
    var index = Template.instance().data.index;
    var filter = Session.get('filter' + name);
    var search = Session.get('search' + name) || '';
    searchOptions(index, search, Template.instance().optionsList, filter);
  });

  var selectizer = Template.instance().data.name;
  var selectize = $('#' + selectizer)[0].selectize;
  this.autorun(function() {
    var optionsList = Template.instance().optionsList.get();
    Template.instance().selectize.set(selectize);
    if(optionsList) {
      selectize.clearOptions();
      selectize.addOption(optionsList);
      selectize.refreshOptions(false);
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
