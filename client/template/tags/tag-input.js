"use strict";

Template.tagInput.onRendered(function() {
  var that = this;
  this.$('.tag-input').selectize({
    placeholder: 'Click here to add a tag ...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Collections[that.data.type].addTag(input, {
        _id: that.data.doc._id
      });

      var tag = Meteor.tags.findOne({
        collection: that.data.type,
        name: input
      });

      if (cb) {
        cb(tag);
      }

      return tag;
    },
    options: Meteor.tags.find({
      collection: that.data.type,
    }).fetch(),
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
      Collections[that.data.type].addTag(value, {
        _id: that.data.doc._id
      });
    },
    onItemRemove: function(value) {
      Collections[that.data.type].removeTag(value, {
        _id: that.data.doc._id
      });
    }
  });
});
