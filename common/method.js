import '/imports/api/reports/reporting.js';

Meteor.methods({

  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
  }

});

LogClientEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  // if (Meteor.isServer) {
  //   Meteor.call('eventLog.addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'client');
  // }
};

LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  // Meteor.call('eventLog.addEventToEventLog', logLevel, logMessage, logEntityType, logEntityId, 'server');
};
