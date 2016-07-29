import { Email } from 'meteor/email';
import { Picker } from 'meteor/meteorhacks:picker';

const postRoutes = Picker.filter(function(req, res) {
  return req.method == "POST";
});

postRoutes.route('/webhook/stripe', function(params, request, response) {

  if (request.body.object !== 'event') {
    response.writeHead(400);
    return response.end();
  }

  response.writeHead(200);
  response.end();

  const event = request.body;
  const eventObject = event.data.object;

  //--------------------------------------------------//
  // Delete card details and switch back to free plan //
  //           when subscription is deleted           //
  //--------------------------------------------------//
  if(event.type === "customer.subscription.deleted") {
    let message = `Result from webhook ${event.type}/${event.id}\n`;

    const customerObject = stripeMethodsAsync.customers.retrieve(eventObject.customer);

    const deleteCard = stripeMethodsAsync.customers.deleteCard(customerObject.id, customerObject.default_source);
    message += (deleteCard === true) ? "Card Details successfully deleted" : "Unable to remove card details";
    message += ` for RealTimeCRM customer ${customerObject.description} with id ${customerObject.metadata.tenantId} (Stripe account ${eventObject.customer})`;

    if(deleteCard === true) {
      Tenants.update(customerObject.metadata.tenantId, {
        $set: {
          'plan': 'free'
        },
        $unset: {
          'stripe.stripeSubs': '',
        }
      });
    }

    Email.send({
      to: 'realtimecrm-notifications@cambridgesoftware.co.uk',
      from: 'stripe@realtimecrm.co.uk',
      subject: `RealtimeCRM received a webhook from Stripe! [${event.type}]`,
      text: message
    });
  }
});