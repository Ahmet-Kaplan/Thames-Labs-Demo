import './global-search.html';
import './global-search.css';
import './global-search-result.js';

Template.globalSearch.onRendered(function() {
  $('#globalSearchBox').addClass('form-control');
});

Template.globalSearch.helpers({
  settings: function() {
    return {
      position: "bottom",
      limit: 10,
      rules: [{
        subscription: "allRecords",
        field: ["name", "forename", "surname", "description"],
        template: Template.resultPill,
        matchAll: true
      }]
    };
  }
});

Template.globalSearch.events({
  "autocompleteselect input": function(event, template, doc) {
    const url = template.firstNode.baseURI;
    if (url.indexOf("companies") > -1) {
      FlowRouter.go("/companies/" + doc._id);
    } else if (url.indexOf("contacts") > -1) {
      FlowRouter.go("/contacts/" + doc._id);
    } else if (url.indexOf("opportunities") > -1) {
      FlowRouter.go("/opportunities/" + doc._id);
    } else if (url.indexOf("projects") > -1) {
      FlowRouter.go("/projects/" + doc._id);
    } else if (url.indexOf("purchaseOrders") > -1) {
      FlowRouter.go("/purchaseOrders/" + doc._id);
    } else if (url.indexOf("products") > -1) {
      FlowRouter.go("/products/" + doc._id);
    }
  }
});
