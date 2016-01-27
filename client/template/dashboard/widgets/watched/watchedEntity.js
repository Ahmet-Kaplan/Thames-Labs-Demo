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

          if (data.collection === "companies" && data.primaryEntityType === "contacts") {
            Meteor.subscribe("activityByContactId", data.id);

          }

          if (data.collection === "companies") {
            Meteor.subscribe("activityByCompanyId", data.id);

            Activities.find({
              companyId: data.id
            }).map(function(activityRecord) {
              if (activityRecord.primaryEntityType === "contacts") {
                // Meteor.subscribe("companyById", activityRecord.companyId);
                // var companyData = Companies.findOne({
                //   _id: activityRecord.companyId
                // });

                activityRecord.linkPath = "contact";
                // activityRecord.parentCompany = (companyData ? companyData.name : null);
                activityRecord.faIcon = "user";
                activityRecord.userName = Meteor.users.findOne({
                  _id: activityRecord.createdBy
                }).profile.name;
                actArray.push(activityRecord);
              } else {
                activityRecord.linkPath = "company";
                activityRecord.faIcon = "building";
                activityRecord.userName = Meteor.users.findOne({
                  _id: activityRecord.createdBy
                }).profile.name;
                actArray.push(activityRecord);
              }
            });
          }

          if (data.collection === "contacts") {
            Meteor.subscribe("activityByContactId", data.id);

            Activities.find({
              contactId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "contact";
              activityRecord.faIcon = "user";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

          if (data.collection === "opportunities") {
            Meteor.subscribe("activityByOpportunityId", data.id);

            Activities.find({
              opportunityId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "opportunity";
              activityRecord.faIcon = "lightbulb-o";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

          if (data.collection === "projects") {
            Meteor.subscribe("activityByProjectId", data.id);

            Activities.find({
              projectId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "project";
              activityRecord.faIcon = "sitemap";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

          if (data.collection === "tasks") {
            Meteor.subscribe("activityByTaskId", data.id);

            Activities.find({
              taskId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "task";
              activityRecord.faIcon = "check";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

          if (data.collection === "purchaseorders") {
            Meteor.subscribe("activityByPurchaseOrderId", data.id);

            Activities.find({
              purchaseOrderId: data.id
            }).map(function(activityRecord) {
              activityRecord.linkPath = "purchaseOrder";
              activityRecord.faIcon = "shopping-cart";
              activityRecord.userName = Meteor.users.findOne({
                _id: activityRecord.createdBy
              }).profile.name;
              actArray.push(activityRecord);
            });
          }

        });
        //each

        return actArray.sort(function(x, y) {
          if (x.activityTimestamp < y.activityTimestamp) return 1;
          if (x.activityTimestamp > y.activityTimestamp) return -1;
          return 0;
        }).slice(0, 10);
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

  fromNow: function(date) {
    if (date) {
      return moment(date).fromNow();
    }
  }
});