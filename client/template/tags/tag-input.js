Template.tagInput.onRendered(function() {
  var collectionName = this.data.collection,
    entityId = this.data.entityId,
    self = this;

  // Subscribe to existing tags for autosuggest
  this.subscribe('tagsByCollection', collectionName);

  // Initialise selectize
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

  // Store handle to selectize
  this.selectize = this.$('.tag-input')[0].selectize;

  // Update tag suggestion based on subscription
  this.autorun( () => {
    var existingTags = Meteor.tags.find({
      collection: collectionName,
    }).fetch();
    this.selectize.addOption(existingTags);
  });

});

Template.tagInput.helpers({
  hasPermission: function() {
    if (!this.permissionToEdit) return true;
    return Roles.userIsInRole(Meteor.userId(), ['Administrator', this.permissionToEdit]);
  }
})

Template.tagInput.events({
  'click .editTags': function() {
    $('#tagsBadges_' + this.entityId).toggle()
    $('#tag-list-display-' + this.entityId).toggle()
    if ($('#tag-list-display-' + this.entityId).is(':visible')) {
      $('#tag-list-display-' + this.entityId + ' input').focus();
    }
  },
  'keyup .selectize-input>input': function(e) {
    if (e.keyCode === 27) {
      $('.selectize-input').blur();
    }
  },
  'blur .selectize-input': function() {
    $('#tagsBadges_' + this.entityId).show()
    $('#tag-list-display-' + this.entityId).hide()
  }
})
