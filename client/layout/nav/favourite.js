Template.favourite.events({
  'click #mnuRemoveFavourite': function() {

    var profile = Meteor.users.findOne(Meteor.userId()).profile;

    var favList = profile.favourites;
    var index;

    for (i = 0; i < favList.length; i++) {
      if(favList[i].url===this.url){
        index = i;
        break;
      }
    }

    if (index > -1) {
      favList.splice(index, 1);
      profile.favourites = favList;
    }

    Meteor.users.update(Meteor.userId(), {
      $set: {
        profile: profile
      }
    });
  }
})
