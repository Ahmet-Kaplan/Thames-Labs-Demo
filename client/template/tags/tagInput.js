Template.tagInput.rendered = function () {
  var that = this;
  this.$('.tag-input').selectize({
    placeholder: 'Click here to add a tag ...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Companies.addTag(input, {_id: that.data._id});
      var tag =  Meteor.tags.findOne({collection: 'companies', name: input});

      if (cb) {
        cb(tag);
      }

      return tag;
    },
    options: Meteor.tags.find({collection: 'companies'}).fetch(),
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
      Companies.addTag(value, {_id: that.data._id});
    },
    onItemRemove: function(value) {
      Companies.removeTag(value, {_id: that.data._id});
    }
  });
};
