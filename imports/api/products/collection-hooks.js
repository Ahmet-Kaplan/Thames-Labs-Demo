import { CustomFields, Tenants } from '/imports/api/collections.js';
// COLLECTION HOOKS //
export const ProductHooks = {
  beforeInsert(userId, doc) {
    if (!Roles.userIsInRole(userId, ['superadmin'])) {
      const user = Meteor.users.findOne(userId);
      const tenant = Tenants.findOne(user.group);
      doc.sequencedIdentifier = tenant.settings.product.defaultNumber;
    }
  },
  afterInsert(userId, doc) {
    if (Roles.userIsInRole(userId, ['superadmin'])) return;
    const user = Meteor.users.findOne({
      _id: userId
    });

    if (user) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} created a new product`, 'product', doc._id);
    }

    if (Meteor.isServer) {
      if (user) {
        const tenant = Tenants.findOne({
          _id: user.group
        });
        if (tenant) {
          if (!Roles.userIsInRole(userId, ['superadmin'])) {
            Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'product', function(err, res) {
              if (err) throw new Meteor.Error(err);
              _.each(res, function(ex) {
                CustomFields.insert({
                  name: ex.name,
                  value: (ex.value ? ex.value : ''),
                  defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                  type: ex.type,
                  global: true,
                  order: ex.order,
                  target: 'product',
                  listValues: '',
                  entityId: doc._id
                }, function(err) {
                  if (err) {
                    LogServerEvent(LogLevel.Warning, `An error occurred whilst instanciating the global custom field '${ex.name}': ${err}`, 'product', doc._id);
                  }
                });
              });
            });
          }
        }
      }

      if (doc._groupId) {
        Tenants.update({
          _id: doc._groupId
        }, {
          $inc: {
            'settings.product.defaultNumber': 1
          }
        }, function(err) {
          if (err) {
            LogServerEvent(LogLevel.Error, `An error occurred whilst updating the tenant's RealTime ID product value: ${err}`, 'tenant', doc._groupId);
            return;
          }
        });
      }
    }
  },
  afterUpdate(userId, doc, fieldNames, modifier, options) {
    if (Roles.userIsInRole(userId, ['superadmin'])) return;
    const user = Meteor.users.findOne({
      _id: userId
    });

    if (user) {
      if (doc.description !== this.previous.description) {
        LogClientEvent(LogLevel.Info, `${user.profile.name} updated a company's description`, 'product', doc._id);
      }
      if (doc.name !== this.previous.name) {
        LogClientEvent(LogLevel.Info, `${user.profile.name} updated a company's name`, 'product', doc._id);
      }
      if (doc.cost !== this.previous.cost) {
        LogClientEvent(LogLevel.Info, `${user.profile.name} updated a company's cost`, 'product', doc._id);
      }
      if (doc.price !== this.previous.price) {
        LogClientEvent(LogLevel.Info, `${user.profile.name} updated a company's price`, 'product', doc._id);
      }
    }
  },
  afterRemove(userId, doc) {
    if (Roles.userIsInRole(userId, ['superadmin'])) return;
    if (ServerSession.get('deletingTenant') === true && Roles.userIsInRole(userId, 'superadmin')) {
      return;
    }
    const user = Meteor.users.findOne({
      _id: userId
    });
    if (user) {
      LogClientEvent(LogLevel.Info, `${user.profile.name} deleted product ' ${doc.name}'`, null, null);
    }
  }
};
