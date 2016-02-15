Meteor.methods({
	'tag.addTagToResults': function(collectionName, searchDefinition, searchOptions, tag) {
		if (!Collections[collectionName] || !Collections[collectionName].index) {
			throw new Meteor.Error('500', 'Search index not found');
		}
		searchOptions.limit = 99999;
		if (!searchOptions.props) searchOptions.props = {};
		searchOptions.props.export = true;
		var index = Collections[collectionName].index;
		var result = index.search(searchDefinition, searchOptions).fetch();

		_.each(result, function(x) {
			Collections[collectionName].addTag(input, {
				_id: x.__originalId
			});
		});
	}
})