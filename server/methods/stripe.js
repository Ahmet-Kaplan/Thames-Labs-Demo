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
    }, Meteor.bindEnvironment(function(err, subscription) {
      if(err) {
        throw new Meteor.Error('Error', err);
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
  },

  cancelStripeSubscription: function(tenantId) {
    var theTenant = Tenants.findOne({_id: tenantId});
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var stripeConfirmation = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripeId === undefined || theTenant.stripeSubs === undefined) {
      throw new Meteor.Error(400, 'It appears you are not subscribed.');
    }

    Stripe.customers.cancelSubscription(theTenant.stripeId, theTenant.stripeSubs,
      Meteor.bindEnvironment(function(err, confirmation) {
        if(err) {
          throw new Meteor.Error('Error', err);
        }

        Tenants.update(tenantId, {
          $unset: {
            stripeSubs: ''
          },
          $set: {
            paying: false
          }
        });
        stripeConfirmation.return(confirmation);
    }));

    return stripeConfirmation.wait();
  },

  getStripeCardDetails: function(stripeId) {
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var stripeCardDetails = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may access this data.');
    }

    Stripe.customers.retrieve(stripeId, function(err, customer) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      if(customer.default_source) {
        Stripe.customers.retrieveCard(stripeId, customer.default_source, function(err, card) {
          if(err) {
            throw new Meteor.Error('Error', err);
          }

          stripeCardDetails.return(card);
        });
      }
    });

    return stripeCardDetails.wait();
  },

  updateStripeCard: function(oldCardId, token) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var newStripeCard = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may update Card Details.');
    } else if (!stripeId) {
      throw new Meteor.Error('Missing user', 'It appears you do not have an account.');
    }

    Stripe.customers.update(stripeId, {source: token}, function(err, customer) {
      if(err) {
        throw new Meteor.Error('Card', 'Unable to add new card');
      }
      newStripeCard.return(customer);
    });

    return newStripeCard.wait();
  }

});
