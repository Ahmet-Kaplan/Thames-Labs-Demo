Template.watchedEntityWidget.onCreated(function() {
  Meteor.subscribe("allUserData");
});

Template.watchedEntityWidget.helpers({
  items: function() {
    var user = Meteor.users.findOne({
      _id: Meteor.userId()
    });

    if (user) {
      if (user.profile.watchlist) {
        var dataKeys = user.profile.watchlist;
        var actArray = [];

        _.each(dataKeys, function(data) {
          if (data.collection === "companies") {
            Meteor.subscribe("activityByCompanyId", data.id);

            Activities.find({
              companyId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "company";
              activityRecord.faIcon = "building";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

        });
        //each

        return actArray.sort(function(x,y){
          if(x.activityTimestamp < y.activityTimestamp) return 1;
          if(x.activityTimestamp > y.activityTimestamp) return -1;
          return 0;
        });
      }
      //watchlist
    }
    // user
  },

  listIcon: function(type) {
    var icons = {
      'note': 'file-text-o',
      'email': 'envelope-o',
      'call': 'phone',
      'Note': 'file-text-o',
      'Email': 'envelope-o',
      'Call': 'phone'
    };
    return icons[type];
  },

  fromNow: function(date){
    if(date){
      return moment(date).fromNow();
    }
  }
});
