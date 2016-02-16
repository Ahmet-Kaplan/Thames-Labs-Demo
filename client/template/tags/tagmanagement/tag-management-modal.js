Template.tagManagementModal.onCreated(function() {
	this.collectionName = this.data.collectionName;
});

Template.tagManagementModal.onRendered(function() {
	var collectionName = this.collectionName;
	var index = Collections[this.collectionName].index,
		searchDefinition = index.getComponentDict().get('searchDefinition'),
		searchOptions = index.getComponentDict().get('searchOptions');

	// Subscribe to existing tags for autosuggest
	this.subscribe('tagsByCollection', collectionName);

	// Initialise selectize
	this.$('#tag-input').selectize({
		plugins: ['remove_button'],
		placeholder: 'Select a tag...',
		valueField: 'name',
		labelField: 'name',
		searchField: ['name'],
		create: function(input, cb) {
			Meteor.call('tag.addTagToResults', collectionName, searchDefinition, searchOptions, input);

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
			Meteor.call('tag.addTagToResults', collectionName, searchDefinition, searchOptions, value);
		},
		onDelete: function(values) {
			var res = confirm('Are you sure you wish to remove the selected tag?');
			if (res) {
				Meteor.call('tag.removeTagFromResults', collectionName, searchDefinition, searchOptions, values);
				return true;
			}
			return false;
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
});

Template.tagManagementModal.helpers({
	tags: function() {
		var index = Collections[this.collectionName].index,
			searchDefinition = index.getComponentDict().get('searchDefinition'),
			searchOptions = index.getComponentDict().get('searchOptions');
		var tags = [];
		var result = index.search(searchDefinition, searchOptions).fetch();
		_.each(result, function(r) {
			_.each(r.tags, function(t) {
				tags.push(t);
			})
		})
		return _.uniq(tags);
	}
});