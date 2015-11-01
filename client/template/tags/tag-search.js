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
  // Get initial tag suggestions
  this.updateTags('');

  this.addTagToProps = (tag) => {
    var searchOptions = this.index.getComponentDict().get('searchOptions');
    var tags = searchOptions.props && searchOptions.props.tags ? searchOptions.props.tags : '';
    tags = tags.split(',');
    tags.push(tag);
    tags = tags.join(',');
    this.index.getComponentMethods().addProps('tags', tags);
  }

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
      this.addTagToProps(value);
    },
    onItemRemove: (value) => {
      this.index.getComponentMethods().removeProps('tags');
    },
    onChange: (value) => {
      console.log(value);
    }
  });

  // Store handle to selectize
  this.selectize = this.$('.tag-input')[0].selectize;

  // Update selectize options whenever this.tags is updated
  this.autorun( () => {
    var newTags = this.tags.get()
    this.selectize.addOption(newTags);
    this.selectize.refreshOptions(false);
  });

  // Update selectize items when index props are updated
  this.autorun( () => {
    var searchOptions = this.index.getComponentDict().get('searchOptions');
    //this.selectize.clear();
    if (searchOptions.props && searchOptions.props.tags) {
      _.each(searchOptions.props.tags.split(','), (tag) => {
        console.log(tag);
        //this.selectize.addItem(tag);
      });
    }
  });
});
