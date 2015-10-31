Template.tagSearch.onRendered(function() {

  this.collectionName = this.data.collection;
  this.tags = new ReactiveVar([]);
  this.index = Collections[this.collectionName].index;

  // Function to update tags from easysearch
  this.updateTags = (query) => {
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
        this.tags.set(res);
      });
  }
  this.updateTags('');

  // Initialise selectize
  this.$('.tag-input').selectize({
    placeholder: 'Filter results by tag...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    load: (query) => {
      this.updateTags(query);
    },
    onItemAdd: (value, $item) => {
      this.index.getComponentMethods().addProps('tags', value);
    },
    onItemRemove: (value) => {
      this.index.getComponentMethods().removeProps('tags');
    },
  });

  // Store handle to selectize
  this.selectize = this.$('.tag-input')[0].selectize;

  // Update selectize options whenever this.tags is updated
  this.autorun( () => {
    var newTags = this.tags.get()
    //this.selectize.clearOptions();
    this.selectize.addOption(newTags);
    this.selectize.refreshOptions();
  });
});
