//set STRIPE_PK=pk_test_W7Cx4LDFStOIaJ2g5DufAIaE
//set STRIPE_SK=sk_test_CEgjj8xNKSrQMUrqC4puiHxA

var Future = Npm.require('fibers/future');

Meteor.methods({
  getStripePK: function() {
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

  createStripeSubscription: function(customerId, adminTenantId) {
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? adminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var stripeSubscription = new Future();
    var numberUsers = Meteor.users.find({group: tenantId}).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!Roles.userIsInRole(this.userId, ['superadmin']) && theTenant.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subsribed.');
    }

    Stripe.customers.createSubscription(customerId, {
      plan: "premier",
      quantity: numberUsers
    }, Meteor.bindEnvironment(function(err, subscription) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      Tenants.update(tenantId, {
        $set: {
          stripeSubs: subscription.id,
          paying: true,
          blocked: false
        }
      });
      stripeSubscription.return(subscription);
    }));

    return stripeSubscription.wait();
  },

  updateStripeQuantity: function(adminTenantId) {
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? adminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
    var stripeSubs = theTenant.stripeSubs;
    var numberUsers = Meteor.users.find({group: tenantId}).count();
    var Stripe = StripeAPI(process.env.STRIPE_SK);

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may add or remove users.');
    } else if (!stripeId) {
      throw new Meteor.Error('Missing subscription', 'It appears you do not have an account.');
    }

    Stripe.customers.updateSubscription(stripeId, stripeSubs,{
      quantity: numberUsers
    }, function(err, subscription) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }
    });
  },

  cancelStripeSubscription: function(adminTenantId) {
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? adminTenantId : Partitioner.getUserGroup(this.userId);
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

  updateStripeCard: function(token) {
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
      newStripeCard.return(customer.sources.data[0]);
    });

    return newStripeCard.wait();
  },

  checkStripeSubscription: function(stripeId, stripeSubs) {
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var isValidSubscription = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to update this.');
    } else if (!stripeId || !stripeSubs) {
      throw new Meteor.Error('Missing info', 'The Stripe user or subscription is missing.');
    }

    Stripe.customers.retrieveSubscription(stripeId, stripeSubs, function(err, subscription) {
      if(err) {
        // throw new Meteor.Error(400, 'Invalid subscription data.');
        isValidSubscription.return(false);
      } else {
        isValidSubscription.return(true);
      }
    });
    return isValidSubscription.wait();
  },

  getStripePlan: function(planId) {
    var Stripe = StripeAPI(process.env.STRIPE_SK);
    var planDetails = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    Stripe.plans.retrieve(planId, function(err, plan) {
      if(err) {
        throw new Meteor.Error(400, err);
      }

      planDetails.return(plan);
    });
    return planDetails.wait();
  }
});
