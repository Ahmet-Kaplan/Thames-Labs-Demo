Template.watchlistAdmin.onCreated(function() {
  this.isWatched = new ReactiveVar(false);
  var self = this;
  this.autorun(function() {
    this.isWatched = isWatching(self.data.entityData._id);
    console.log(this.isWatched);
  });
});

Template.watchlistAdmin.helpers({
  controlData: function() {
    if (Template.instance().isWatched.get()) {
      return "<i class='text-warning fa fa-fw fa-star'></i> Unwatch";
    }
    return "<i class='fa fa-fw fa-star-o'></i> Watch";
  }
});

Template.watchlistAdmin.events({
  "click #watchlist-control": function(event, template) {
    var entityId = template.data.entityData._id;
    var collectionName = template.data.collection;

    var exists = isWatching(entityId);
    template.isWatched.set(exists);

    if (template.isWatched) {
      unwatch(entityId);
    } else {
      watch(entityId, collectionName);
    }
  }
});

isWatching = function(entityId) {
  var user = Meteor.user();
  var state = false;
  if (user) {
    if (user.profile.watchlist) {
      _.each(user.profile.watchlist, function(watch) {
        if (watch._id === entityId) state = true;
      });
      state = false;
    } else {
      Meteor.users.update({
        _id: user._id
      }, {
        $set: {
          'profile.watchlist': []
        }
      });
      state = false;
    }
  }
  return state;
};

watch = function(entityId, collectionName) {
  var watchedItem = {
    _id: entityId,
    collection: collectionName
  };

  var user = Meteor.user();
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
  var user = Meteor.user();
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
