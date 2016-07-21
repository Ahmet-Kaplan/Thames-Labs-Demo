export function updateLastInvoice(self) {
  const tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getLastInvoice', function(error, invoice) {
      if (error) {
        toastr.error('Unable to retrieve last invoice');
        return false;
      } else if (invoice === false) {
        self.lastInvoice.set(false);
        return false;
      }
      const lastInvoice = beautifyInvoices(invoice);

      self.lastInvoice.set(lastInvoice);
    });
  }
}