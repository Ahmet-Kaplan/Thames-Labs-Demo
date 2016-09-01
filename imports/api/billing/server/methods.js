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
  * @param {String} planId    - Stripe plan id ('premierGBP', 'premierEUR', 'premierUSD')
  * @param {String} userEmail - email provided on signup
  * @return {Boolean}         - Whether or not the creation succeeded.
  */
  'stripe.createCustomer': function(token, planId, userEmail) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    }

    if(!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      throw new Meteor.Error(400, 'Invalid plan name');
    }

    const tenantId = Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const coupon = _.get(mongoTenant, 'stripe.coupon');
    const numberUsers = Meteor.users.find({
      group: tenantId
    }).count();
    const freeUsers = _.get(mongoTenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const quantity = numberUsers > freeUsers ? (numberUsers - freeUsers) : 0;

    const customerParameters = {
      description: mongoTenant.name,
      source: token,
      plan: planId,
      quantity: quantity,
      tax_percent: 20.0,
      email: userEmail,
      trial_end: moment().add(1, 'd').startOf('day').unix(),
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
        }
      });
      return customer;
    }

    return !!customer;
  },




 /**
  * Creates a subscription object for a tenant which already has a stripe ID.
  * @method createSubscription
  * @param {String} token     - card token returned by Stripe (see {@link https://stripe.com/docs/stripe.js})
  * @param {String} planId    - Stripe plan id ('premierGBP', 'premierEUR', 'premierUSD')
  * @param {?String} superadminTenantId - Used when method is called from the superadmin interface in which case tenantId cannot be retrieved via partitioner
  * @return {(Object|Boolean)}          - The stripe subscription object (see {@link https://stripe.com/docs/api#subscription_object}) or false if failed.
  */
  'stripe.createSubscription': function(token, planId, superadminTenantId) {
    if(!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      throw new Meteor.Error(401, 'Invalid plan name');
    }

    const tenantId = (Roles.userIsInRole(this.userId, ['superadmin'])) ? superadminTenantId : Partitioner.getUserGroup(this.userId);
    const mongoTenant = Tenants.findOne({
      _id: tenantId
    });
    const stripeId = mongoTenant.stripe.stripeId;
    const numberUsers = Meteor.users.find({
      group: tenantId
    }).count();
    const freeUsers = _.get(mongoTenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const quantity = numberUsers > freeUsers ? (numberUsers - freeUsers) : 0;

    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may subscribe.');
    } else if (!Roles.userIsInRole(this.userId, ['superadmin']) && mongoTenant.stripe.stripeSubs) {
      throw new Meteor.Error('Existing subscription', 'It appears you have already subscribed.');
    }

    // If createSubscription is called, tenant already has subscribed before so has already had the trial period.
    // Hence the trial_end: now parameter value.
    const subsParameters = {
      source: token,
      plan: planId,
      quantity: quantity,
      tax_percent: 20.0,
      trial_end: moment().add(1, 'd').startOf('day').unix()
    };

    const subscription = stripeMethodsAsync.customers.createSubscription(stripeId, subsParameters);

    if(!!subscription === true) {
      Tenants.update(tenantId, {
        $set: {
          "stripe.stripeSubs": subscription.id
        }
      });
      return subscription;
    }

    return !!subscription;
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
      LogServerEvent('error', `Unable to get Mongo object to update Stripe Quantity for tenant of user ${this.userId}/tenant ${tenantId}`);
      return false;
    }

    // Tenant can create account if free and under free user limit
    if(!_.get(mongoTenant, 'stripe.stripeSubs')) {
      return true;

    // If pro, need to have a stripe account. This is to avoid conflicts with the previous way of setting a tenant to 'free unlimited'.
    // We now use the number of free user account to set an 'unlimited' tenant.
    } else if(!_.get(mongoTenant, 'stripe.stripeId') && !_.get(mongoTenant, 'stripe.stripeSubs')) {
      throw new Meteor.Error(403, 'Unable to retrieve subscription details');
    }


    const stripeId = mongoTenant.stripe.stripeId;
    const stripeSubs = mongoTenant.stripe.stripeSubs;
    const numberUsers = Meteor.users.find({
      group: tenantId
    }).count();
    const freeUsers = _.get(mongoTenant, 'stripe.maxFreeUsers', MAX_FREE_USERS);
    const quantity = numberUsers > freeUsers ? (numberUsers - freeUsers) : 0;

    // If quantity = 0, tenant has deleted paying accounts.
    // In that case, cancel subscription and delete card details.
    if(quantity === 0) {
      const customerObject = stripeMethodsAsync.customers.retrieve(stripeId);
      const subsDeleted = !!stripeMethodsAsync.customers.cancelSubscription(stripeId, stripeSubs);
      const cardDeleted = !!stripeMethodsAsync.customers.deleteCard(stripeId, customerObject.default_source);
      if(subsDeleted && cardDeleted) {
        Tenants.update(tenantId, {
          $unset: {
            'stripe.stripeSubs': '',
          }
        });
        return true;
      }
      return false;
    }

    //Otherwise update subscription
    const subsParameters = {
      quantity: quantity,
      prorate: false
    };

    return !!stripeMethodsAsync.customers.updateSubscription(stripeId, stripeSubs, subsParameters);
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
