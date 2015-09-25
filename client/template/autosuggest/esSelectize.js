var optionsList = new ReactiveVar({});

function getOptions(index, search) {
  EasySearch.search('autosuggestCompany', '', function(err, data) {
    if(err) {
      toastr.error('Unable to retrieve list of companies');
      return false;
    }
    optionsList.set(data.results);
    return true;
  });
}

Template.esSelectize.onRendered(function() {
    getOptions();
})

Template.esSelectize.helpers({
  getCompanies: function() {
    console.log('options, ', optionsList.get());
    return {
      options: optionsList.get(),
      create: false,
      closeAfterSelect: true,
      valueField: "_id",
      labelField: "name",
      searchField: "name"
    }
  }
});
