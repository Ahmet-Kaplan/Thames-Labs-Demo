Template.tagManagementModal.onCreated(function() {
	this.collectionName = this.data.collectionName;
	this.results = null;
});

Template.tagManagementModal.onRendered(function() {
	var self = this;
	var collectionName = this.collectionName;
	var index = Collections[this.collectionName].index,
		searchDefinition = index.getComponentDict().get('searchDefinition'),
		searchOptions = index.getComponentDict().get('searchOptions');

	this.results = index.search(searchDefinition, searchOptions).fetch();


	// Subscribe to existing tags for autosuggest
	this.subscribe('tagsByCollection', collectionName);

	// Initialise selectize
	this.$('#tag-input').selectize({
		placeholder: '...add a new tag...',
		valueField: 'name',
		labelField: 'name',
		searchField: ['name'],
		create: function(input, cb) {
			Meteor.call('tag.addTagToResults', searchDefinition, searchOptions, input);

			var tag = Meteor.tags.findOne({
				collection: collectionName,
				name: input
			});

			if (cb) {
				cb(tag);
			}
			return tag;
		},
		// options is empty initially but reactively updated based on tags subscription
		options: [],
		render: {
			item: function(item, escape) {
				return '<div>' +
					(item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
					'</div>';
			},
			option: function(item, escape) {
				var name = item.name;
				var caption = item.nRefs;
				return '<div>' +
					'<span class="name">' + escape(name) + '</span>&nbsp;' +
					(caption ? '<span class="badge">' + escape(caption) + '</span>' : '') +
					'</div>';
			}
		},
		onItemAdd: function(value, $item) {
			Meteor.call('tag.addTagToResults', searchDefinition, searchOptions, input);
		}
	});
	this.selectize = this.$('#tag-input')[0].selectize;

	this.autorun(() => {
		var existingTags = Meteor.tags.find({
			collection: collectionName,
		}).fetch();
		this.selectize.addOption(existingTags);
		this.selectize.refreshOptions(true);
	});
})

Template.tagManagementModal.helpers({
	currentResults: function() {
		var index = Collections[this.collectionName].index,
			searchDefinition = index.getComponentDict().get('searchDefinition'),
			searchOptions = index.getComponentDict().get('searchOptions');

		var result = index.search(searchDefinition, searchOptions).fetch();
		return result;
	}
});