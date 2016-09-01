Template.watchlistAdmin.onCreated(function() {
  this.watchState = new ReactiveVar(false);
  const self = this;
  this.autorun(function() {
    const entityId = self.data.entityData._id;

    const user = Meteor.users.findOne({
      _id: Meteor.userId()
    });
    if (user) {
      if (user.profile.watchlist) {
        let found = false;
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
    // return (Template.instance().watchState.get() === true ? "Watched" : "Not watched");
    return (Template.instance().watchState.get() === true ? "<i class='fa fa-fw fa-star'></i>" : "<i class='fa fa-fw fa-star-o'></i>");
  }
});

Template.watchlistAdmin.events({
  "click #watchlist-control": function(event, template) {

    const watched = template.watchState.get();
    const entityId = template.data.entityData._id;
    const collectionName = template.data.collection;

    if (watched) {
      unwatch(entityId);
    } else {
      watch(entityId, collectionName);
    }
  }
});

watch = function(entityId, collectionName) {
  const watchedItem = {
    id: entityId,
    collection: collectionName
  };

  const user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  const watchlist = user.profile.watchlist;

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
  const user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  const watchlist = user.profile.watchlist;
  for (let i = 0; i < watchlist.length; i++) {
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
