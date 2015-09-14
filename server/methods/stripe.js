//set STRIPE_PK=pk_test_W7Cx4LDFStOIaJ2g5DufAIaE
//set STRIPE_SK=sk_test_CEgjj8xNKSrQMUrqC4puiHxA

var Future = Npm.require('fibers/future');
if(!process.env.STRIPE_PK || !process.env.STRIPE_SK) {
  throw new Meteor.Error(404, 'Stripe Key missing');
}
var Stripe = StripeAPI(process.env.STRIPE_SK);

Meteor.methods({
  getStripePK: function() {
    return process.env.STRIPE_PK;
  },
  createStripeCustomer: function(token, userEmail) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var coupon = theTenant.coupon;
    var numberUsers = Meteor.users.find({group: tenantId}).count();
    var status = new Future();

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripeId) {
      throw new Meteor.Error('Existing user', 'It appears you already have an account.');
    }

    var customerParameters = {
      description: theTenant.name,
      source: token,
      plan: "premier",
      quantity: numberUsers,
      metadata: {
        tenantId: tenantId,
        createdBy: this.userId
      }
    };

    if(coupon) {
      customerParameters.coupon = coupon;
    }

    if(userEmail) {
      customerParameters.email = userEmail;
    }

    Stripe.customers.create(customerParameters, Meteor.bindEnvironment(function(err, customer) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      Tenants.update(tenantId, {
        $set: {
          stripeId: customer.id,
          stripeSubs: customer.subscriptions.data[0].id,
          paying: true,
          blocked: false
        }
      });

      status.return(true);
    }));

    return status.wait();
  },

  createStripeSubscription: function( superadminTenantId) {
    /*superadminTenantId is used when the method is called by the superadmin
    In which case the tenantId cannot be retrieved via Partitioner */
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
    var coupon = theTenant.coupon;
    var stripeSubscription = new Future();
    var numberUsers = Meteor.users.find({group: tenantId}).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!Roles.userIsInRole(this.userId, ['superadmin']) && theTenant.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subsribed.');
    }

    var subsParameters = {
      plan: "premier",
      quantity: numberUsers
    };

    if(coupon) {
      // parameters.coupon = coupon;
    }

    Stripe.customers.createSubscription(stripeId, subsParameters, Meteor.bindEnvironment(function(err, subscription) {
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

  updateStripeQuantity: function(superadminTenantId) {
    /*superadminTenantId is used when the method is called by the superadmin
    In which case the tenantId cannot be retrieved via Partitioner */
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    if(theTenant.paying === false) {
      return true;
    }

    var stripeId = theTenant.stripeId;
    var stripeSubs = theTenant.stripeSubs;
    var numberUsers = Meteor.users.find({group: tenantId}).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may add or remove users.');
    } else if (!stripeId) {
      throw new Meteor.Error('Missing subscription', 'It appears you do not have an account.');
    }

    Stripe.customers.updateSubscription(stripeId, stripeSubs,{
      quantity: numberUsers,
      prorate: true
    }, function(err, subscription) {
      if(err) {
        Meteor.call('sendErrorEmail', theTenant.name, tenantId , err);
        throw new Meteor.Error('Error', err);
      }
    });
  },

  cancelStripeSubscription: function(superadminTenantId) {
    /*superadminTenantId is used when the method is called by the superadmin
    In which case the tenantId cannot be retrieved via Partitioner */
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeConfirmation = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripeId === undefined || theTenant.stripeSubs === undefined) {
      throw new Meteor.Error(400, 'It appears you are not subscribed.');
    }

    // Stripe.customers.cancelSubscription(theTenant.stripeId, theTenant.stripeSubs,
    Stripe.customers.updateSubscription(theTenant.stripeId, theTenant.stripeSubs,{
      quantity: 0
    }, Meteor.bindEnvironment(function(err, confirmation) {
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
        /*Meteor.call('getStripeCardDetails', function(err, card) {
          if(err) {
            LogServerEvent('error', 'Unable to get card for deletion for ' + theTenant.name + ' (' + theTenant.id + ')');
          } else {
            Stripe.customers.deleteCard(theTenant.stripeId, card.id, function(err, response) {
              if(err) {
              LogServerEvent('error', 'Unable to delete card for ' + theTenant.name + ' (' + theTenant.id + ')');
              }
            });
          }
        });*/
        stripeConfirmation.return(confirmation);
    }));

    return stripeConfirmation.wait();
  },

  getStripeCardDetails: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
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

  getStripePlan: function(planId) {
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
  },

  getStripeUpcomingInvoice: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
    var upcomingInvoice = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }
    Stripe.invoices.retrieveUpcoming(stripeId, function(err, upcoming) {
      if(err) {
        throw new Meteor.Error(400, err);
      }

      upcomingInvoice.return(upcoming);
    });

    return upcomingInvoice.wait();
  },

  getStripeLastInvoice: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripeId;
    var lastInvoice = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    Stripe.invoices.list({
      customer: stripeId,
      limit: 1
    }, function(err, invoiceArray) {
      if(err) {
        throw new Meteor.Error(404, err);
      }

      lastInvoice.return(invoiceArray.data[0]);
    });

    return lastInvoice.wait();
  },

  getStripeCoupon: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var coupon = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    Stripe.coupons.retrieve(theTenant.coupon, function(err, result) {
      if(!err) {
        coupon.return(result);
      }
    });

    return coupon.wait();
  }
});
