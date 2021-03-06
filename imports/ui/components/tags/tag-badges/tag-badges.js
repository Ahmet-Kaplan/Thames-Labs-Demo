import './tag-badges.css';
import './tag-badge.html';
import './tag-badges.html';

import { Template } from 'meteor/templating';
import _ from 'lodash';

const tagIsInList = (tag, tagList) => _.some(tagList.split(','), (s) => (s === tag));

const toggleTag = (tag, index) => {
  const searchOptions = index.getComponentDict().get('searchOptions');
  let tags = (searchOptions && searchOptions.props && searchOptions.props.tags) ? searchOptions.props.tags : '';

  if (tags !== '' && tagIsInList(tag, tags)) {
    // Remove tag from props or unset if last tag
    if (tags === tag) {
      index.getComponentMethods().removeProps('tags');
    } else {
      tags = tags.split(',');
      tags = _.pull(tags, tag);
      tags = tags.join(',');
      index.getComponentMethods().addProps('tags', tags);
    }
  } else {
    // Add to tags
    if (tags === '') {
      index.getComponentMethods().addProps('tags', tag);
    } else {
      tags = tags.split(',');
      tags.push(tag);
      tags = tags.join(',');
      index.getComponentMethods().addProps('tags', tags);
    }
  }
};

Template.tagBadge.events({
  'click a': function(event) {
    event.preventDefault();
    if (this.index) {
      toggleTag(this.tag, this.index);
    }
  }
});

Template.tagBadge.helpers({
  'selected': function() {
    if (!this.index) return '';
    const searchOptions = this.index.getComponentDict().get('searchOptions');
    if (searchOptions && searchOptions.props && searchOptions.props.tags) {
      return tagIsInList(this.tag, searchOptions.props.tags) ? 'active' : '';
    }
  }
});

Template.tagBadges.helpers({
  sortedTags: function() {
    if (this.tags) {
      this.tags.sort();
    }
    return this.tags;
  }
});
