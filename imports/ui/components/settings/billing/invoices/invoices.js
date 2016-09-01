import { upcomingInvoice, lastInvoice } from '/imports/api/billing/helpers';

import './invoice-details.html';
import './invoices.html';

Template.invoices.helpers({
  upcomingInvoice: function() {
    console.log(upcomingInvoice.getData());
    const upcoming = upcomingInvoice.getData();
    if(!upcoming || upcoming.total === 0) return false;
    return upcoming;
  },
  lastInvoice: function() {
    const last = lastInvoice.getData();
    if(!last || last.total === 0) return false;
    return last;
  }
});