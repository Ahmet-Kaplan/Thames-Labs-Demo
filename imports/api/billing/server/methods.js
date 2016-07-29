import { Meteor } from 'meteor/meteor';

import { stripeMethodsAsync } from './asyncMethods.js';

/**
 * Meteor methods used to get responses from the Stripe API.
 * <br> Methods can be called using `Meteor.call('stripe.[methodName]', function(err, res){});`
 * @module stripe
 */

Meteor.methods({
 /**
  * Returns Stripe public key to use on the client side.
  * @method getPK
  * @return {String} - The Stripe Public Key.
  */
  'stripe.getPK': function() {
    if (!process.env.STRIPE_PK) {
      throw new Meteor.Error(404, 'Stripe public key missing - please set STRIPE_PK');
    }
    return process.env.STRIPE_PK;
  },




 /**
  * Creates a customer and returns true if the creation succeeded, false otherwise.
  * @method createCustomer
  * @param {String} token     - card token returned by Stripe (see {@link https://stripe.com/docs/stripe.js})
  * @param {String} userEmail - email provided on signup
  * @param {String} planId    - Stripe plan id ('premierGBP', 'premierEUR', 'premierUSD')
  * @return {Boolean}         - Whether or not the creation succeeded.
  */
  'stripe.createCustomer': function(token, userEmail, planId) {
    if(!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      throw new Meteor.Error('400', 'Invalid plan name');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const coupon = mongoTenant.stripe.coupon;
    const numberUsers = Meteor.users.find({
      group: tenantId
    }).count();

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    }

    const customerParameters = {
      description: mongoTenant.name,
      source: token,
      plan: planId,
      quantity: numberUsers,
      tax_percent: 20.0,
      email: userEmail,
      metadata: {
        tenantId: tenantId,
        createdBy: this.userId
      },
    };

    if(coupon) {
      const couponDetails = stripeMethodsAsync.coupons.retrieve(coupon);
      if(couponDetails !== false) {
        customerParameters.coupon = coupon;
      }
    }

    const customer = stripeMethodsAsync.customers.create(customerParameters);
    if(!!customer === true) {
      Tenants.update(tenantId, {
        $set: {
          "stripe.stripeId": customer.id,
          "stripe.stripeSubs": customer.subscriptions.data[0].id,
          "plan": 'pro'
        }
      });
    }

    return !!customer;
  },




 /**
  * Creates a subscription object for a tenant which already has a stripe ID.
  * @method createSubscription
  * @param {String} planId              - Stripe plan id ('premierGBP', 'premierEUR', 'premierUSD')
  * @param {?String} superadminTenantId - Used when method is called from the superadmin interface in which case tenantId cannot be retrieved via partitioner
  * @return {(Object|Boolean)}          - The stripe subscription object (see {@link https://stripe.com/docs/api#subscription_object}) or false if failed.
  */
  'stripe.createSubscription': function(planId, superadminTenantId) {
    if(!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      throw new Meteor.Error(401, 'Invalid plan name');
    }

    const tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;
    const numberOfUsers = Meteor.users.find({
      group: tenantId
    }).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!Roles.userIsInRole(this.userId, ['superadmin']) && mongoTenant.stripe.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subscribed.');
    }

    // If createSubscription is called, tenant already has subscribed before so has already had the trial period.
    // Hence the trial_end: now parameter value.
    const subsParameters = {
      plan: planId,
      quantity: numberOfUsers,
      tax_percent: 20.0,
      trial_end: 'now'
    };

    const subscription = stripeMethodsAsync.customers.createSubscription(stripeId, subsParameters);

    if(!!subscription === true) {
      Tenants.update(tenantId, {
        $set: {
          "stripe.stripeSubs": subscription.id,
          "plan": 'pro'
        }
      });
    }

    return subscription;
  },




 /**
  * Updates subscription when a tenant adds or removes users
  * @method updateQuantity
  * @param  {?String} superadminTenantId - Used when method is called from the superadmin interface in which case tenantId cannot be retrieved via partitioner
  * @return {Boolean}                    - Whether or not the subscription was updated.
  */
  'stripe.updateQuantity': function(superadminTenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may add or remove users.');
    }

    const tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });

    if (!mongoTenant) {
      LogServerEvent('error', 'Unable to get Mongo object to update Stripe Quantity for tenant of user ' + this.userId + '/tenant ' + tenantId);
      return false;
    }

    if (mongoTenant.plan === 'free' || !mongoTenant.stripe || !mongoTenant.stripe.stripeId || !mongoTenant.stripe.stripeSubs) {
      return true;
    }

    const stripeId = mongoTenant.stripe.stripeId;
    const stripeSubs = mongoTenant.stripe.stripeSubs;
    const numberUsers = Meteor.users.find({
      group: tenantId
    }).count();

    //Check that subscription is not to be cancelled at period ends and returns true if so because it means the user is on free plan now.
    const currentSubscription = stripeMethodsAsync.customers.retrieveSubscription(stripeId, stripeSubs);
    if(currentSubscription.cancel_at_period_end === true) {
      return true;
    }

    //Otherwise update subscription
    const subsParameters = {
      quantity: numberUsers,
      prorate: false
    };

    return !!stripeMethodsAsync.customers.updateSubscription(stripeId, stripeSubs, subsParameters);
  },




 /**
  * 'Cancels' subscription by updating number of users to 0 and setting subscription to terminate at period ends.
  * On deletion, webhook will remove card details from Stripe and subscription ID from database.
  * @method cancelSubscription
  * @param  {?String} superadminTenantId - Used when method is called from the superadmin interface in which case tenantId cannot be retrieved via partitioner
  * @return {Boolean}                    - Whether or not the cancellation was successful.
  */
  'stripe.cancelSubscription': function(superadminTenantId) {
    const userId = this.userId;
    const tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;
    const stripeSubs = mongoTenant.stripe.stripeSubs;

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!stripeId || !stripeSubs) {
      throw new Meteor.Error(400, 'It appears you are not subscribed.');
    }

    const confirmation = stripeMethodsAsync.customers.cancelSubscription(stripeId, stripeSubs, {
      at_period_end: true
    });
    if(confirmation === true) {
      //Send confirmation email if Admin but not superadmin
      if (Roles.userIsInRole(userId, ['Administrator'])) {
        const user = Meteor.users.findOne(userId);

        Email.send({
          to: user.emails[0].address,
          from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
          subject: 'Cancellation of your RealTimeCRM Subscription',
          html: Accounts.buildHtmlEmail('email-stripe-cancel-subs.html', {
            name: user.profile.name
          }),
          text: Accounts.buildHtmlEmail('email-stripe-cancel-subs.txt', {
            name: user.profile.name
          })
        });
      }
    }

    return confirmation;
  },




 /**
  * Resume subscription by updating the number of users.
  * @method resumeSubscrption
  * @param  {String} superadminTenantId - Used when method is called from the superadmin interface in which case tenantId cannot be retrieved via partitioner.
  * @return {(Object|Boolean)}          - The Stripe subscription Object updated (see {@link https://stripe.com/docs/api#subscription_object}) or false if failed.
  */
  'stripe.resumeSubscription': function(superadminTenantId) {
    const tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;
    const stripeSubs = mongoTenant.stripe.stripeSubs;
    const coupon = mongoTenant.stripe.coupon;
    const numberOfUsers = Meteor.users.find({
      group: tenantId
    }).count();

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may resume subscriptions.');
    } else if (!stripeId || !stripeSubs) {
      throw new Meteor.Error(400, 'It appears you do not have a Stripe Account yet.');
    }

    //Check first that the tenant has a card registered
    const customer = stripeMethodsAsync.customers.retrieve(stripeId);

    if(!customer.default_source) {
      throw new Meteor.Error('No credit card associated');
    }

    const params = {
      quantity: numberOfUsers
    };

    if(coupon) {
      const couponDetails = stripeMethodsAsync.coupons.retrieve(coupon);
      if(couponDetails !== false) {
        params.coupon = coupon;
      }
    }

    const subscriptionUpdated = stripeMethodsAsync.customers.updateSubscription(stripeId, stripeSubs, params);
    if(!!subscriptionUpdated === true) {
      Tenants.update(tenantId, {
        $set: {
          "plan": 'pro'
        }
      });
    }

    return subscriptionUpdated;
  },




 /**
  * Returns Stripe customer Object to use in Administrator panel.
  * The stripe ID is retrieved _via_ Partitioner
  * @method getCustomerDetails
  * @return {(Object|Boolean)} - The Stripe customer Object (see {@link https://stripe.com/docs/api#customer_object}) or false on failure.
  */
  'stripe.getCustomerDetails': function() {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may access this data.');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;

    const customerObject = stripeMethodsAsync.customers.retrieve(stripeId);

    return customerObject;
  },




 /**
  * Updates card Object in the Stripe customer Object
  * The stripe ID is retrieved _via_ Partitioner
  * @method updateCard
  * @param  {String} token     - Card token obtained by call to the Stripe API on the client side
  * @return {(Object|Boolean)} - The new Stripe card Object (see {@link https://stripe.com/docs/api#card_object}) or false if failed.
  */
  'stripe.updateCard': function(token) {
    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may update Card Details.');
    } else if (!stripeId) {
      throw new Meteor.Error('Missing user', 'It appears you do not have an account.');
    }

    const updatedCustomer = stripeMethodsAsync.customers.update(stripeId, {source: token});

    return (!!updatedCustomer === true) ? _.get(updatedCustomer, 'sources.data[0]', false) : false;
  },




 /**
  * Updates email in Stripe customer object and returns updated customer object to use in Administrator panel
  * @method updateEmail
  * @param  {String} email     - The new email to be used. A RegEx match will be performed to ensure correctness
  * @return {(Object|Boolean)} - The updated Stripe customer Object (see {@link https://stripe.com/docs/api#customer_object}) or false if failed.
  */
  'stripe.updateEmail': function(email) {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may update Email Details.');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;

    const emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!emailRegex.test(email)) {
      throw new Meteor.Error(400, 'Invalid Email address');
    }

    const updatedCustomer = stripeMethodsAsync.customers.update(stripeId, {email: email});

    return updatedCustomer;
  },




 /**
  * Returns Stripe plan object to use in Administrator panel
  * @method getPlan
  * @param  {String} planId    - Stripe plan id ('premierGBP', 'premierEUR', 'premierUSD')
  * @return {(Object|Boolean)} - The Stripe plan Object (see {@link https://stripe.com/docs/api#plan_object}) or false if failed
  */
  'stripe.getPlan': function(planId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    return stripeMethodsAsync.plans.retrieve(planId);
  },




 /**
  * Returns Stripe upcoming Invoice object to use in Administrator panel
  * The stripe ID is retrieved _via_ Partitioner
  * @method getUpcomingInvoice
  * @return {(Object|Boolean)} - The Stripe invoice Object (see {@link https://stripe.com/docs/api#invoice_object}) or false if failed
  */
  'stripe.getUpcomingInvoice': function() {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;

    return stripeMethodsAsync.invoices.retrieveUpcoming(stripeId);
  },




 /**
  * Returns Stripe Last Invoice object to use in Administrator panel
  * The stripe ID is retrieved _via_ Partitioner
  * @method getLastInvoice
  * @return {(Object|Boolean)} - The Stripe invoice Object (see {@link https://stripe.com/docs/api#list_invoices}) or false if failed
  */
  'stripe.getLastInvoice': function() {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to access this information.');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;

    const invoiceArray = stripeMethodsAsync.invoices.list({
      customer: stripeId,
      limit: 1,
    });

    return (!!invoiceArray === true) ? _.get(invoiceArray, 'data[0]', false) : false;
  },




 /**
  * Used to fetch the details of a coupon or check its validity.
  * This is used on signup page so does not require userId (no login needed)
  * @method getCoupon
  * @param  {String} couponId  - Stripe coupon id (e.g. 'chamber')
  * @return {(Object|Boolean)} - The Stripe coupon Object or false if the coupon is invalid or the request failed.
  */
  'stripe.getCoupon': function(couponId) {
    return stripeMethodsAsync.coupons.retrieve(couponId);
  },




 /**
  * Verifies that coupon exists and apply it to the tenant (NOT to the Stripe object, only to the Meteor MongoDB object).
  * @method updateCoupon
  * @param  {String} couponId  - Stripe coupon id (e.g. 'chamber')
  * @return {(Object|Boolean)} - The updated Stripe coupon Object or false if coupon is not valid or the request failed.
  */
  'stripe.updateCoupon': function(couponId) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'You do not have the rights to update coupons.');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    let couponDetails = null;

    if (couponId === '') {
      Tenants.update(tenantId, {
        $unset: {
          'stripe.coupon': ''
        }
      });
      couponDetails = true;
    } else {
      couponDetails = stripeMethodsAsync.coupons.retrieve(couponId);
      if(couponDetails.valid === true) {
        Tenants.update(tenantId, {
          $set: {
            'stripe.coupon': couponId
          }
        });
      }
    }
    return couponDetails;
  }
});
