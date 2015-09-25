function searchOptions(index, search, optionsList, filter) {
  if(index === undefined) {
    //No search index set up
    return false;
  }

  if(filter) {
    console.log('filter in search:',  filter);
    EasySearch.changeProperty(index, 'filterCompanyId', filter)
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
  var index = Template.instance().data.index;
  searchOptions(index, '', Template.instance().optionsList);

  this.autorun(function() {
    var optionsList = Template.instance().optionsList.get();
    var selectizer = Template.instance().data.name;
    var selectize = $('#' + selectizer)[0].selectize;
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
    var index = Template.instance().data.index,
        filter = Template.instance().data.filter,
        optionsList = Template.instance().optionsList,
        selectize = Template.instance().selectize.get(),
        search = selectize.lastQuery;
    searchOptions(index, search, optionsList, filter);
  }
});
