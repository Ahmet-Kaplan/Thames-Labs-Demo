function displayFilter(search, selectize) {
  var filter = {
    regexp: /assignee:/i,
    display: 'Assignee: '
  }
  var filtersArray = [filter];
  _.each(filtersArray, function(filter) {
    if(filter.regexp.test(search)) {
      var users = Meteor.users.find({}).fetch();
      _.each(users, function(user) {
        selectize.addOption({_id: user._id, name: filter.display + user.profile.name});
      });
      
      selectize.refreshOptions(true);
    }
  })
}

function applyFilter(text, value, selectize) {
  var filter = {
    regexp: /assignee:/i,
    display: 'Assignee: '
  }
  if(text.search(filter.display) !== -1) {
    console.log('applying filter')
    TasksIndex.getComponentMethods().addProps('assigneeId', value);
    return true;
  }
  return false;
}

Template.searchBox.onRendered(function() {
  var searchInputs = [];

  $('#searchBox').selectize({
    placeholder: 'Search...',
    valueField: '_id',
    labelField: 'name',
    searchField: ['name'],
    openOnFocus: false,
    hideSelected: true,
    highlight: false,
    closeAfterSelect: true,
    allowEmptyOption: true,
    create: true,
    delimiter: ',',
    persist: false,
    onType: function(search) {
      displayFilter(search, this);
      TasksIndex.getComponentMethods().search(search);
    },
    onItemAdd: function(value, $item) {
      var text = $item.text();
      console.log(text)
      if(!applyFilter(text, value, this) && searchInputs.indexOf(value) === -1) {
        searchInputs.push(value);
        TasksIndex.getComponentMethods().addProps('searchInputs', searchInputs.join('+'));
      }
      TasksIndex.getComponentMethods().search('');
    },
    onItemRemove: function(value) {
      searchInputs.splice(searchInputs.indexOf(value), 1);
      TasksIndex.getComponentMethods().addProps('searchInputs', searchInputs.join('+'));
      TasksIndex.getComponentMethods().search('');
    }
  });
});
