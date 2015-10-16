var Future = Npm.require('fibers/future');
var Stripe = StripeAPI(process.env.STRIPE_SK);

Meteor.methods({
  getStripePK: function() {
    if (!process.env.STRIPE_PK) {
      throw new Meteor.Error(404, 'Stripe public key missing - please set STRIPE_PK');
    }
    return process.env.STRIPE_PK;
  },

  createStripeCustomer: function(token, userEmail) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var coupon = theTenant.stripe.coupon;
    var numberUsers = Meteor.users.find({group: tenantId}).count();
    var status = new Future();

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (theTenant.stripe.stripeId) {
      throw new Meteor.Error('Existing user', 'It appears you already have an account.');
    }

    var customerParameters = {
      description: theTenant.name,
      source: token,
      plan: "premier",
      quantity: numberUsers,
      tax_percent: 20.0,
      email: userEmail,
      metadata: {
        tenantId: tenantId,
        createdBy: this.userId
      }
    };

    if(coupon) {
      Meteor.call('getStripeCoupon', coupon, function(err, response) {
        if(err || !response) {
          return false;
        } else {
          customerParameters.coupon = coupon;
          return true;
        }
      });
    }

    Stripe.customers.create(customerParameters, Meteor.bindEnvironment(function(err, customer) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      Tenants.update(tenantId, {
        $set: {
          "stripe.stripeId": customer.id,
          "stripe.stripeSubs": customer.subscriptions.data[0].id,
          "stripe.paying": true,
          "stripe.blocked": false
        }
      });

      status.return(true);
    }));

    return status.wait();
  },

  createStripeSubscription: function(superadminTenantId) {
    /*superadminTenantId is used when the method is called by the superadmin
    In which case the tenantId cannot be retrieved via Partitioner */
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
    var stripeSubscription = new Future();
    var numberUsers = Meteor.users.find({group: tenantId}).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!Roles.userIsInRole(this.userId, ['superadmin']) && theTenant.stripe.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subsribed.');
    }

    var subsParameters = {
      plan: "premier",
      quantity: numberUsers,
      tax_percent: 20.0
    };

    Stripe.customers.createSubscription(stripeId, subsParameters, Meteor.bindEnvironment(function(err, subscription) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }

      Tenants.update(tenantId, {
        $set: {
          "stripe.stripeSubs": subscription.id,
          "stripe.paying": true,
          "stripe.blocked": false
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
    if(!theTenant) {
      LogServerEvent('error', 'Unable to update Stripe Quantity for tenant of user ' + superadminUserId + '/tenant ' + tenantId);
      return false;
    }
    if(theTenant.stripe.paying === false || theTenant.stripe.freeUnlimited) {
      return true;
    }

    var stripeId = theTenant.stripe.stripeId;
    var stripeSubs = theTenant.stripe.stripeSubs;
    var numberUsers = Meteor.users.find({group: tenantId}).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may add or remove users.');
    } else if (!stripeId) {
      throw new Meteor.Error('Missing subscription', 'It appears you do not have an account.');
    }

    var subsParameters = {
      quantity: numberUsers
    };

    Stripe.customers.updateSubscription(stripeId, stripeSubs, subsParameters, function(err, subscription) {
      if(err) {
        Meteor.call('sendErrorEmail', theTenant.name, tenantId , err);
        throw new Meteor.Error('Error', err);
      }
    });
  },

  cancelStripeSubscription: function(superadminTenantId) {
    /*superadminTenantId is used when the method is called by the superadmin
    In which case the tenantId cannot be retrieved via Partitioner */
    var userId = this.userId;
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
    var stripeSubs = theTenant.stripe.stripeSubs;
    var stripeConfirmation = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (stripeId === undefined || stripeSubs === undefined) {
      throw new Meteor.Error(400, 'It appears you are not subscribed.');
    }

    Stripe.customers.updateSubscription(stripeId, stripeSubs, {
      quantity: 0
    }, Meteor.bindEnvironment(function(err, subs) {
      if(err) {
        throw new Meteor.Error('Error', err);
      }
      Stripe.customers.cancelSubscription(stripeId, stripeSubs, {at_period_end: true},
        Meteor.bindEnvironment(function(err, confirmation) {
          if(err) {
            throw new Meteor.Error('Error', err);
          }
          Tenants.update(tenantId, {
            $set: {"stripe.paying": false}
          });

          //Send confirmation email if Admin but not superadmin
          if(Roles.userIsInRole(userId, ['Administrator'])) {
            var user = Meteor.users.findOne(userId);
            SSR.compileTemplate('emailText', Assets.getText('email-stripe-cancel-subs.html'));
            Template.emailText.helpers({
              getDoctype: function() {
                return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
              },
              subject: function() {
                return 'Cancellation of your RealTimeCRM Subscription';
              },
              name: function() {
                return user.profile.name;
              }
            });

            var html = '<' + SSR.render("emailText");

            var text = "Dear " + user.profile.name + ",\n\n" +
                       "Your subscription to RealTimeCRM has now been cancelled.\n" +
                       "Would you have any feed back, please give us a call on 01223 802 900, or email us at team@realtimecrm.co.uk.\n\n" +
                       "Yours sincerely,\n" +
                       "The RealtimeCRM Team";

            Email.send({
              to: user.emails[0].address,
              from: 'admin@realtimecrm.co.uk',
              subject: 'Cancellation of your RealTimeCRM Subscription',
              html: html,
              text: text
            });
          }

          stripeConfirmation.return(confirmation);
        })
      );
    }));


    return stripeConfirmation.wait();
  },

  resumeStripeSubscription: function(superadminTenantId) {
    var tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
    var stripeSubs = theTenant.stripe.stripeSubs;
    var numberUsers = Meteor.users.find({group: tenantId}).count();
    var stripeResume = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may resume subscriptions.');
    }

    Stripe.customers.updateSubscription(stripeId, stripeSubs, {
      plan: 'premier',
      quantity: numberUsers
    }, Meteor.bindEnvironment(function(err, subs) {
      if(err) {
        throw new Meteor.Error('Unable to resume subscription', err);
      }

      Tenants.update(tenantId, {
        $set: {
          "stripe.paying": true,
          "stripe.blocked": false
        }
      });

      stripeResume.return(subs);
    }));

    return stripeResume.wait();
  },

  getStripeCustomerDetails: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
    var stripeCustomerDetails = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may access this data.');
    }

    Stripe.customers.retrieve(stripeId, function(err, customer) {
      if(err) {
        throw new Meteor.Error('Stripe Error', err);
      }

      stripeCustomerDetails.return(customer);
    });

    return stripeCustomerDetails.wait();
  },

  getStripeCardDetails: function() {
    if(!this.userId) {
      return false;
    }
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
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
    var stripeId = theTenant.stripe.stripeId;
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

  updateStripeEmail: function(email) {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
    var emailUpdated = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may update Email Details.');
    }
    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if(!emailRegex.test(email)) {
      throw new Meteor.Error(400, 'Invalid Email address');
    }
    Stripe.customers.update(stripeId, {email: email}, function(err, customer) {
      if(err) {
        throw new Meteor.Error('Unable to update email.');
      }
      emailUpdated.return(true);
    });

    return emailUpdated.wait();
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
    var stripeId = theTenant.stripe.stripeId;
    var upcomingInvoice = new Future();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }
    Stripe.invoices.retrieveUpcoming(stripeId, function(err, upcoming) {
      if(err) {
        if(err.message.indexOf('No upcoming invoices') !== -1) {
          upcomingInvoice.return(false);
          return false;
        } else {
          throw new Meteor.Error(400, err);
        }
      }

      upcomingInvoice.return(upcoming);
    });

    return upcomingInvoice.wait();
  },

  getStripeLastInvoice: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var stripeId = theTenant.stripe.stripeId;
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

  getStripeCoupon: function(couponId) {
    /* The control on permission is not applied for this method
    ** Since it can be called from the sign-up page */
    var couponDetails = new Future();

    Stripe.coupons.retrieve(couponId, function(err, coupon) {
      if(err) {
        couponDetails.return(false);
        return false;
      }

      couponDetails.return(coupon);
    });

    return couponDetails.wait();
  }
});