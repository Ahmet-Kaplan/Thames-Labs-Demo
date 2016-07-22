import { upcomingInvoice, lastInvoice } from '/imports/api/billing/helpers';

import './invoice-details.html';
import './invoices.html';

Template.invoices.helpers({
  upcomingInvoice: function() {
    return upcomingInvoice.getData();
  },
  lastInvoice: function() {
    return lastInvoice.getData();
  }
});