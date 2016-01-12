Tenants = new Mongo.Collection('tenants');

Tenants.helpers({
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  }
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Tenants.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});

Tenants.after.insert(function(userId, doc) {
  logEvent('info', 'A new tenant has been created: ' + doc.name);

  var defaultStages = [{
    title: "Exploration",
    description: "Exploring whether there is a need that your product or service can fulfill",
    id: 0
  }, {
    title: "Fact finding",
    description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
    id: 1
  }, {
    title: "Solution",
    description: "Preparing your solution based on what you know from your fact finding",
    id: 2
  }, {
    title: "Negotiation",
    description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
    id: 3
  }, {
    title: "Objections",
    description: "Dealing with any objections to the negotiated solution in order to win the business",
    id: 4
  }];

  Tenants.update({
    _id: doc._id
  }, {
    $set: {
      "settings.opportunity.stages": defaultStages
    }
  });

  var sample = [];
  var projectType = {
    id: 0,
    name: "Standard Project",
    milestones: [{
      name: "Inception",
      description: "This is a newly-created project",
      id: 0
    }, {
      name: "Completion",
      description: "This project has been completed",
      id: 1
    }]
  };
  sample.push(projectType);

  Tenants.update(doc._id, {
    $set: {
      "settings.project.types": sample
    }
  });
});

Tenants.after.update(function(userId, doc, fieldNames, modifier, options) {
  if (doc.name !== this.previous.name) {
    logEvent('info', 'An existing tenant has been updated: The value of "name" was changed from ' + this.previous.name + " to " + doc.name);
  }
  var prevdoc = this.previous;
  var key;
  for (key in doc.settings) {
    if (doc.settings.hasOwnProperty(key)) {
      if (doc.settings[key] !== prevdoc.settings[key]) {
        logEvent('info', 'An existing tenant has been updated: The value of tenant setting "' + key + '" was changed from ' + prevdoc.settings[key] + " to " + doc.settings[key]);
      }
    }
  }
});

Tenants.after.remove(function(userId, doc) {
  logEvent('info', 'A tenant has been deleted: ' + doc.name);
});
