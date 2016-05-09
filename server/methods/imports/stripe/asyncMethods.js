import { Meteor } from 'meteor/meteor';
import { Stripe as StripeAPI } from 'stripe';

var Stripe = StripeAPI(process.env.STRIPE_SK);

/**
 * Wrapper for the stripe customers methods.
 * <br>Methods can be called using `stripeMethodsAsync.customers.[methodName]`
 * @namespace stripeMethodsAsync
 */

export const stripeMethodsAsync = {
  /**
   * Wrapper for the customers methods
   * @memberOf stripeMethodsAsync
   * @namespace stripeMethodsAsync.customers
   */
  customers: {
    /**
     * Creates the Stripe customer Object
     * @memberOf stripeMethodsAsync.customers
     * @method   create
     * @param    {Object} parameters - An object containing the parameters for the creation of the customer object (see {@link https://stripe.com/docs/api#create_customer})
     * @return   {(Object|Boolean)}  - The Stripe customer object (see {@link https://stripe.com/docs/api#customer_object}) or false on failure.
     * @see      https://stripe.com/docs/api#create_customer
     */
    create: function(parameters) {
      const createCustomerAsync = Meteor.wrapAsync(Stripe.customers.create, Stripe.customers);
      let customer = null;
      try {
        customer = createCustomerAsync(parameters)
      } catch (error) {
        customer = false;
        throw new Meteor.Error('Unable to create customer', error.message);
      } finally {
        return customer;
      }
    },

    /**
     * Fetches the Stripe customer Object for use in Admin panel
     * @memberOf stripeMethodsAsync.customers
     * @method   retrieve
     * @param    {String} stripeId  - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @return   {(Object|Boolean)} - The Stripe customer object (see {@link https://stripe.com/docs/api#customer_object}) or false on failure.
     * @see      https://stripe.com/docs/api#retrieve_customer
     */
    retrieve: function(stripeId) {
      const getCustomerObject = Meteor.wrapAsync(Stripe.customers.retrieve, Stripe.customers);
      let customerObject = null;
      try {
        customerObject = getCustomerObject(stripeId);
      } catch (error) {
        customerObject = false;
        throw new Meteor.Error('Unable to retrieve customer details', error.message);
      } finally {
        return customerObject;
      }
    },

    /**
     * Updates the stripe customer Object from call in Admin panel
     * @memberOf stripeMethodsAsync.customers
     * @method   update
     * @param    {String} stripeId   - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {Object} parameters - An object containing the parameters to update (see {@link https://stripe.com/docs/api#update_customer})
     * @return   {(Object|Boolean)}  - The Stripe customer object (see {@link https://stripe.com/docs/api#customer_object}) or false on failure.
     * @see      https://stripe.com/docs/api#update_customer
     */
    update: function(stripeId, parameters) {
      const updateCustomerAsync = Meteor.wrapAsync(Stripe.customers.update, Stripe.customers);
      let customer = null;
      try {
        customer = updateCustomerAsync(stripeId, parameters);
      } catch (error) {
        customer = false;
        throw new Meteor.Error('Unable to update card details', error.message);
      } finally {
        return customer;
      }
    },

    /**
     * Attempts to creates a subscription for a tenant which already have a stripe ID.
     * @memberOf stripeMethodsAsync.customers
     * @method   createSubscription
     * @param    {String} stripeId   - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {Object} parameters - An object containing the parameters of the subscription (see {@link https://stripe.com/docs/api#create_subscription})
     * @return   {(Object|Boolean)}  - The Stripe subscription object (see {@link https://stripe.com/docs/api#subscription_object}) or false on failure.
     * @see      https://stripe.com/docs/api#create_subscription
     */
    createSubscription: function(stripeId, parameters) {
      const createSubscriptionAsync = Meteor.wrapAsync(Stripe.customers.createSubscription, Stripe.customers);
      let subscription = null;
      try {
        subscription = createSubscriptionAsync(stripeId, parameters);
      } catch (error) {
        subscription = false;
        throw new Meteor.Error('Error', error.message)
      } finally {
        return subscription;
      }
    },

    /**
     * Retrieves an existing subscription from Stripe
     * @memberOf stripeMethodsAsync.customers
     * @method   retrieveSubscription
     * @param    {String} stripeId  - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {String} subsId    - The tenant Stripe subscription ID ({Tenant}.stripe.stripeSubs)
     * @return   {(Object|Boolean)} - The Stripe subscription object (see {@link https://stripe.com/docs/api#subscription_object}) or false on failure.
     * @see      https://stripe.com/docs/api#retrieve_subscription
     */
    retrieveSubscription: function(stripeId, subsId) {
      const getCurrentSubscription = Meteor.wrapAsync(Stripe.customers.retrieveSubscription, Stripe.customers);
      let subscription = null;
      try {
        subscription = getCurrentSubscription(stripeId, subsId);
      } catch (error) {
        subscription = false;
        throw new Meteor.Error('Unable to retrieve subscription object', error.message);
      } finally {
        return subscription;
      }
    },

    /**
     * Updates an existing subscription
     * @memberOf stripeMethodsAsync.customers
     * @method   updateSubscription
     * @param    {String} stripeId   - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {String} subsId     - The tenant Stripe subscription ID ({Tenant}.stripe.stripeSubs)
     * @param    {Object} parameters - An object containing the parameters to updated in the subscription (see {@link https://stripe.com/docs/api#update_subscription})
     * @return   {(Object|Boolean)}  - The Stripe subscription object (see {@link https://stripe.com/docs/api#subscription_object}) or false on failure.
     * @see      https://stripe.com/docs/api#update_subscription
     */
    updateSubscription: function(stripeId, subsId, parameters) {
      const updateSubscriptionAsync = Meteor.wrapAsync(Stripe.customers.updateSubscription, Stripe.customers);
      let result = null;
      try {
        result = updateSubscriptionAsync(stripeId, subsId, parameters);
      } catch (error) {
        result = false;
        throw new Meteor.Error('Error', error);
      } finally {
        return result;
      }
    },

    /**
     * Calls the cancel subscription method with the options from object
     * @memberOf stripeMethodsAsync.customers
     * @method   cancelSubscription
     * @param    {String} stripeId - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {String} subsId   - The tenant Stripe subscription ID ({Tenant}.stripe.stripeSubs)
     * @param    {Object} options  - An object containing the parameters for the cancellation (see {@link https://stripe.com/docs/api#cancel_subscription})
     * @return   {Boolean}         - True if cancellation was successful, false otherwise.
     * @see      https://stripe.com/docs/api#cancel_subscription
     */
    cancelSubscription: function(stripeId, subsId, options) {
      const cancelSubscriptionAsync = Meteor.wrapAsync(Stripe.customers.cancelSubscription, Stripe.customers);
      let confirmation = null;
      try {
        confirmation = cancelSubscriptionAsync(stripeId, subsId, options);
      } catch (error) {
        confirmation = false;
        throw new Meteor.Error('Unable to cancel subscription', error.message);
      } finally {
        return !!confirmation;
      }
    },

    /**
     * Calls for the card object to display in admin panel
     * @memberOf stripeMethodsAsync.customers
     * @method   retrieveCard
     * @param    {String} stripeId  - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {String} cardId    - The tenant card ID which can be fetched from the tenant's Stripe customer object
     * @return   {(Object|Boolean)} - The Stripe card object or false on failure
     * @see      https://stripe.com/docs/api#retrieve_card
     */
    retrieveCard: function(stripeId, cardId) {
      const retriveCardDetailsAsync = Meteor.wrapAsync(Stripe.customers.retrieveCard, Stripe.customers);
      let cardDetails = null;
      try {
        cardDetails = retriveCardDetailsAsync(stripeId, cardId);
      } catch (error) {
        cardDetails = false;
        console.log(error)
        throw new Meteor.Error('Unable to retrieve card details', error.message);
      } finally {
        return cardDetails;
      }
    },

    /**
     * Delete the card from the tenant customer account. This is called by the webhook when subscription ends
     * @memberOf stripeMethodsAsync.customers
     * @method   deleteCard
     * @param    {String} stripeId  - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @param    {String} cardId    - The tenant card ID which can be fetched from the tenant's Stripe customer object
     * @return   {(Object|Boolean)} - The Stripe card object or false on failure
     * @see      https://stripe.com/docs/api#delete_card
     */
    deleteCard: function(stripeId, cardId) {
      const deleteCardDetails = Meteor.wrapAsync(Stripe.customers.deleteCard, Stripe.customers);
      let result = null;
      try {
        const response = deleteCardDetails(stripeId, cardId);
        result = response.deleted;
      } catch (error) {
        result = false;
        throw new Meteor.Error('Unable to delete card', error.message);
      } finally {
        return !!result;
      }
    },
  },

  /**
   * Wrapper for the customers methods
   * @memberOf stripeMethodsAsync
   * @namespace stripeMethodsAsync.coupons
   */
  coupons: {
    /**
     * Retrieve a coupon Object from Stripe
     * @memberOf stripeMethodsAsync.coupons
     * @method   retrieve
     * @param    {String} coupon    - The name of the coupon (e.g. 'chamber')
     * @return   {(Object|Boolean)} - The coupon object (see {@link https://stripe.com/docs/api#coupon_object}) or false on failure
     * @see      https://stripe.com/docs/api#retrieve_coupon
     */
    retrieve: function(coupon) {
      const getCouponAsync = Meteor.wrapAsync(Stripe.coupons.retrieve, Stripe.coupons);
      let couponDetails = null;
      try {
        couponDetails = getCouponAsync(coupon);
      } catch (error) {
        couponDetails = false;
        throw new Meteor.Error('Error', error.message);
      } finally {
        return couponDetails;
      }
    },
  },

  /**
   * Wrapper for the customers methods
   * @memberOf stripeMethodsAsync
   * @namespace stripeMethodsAsync.plans
   */
  plans: {
    /**
     * Retrieve a plan Object from Stripe
     * @memberOf stripeMethodsAsync.plans
     * @method   retrieve
     * @param    {String} planId    - The name of the plan ('premier', 'premierEUR', 'premierUSD')
     * @return   {(Object|Boolean)} - The plan object (see {@link https://stripe.com/docs/api#plan_object}) or false on failure
     * @see      https://stripe.com/docs/api#retrieve_plan
     */
    retrieve: function(planId) {
      const retrievePlanAsync = Meteor.wrapAsync(Stripe.plans.retrieve, Stripe.plans);
      let plan = null;
      try {
        plan = retrievePlanAsync(planId);
      } catch (error) {
        plan = false;
        throw new Meteor.Error('Unable to retrieve plan details', error.message);
      } finally {
        return plan;
      }
    },
  },

  /**
   * Wrapper for the customers methods
   * @memberOf stripeMethodsAsync
   * @namespace stripeMethodsAsync.invoices
   */
  invoices: {
    /**
     * Retrieve the upcoming invoice for a particular tenant
     * @memberOf stripeMethodsAsync.invoices
     * @method   retrieveUpcoming
     * @param    {String} stripeId  - The tenant Stripe customer ID ({Tenant}.stripe.stripeId)
     * @return   {(Object|false)}   - The Stripe invoice Object (see {@link https://stripe.com/docs/api#invoice_object}) or false on failure
     * @see      https://stripe.com/docs/api#upcoming_invoice
     */
    retrieveUpcoming: function(stripeId) {
      const retrieveUpcomingInvoiceAsync = Meteor.wrapAsync(Stripe.invoices.retrieveUpcoming, Stripe.invoices);
      let upcomingInvoice = null;
      try {
        upcomingInvoice = retrieveUpcomingInvoiceAsync(stripeId);
      } catch (error) {
        upcomingInvoice = false;
      } finally {
        return upcomingInvoice;
      }
    },

    /**
     * Retrieve the upcoming invoice for a particular tenant
     * @memberOf stripeMethodsAsync.invoices
     * @method   list
     * @param    {Object} options - The options for the invoices to retrieve (see {@link https://stripe.com/docs/api#list_invoices})
     * @return   {(Object|false)} - The Stripe invoice Object (see {@link https://stripe.com/docs/api#list_invoices}) or false on failure
     * @see      https://stripe.com/docs/api#list_invoices
     */
    list: function(options) {
      const retrieveLastInvoice = Meteor.wrapAsync(Stripe.invoices.list, Stripe.invoices);
      let invoiceArray = null;
      try {
        invoiceArray = retrieveLastInvoice(options);
      } catch (error) {
        invoiceArray = false;
        throw new Meteor.Error('Unable to retrieve last invoice', error.message);
      } finally {
        return invoiceArray;
      }
    },
  },
};