import './favourite-item.js';
import './favourites.less';
import './favourites.html';

Template.favourites.onCreated(function() {
  this.isFavouritesShown = new ReactiveVar(false);
});

Template.favourites.helpers({
  favourites: function() {
    var ux = Meteor.users.findOne(Meteor.userId());

    if (ux) {
      var profile = ux.profile;
      if (!profile.favourites) {
        return null;
      }
      return profile.favourites;
    }
  },
  isFavouritesShown: function() {
    return Template.instance().isFavouritesShown.get();
  }
});

Template.favourites.events({
  'click #favourites': function() {
    Template.instance().isFavouritesShown.set(!Template.instance().isFavouritesShown.get());
  },
  'click #add-to-favourites': function() {
    var profile = Meteor.users.findOne(Meteor.userId()).profile;

    if (profile.favourites) {
      var favList = profile.favourites;
      var exists = false;

      _.each(favList, function(y) {
        if (y.url === FlowRouter.current().path) {
          exists = true;
        }
      });

      if (exists) {
        toastr.info('Page already favourited.');
        return;
      }
      const x = {
        name: document.title,
        url: FlowRouter.current().path
      };
      favList.push(x);
      profile.favourites = favList;
    } else {
      var fav = [];
      const x = {
        name: document.title,
        url: FlowRouter.current().path
      };
      fav.push(x);
      profile.favourites = fav;
    }

    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: profile
      }
    });
  }
});