import { Mongo } from 'meteor/mongo';
import { EventLogSchema } from './schema.js';

export const EventLog = new Mongo.Collection('eventlog');

EventLog.attachSchema(EventLogSchema);

EventLog.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

// SEARCH INDICES //
EventLog.index = new EasySearch.Index({
  collection: EventLog,
  fields: ['message', 'level'],
  permission: function(options) {
    const userId = options.userId;
    return Roles.userIsInRole(userId, ['CanReadEventLog', 'superadmin']);
  },
  engine: new EasySearch.MongoDB({
    sort: () => ({
      'date': -1
    }),
    fields: (searchObject, options) => {
      if (options.search.props.export) {
        return {};
      }
      if (options.search.props.autosuggest) {
        return {
          'message': 1
        };
      }
      return {
        'date': 1,
        'source': 1,
        'level': 1,
        'message': 1,
        'user': 1,
        'entityType': 1,
        'entityId': 1,
        'tenant': 1,
        'group': 1
      };
    },
    selector: function(searchObject, options, aggregation) {
      const selector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      const userId = options.search.userId;

      if (userId) {
        if (!Roles.userIsInRole(userId, ['superadmin'])) {
          var user = Meteor.users.findOne({
            _id: userId
          });
          if (user) {
            selector.group = user.group;
            selector.entityType = {
              $nin: ['tenant']
            };
          }
        } else if (Roles.userIsInRole(userId, ['superadmin'])) {
          selector.source = "server";
        }
      } else {
        throw new Meteor.Error('No user id');
      }

      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }
      return selector;
    }
  })
});
