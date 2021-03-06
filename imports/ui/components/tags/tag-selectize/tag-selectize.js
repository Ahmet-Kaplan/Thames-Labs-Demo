import $ from 'jquery';
import { Template } from 'meteor/templating';

import './tag-selectize.html';

Template.tagSelectize.onRendered(function() {
  const collectionName = this.data.collection,
        entityId = this.data.entityId,
        self = this;

  // Subscribe to existing tags for autosuggest
  this.subscribe('tagsByCollection', collectionName);

  // Initialise selectize
  $('.tag-input').selectize({
    placeholder: 'Add tags ...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Collections[collectionName].addTag(input, {
        _id: entityId
      });

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
      Collections[collectionName].addTag(value, {
        _id: entityId
      });
    },
    onItemRemove: function(value) {
      Collections[collectionName].removeTag(value, {
        _id: entityId
      });
    },
    onInitialize: function() {
      // N.B. self refers to Template.tagInput
      const tagInput = this,
            permissionToEdit = self.data.permissionToEdit;
      tagInput.focus();

      self.autorun(function() {
        const userId = Meteor.userId();
        if (permissionToEdit && !Roles.userIsInRole(userId, [permissionToEdit])) {
          tagInput.lock();
        } else {
          tagInput.unlock();
        }
      });
    }
  });

  // Store handle to selectize
  this.selectize = this.$('.tag-input')[0].selectize;

  // Update tag suggestion based on subscription
  this.autorun(() => {
    const existingTags = Meteor.tags.find({
      collection: collectionName,
    }).fetch();
    this.selectize.addOption(existingTags);
    this.selectize.refreshOptions(true);
  });

});

Template.tagSelectize.onDestroyed(function() {
  this.selectize.destroy();
});