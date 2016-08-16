import { Quotations } from '/imports/api/lookup/quotations.js';
Template.quotationWidget.helpers({
  quotationOfDay: function() {
    var date = new Date();
    date.setMonth(0, 0);
    var i = Math.round((new Date() - date) / 8.64e7) % Quotations.length;
    var quoteObject = Quotations[i];

    if (typeof quoteObject.Person === "undefined") {
      quoteObject.Person = "Anonymous";
    }
    return quoteObject;
  }
});