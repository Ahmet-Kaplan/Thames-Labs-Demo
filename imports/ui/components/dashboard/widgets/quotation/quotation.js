import './quotation.html';
import { Quotations } from '/imports/api/lookup/quotations.js';
Template.quotationWidget.helpers({
  quotationOfDay: function() {
    return Quotations.quotationOfDay();
  }
});
