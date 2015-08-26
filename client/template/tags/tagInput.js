"use strict";

Template.tagInput.onRendered(function() {

  var entityType = "";
  var routeName = FlowRouter.getRouteName();
  switch (routeName) {
    case "company":
      entityType = "companies";
      break;
    case "contact":
      entityType = "contacts";
      break;
    case "project":
      entityType = "projects";
      break;
    default:
      throw new Meteor.Error("unspecified-tag-route-type", "Could not determine route type for tags");
  }

  var that = this;
  this.$('.tag-input').selectize({
    placeholder: 'Click here to add a tag ...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Collections[entityType].addTag(input, {
        _id: that.data._id
      });

      var tag = Meteor.tags.findOne({
        collection: entityType,
        name: input
      });

      if (cb) {
        cb(tag);
      }

      return tag;
    },
    options: Meteor.tags.find({
      collection: entityType,
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
      Collections[entityType].addTag(value, {
        _id: that.data._id
      });
    },
    onItemRemove: function(value) {
      Collections[entityType].removeTag(value, {
        _id: that.data._id
      });
    }
  });
});
