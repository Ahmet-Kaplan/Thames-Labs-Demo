Template.tagInput.onRendered(function() {
  var collectionName = this.data.collection,
      entityId = this.data.entityId,
      self = this;

  this.$('.tag-input').selectize({
    placeholder: 'Click here to add a tag ...',
    valueField: 'name',
    labelField: 'name',
    searchField: ['name'],
    create: function(input, cb) {
      Collections[collectionName].addTag(input, {
        _id: entityId
      });

      var tag = Meteor.tags.findOne({
        collection: collectionName,
        name: input
      });

      if (cb) {
        cb(tag);
      }
      console.log(tag, input, collectionName);
      return tag;
    },
    options: Meteor.tags.find({
      collection: collectionName,
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
      var tagInput = this,
          permissionToEdit = self.data.permissionToEdit;
      self.autorun(function() {
        var userId = Meteor.userId();
        if (permissionToEdit && !Roles.userIsInRole(userId, ['Administrator', permissionToEdit])) {
          tagInput.lock();
        } else {
          tagInput.unlock();
        }
      });
    }
  });
});

Template.tagInput.events({
  'click .editTags': function() {
    $('#tagsBadges_' + this.entityId).toggle()
    $('#tag-list-display-' + this.entityId).toggle()
    if($('#tag-list-display-' + this.entityId).is(':visible')){
      $('#tag-list-display-' + this.entityId + ' input').focus();
    }
  },
  'blur .selectize-input': function() {
    $('#tagsBadges_' + this.entityId).show()
    $('#tag-list-display-' + this.entityId).hide()
  }
})