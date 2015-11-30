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
        return user.profile.watchlist;
      }
    }
  }
});

Template.watchedEntityEntry.onRendered(function() {
  switch (this.data.collection) {
    case "companies":
      Meteor.subscribe("companyById", this.data.id);
      Meteor.subscribe("activityByCompanyId", this.data.id);
  }
});

Template.activityEntryDisplay.helpers({
  user: function() {
    var user = Meteor.users.findOne({
      _id: this.createdBy
    });
    if (user) return user.profile.name;
  },
  timestamp: function() {
    return moment(this.createdAt).fromNow();
  },
  notes: function() {
    return UniHTML.purify(this.notes);
  }
});

Template.watchedEntityEntry.helpers({
  icon: function() {
    switch (this.collection) {
      case "companies":
        return "<i class='fa fa-fw fa-building'></i>";
    }
  },
  name: function() {
    var entity = Collections[this.collection].findOne({
      _id: this.id
    });

    if (!entity) return;

    if (entity.name) return entity.name;
    if (entity.forename) return entity.forename + " " + entity.surname;
    if (entity.description) return entity.description;
    if (entity.title) return entity.title;
  },
  routeName: function() {
    switch (this.collection) {
      case "companies":
        return "company";
    }
  },
  activities: function() {
    return Activities.find({
      companyId: this.id
    }, {
      sort: {
        createdAt: -1
      }
    }).fetch();
  }
});
