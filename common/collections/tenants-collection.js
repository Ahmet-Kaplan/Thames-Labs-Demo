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
  if (!doc.settings) doc.settings = tenancyDefaultSettings;
  doc.createdAt = new Date();
});

Tenants.after.insert(function(userId, doc) {
  logEvent('info', 'A new tenant has been created: ' + doc.name);
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
