import { Email } from 'meteor/email';
import { Picker } from 'meteor/meteorhacks:picker';
import { Tenants } from '/imports/api/collections.js';

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

  Email.send({
    to: 'realtimecrm-notifications@cambridgesoftware.co.uk',
    from: 'stripe@realtimecrm.co.uk',
    subject: `RealtimeCRM received a webhook from Stripe! [${event.type}]`,
    text: message
  });
});