import { Template } from 'meteor/templating';
import $ from 'jquery';
import _ from 'lodash';

import './tag-management-modal.css';
import './tag-management-modal.html';

Template.tagManagementModal.onCreated(function() {
  this.collectionName = this.data.collectionName;
  this.addMode = new ReactiveVar(true);
});

Template.tagManagementModal.onRendered(function() {
  $('#mode-toggle').bootstrapToggle({
    on: 'Add',
    off: 'Remove',
    size: 'mini',
    onstyle: 'primary',
    offstyle: 'danger'
  });

  const self = this;

  const collectionName = this.collectionName;
  const index = Collections[collectionName].index,
        searchDefinition = index.getComponentDict().get('searchDefinition'),
        searchOptions = index.getComponentDict().get('searchOptions');

  // Subscribe to existing tags for autosuggest
  this.subscribe('tagsByCollection', collectionName);

  // Initialise selectize
  this.$('#tag-input').selectize({
    placeholder: 'Select a tag...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Meteor.call('tag.addTagToResults', collectionName, searchDefinition, searchOptions, input);

      const tag = Meteor.tags.findOne({
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
        return `<div>${ item.name ? `<span class="name">${escape(item.name)}</span>` : '' }</div>`;
      },
      option: function(item, escape) {
        const name = item.name;
        const caption = item.nRefs;
        return `<div><span class="name">${escape(name)}</span>&nbsp; ${(caption ? `<span class="badge">${escape(caption)}</span>` : '')}</div>`;
      }
    },
    onItemAdd: function(value, $item) {
      Meteor.call('tag.addTagToResults', collectionName, searchDefinition, searchOptions, value);
    },
    onDelete: function(values) {
      if (self.addMode.get() === true) {
        return false;
      }

      Meteor.call('tag.removeTagFromResults', collectionName, searchDefinition, searchOptions, values[0]);
    }
  });

  this.selectize = this.$('#tag-input')[0].selectize;

  this.autorun(() => {
    const existingTags = Meteor.tags.find({
      collection: collectionName
    }).fetch();
    this.selectize.addOption(existingTags);
    this.selectize.refreshOptions(true);
  });
});

Template.tagManagementModal.events({
  'change #mode-toggle': function(event, template) {
    const state = template.addMode.get();
    template.addMode.set(!state);
  }
});

Template.tagManagementModal.helpers({
  resultsCount: function() {
    return this.recordCount;
  },
  showWarning: function() {
    const state = Template.instance().addMode.get();
    return !state;
  },
  tags: function() {
    const index = Collections[this.collectionName].index,
          searchDefinition = index.getComponentDict().get('searchDefinition'),
          searchOptions = index.getComponentDict().get('searchOptions');
    const tags = [];
    const result = index.search(searchDefinition, searchOptions).fetch();
    _.each(result, function(r) {
      _.each(r.tags, function(t) {
        tags.push(t);
      });
    });
    return _.uniq(tags);
  }
});
