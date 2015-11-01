Template.tagSearch.onRendered(function() {

  this.collectionName = this.data.collection;
  this.index = Collections[this.collectionName].index;

  // Function to update tags from easysearch
  this.updateOptions = (query) => {
    Meteor.call(
      'searchByCollection',
      'tags',
      query,
      {
        props: {
          autosuggest: true,
          collection: this.collectionName
        }
      },
      (err, res) => {
        if (err) return;
        this.selectize.addOption(res);
        this.selectize.refreshOptions(false);
      });
  }

  // Get initial tag suggestions
  this.updateOptions('');

  // Initialise selectize
  this.$('.tag-input').selectize({
    placeholder: 'Filter results by tag...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    load: (query) => {
      this.updateOptions(query);
    },
    onChange: (value) => {
      console.log('selectize value set to:', value);
      if (!value) return this.index.getComponentMethods().removeProps('tags');
      this.index.getComponentMethods().addProps('tags', value.join(','));
    }
  });

  // Store handle to selectize
  this.selectize = this.$('.tag-input')[0].selectize;

  // Update selectize items when index props are updated
  this.autorun( () => {
    var searchOptions = this.index.getComponentDict().get('searchOptions');
    console.log("new searchOptions:", searchOptions);
    this.selectize.clear(true);
    if (searchOptions.props && searchOptions.props.tags) {
      this.selectize.setValue(searchOptions.props.tags.split(','), true);
    }
  });
});
