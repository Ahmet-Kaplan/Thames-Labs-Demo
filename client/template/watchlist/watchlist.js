Template.watchlistAdmin.onCreated(function() {
  this.watchState = new ReactiveVar(false);
  var self = this;
  this.autorun(function() {
    var entityId = self.data.entityData._id;

    var user = Meteor.users.findOne({
      _id: Meteor.userId()
    });
    if (user) {
      if (user.profile.watchlist) {
        var found = false;
        _.each(user.profile.watchlist, function(watch) {
          if (watch.id === entityId) {
            found = true;
          }
        });
        self.watchState.set(found);
      }
    }
  });
});

Template.watchlistAdmin.helpers({
  controlData: function() {
    return (Template.instance().watchState.get() === true ? "<i class='fa fa-fw fa-star'></i>" : "<i class='fa fa-fw fa-star-o'></i>");
  }
});

Template.watchlistAdmin.events({
  "click #watchlist-control": function(event, template) {

    var watched = template.watchState.get();
    var entityId = template.data.entityData._id;
    var collectionName = template.data.collection;

    if (watched) {
      unwatch(entityId);
    } else {
      var user = Meteor.user();
      var watchlist = user.profile.watchlist;

      if (!isProTenant(user.group) && watchlist.length === MAX_FREE_WATCHLIST_RECORDS) {
        ShowUpgradeToastr('To watch more than 5 records');
        return;
      }
      watch(entityId, collectionName);
    }
  }
});

watch = function(entityId, collectionName) {
  var watchedItem = {
    id: entityId,
    collection: collectionName
  };

  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  var watchlist = user.profile.watchlist;

  watchlist.push(watchedItem);
  Meteor.users.update({
    _id: user._id
  }, {
    $set: {
      'profile.watchlist': watchlist
    }
  });
};

unwatch = function(entityId) {
  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  var watchlist = user.profile.watchlist;
  for (var i = 0; i < watchlist.length; i++) {
    if (watchlist[i].id == entityId) {
      watchlist.splice(i, 1);
      break;
    }
  }
  Meteor.users.update({
    _id: user._id
  }, {
    $set: {
      'profile.watchlist': watchlist
    }
  });
};
