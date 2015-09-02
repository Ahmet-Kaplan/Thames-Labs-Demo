var Future = Npm.require('fibers/future');

Meteor.methods({
  stripePublicKey: function() {
    return process.env.STRIPE_PK;
  },
  createStripeCustomer: function(token) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var newStripeId = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripeId) {
      throw new Meteor.Error('Existing user', 'It appears you already have an account.');
    }

    Stripe.customers.create({
      description: theTenant.name,
      source: token,
      metadata: {
        tenantId: tenantId,
        createdBy: this.userId
      }
    }, Meteor.bindEnvironment(function(err, customer) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      Tenants.update(tenantId, {
        $set: {
          stripeId: customer.id
        }
      });
      newStripeId.return(customer.id);
    }));

    return newStripeId.wait();
  },

  createStripeSubscription: function(customerId) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var stripeSubscription = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subsribed.');
    }

    Stripe.customers.createSubscription(customerId, {
      plan: "premier"
    }, Meteor.bindEnvironment(function(error, subscription) {
      if(error) {
        throw new Meteor.Error('Error', error);
      }

      Tenants.update(tenantId, {
        $set: {
          stripeSubs: subscription.id,
          paying: true
        }
      });
      stripeSubscription.return(subscription);
    }));

    return stripeSubscription.wait();
  }

});
