import { Companies, Contacts, Projects, PurchaseOrders, Opportunities } from '/imports/api/collections.js';
Meteor.methods({
  getActivityEntityData: function(primaryEntityType, primaryEntityId) {
    var result = "";

    switch (primaryEntityType) {
      case 'companies':
        result = Companies.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'contacts':
        var contact = Contacts.findOne({
          _id: primaryEntityId
        });
        result = contact.forename + " " + contact.surname;
        break;
      case 'opportunities':
        result = Opportunities.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'projects':
        result = Projects.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'purchaseorders':
        result = PurchaseOrders.findOne({
          _id: primaryEntityId
        }).description;
        break;
      case 'tasks':
        result = Companies.findOne({
          _id: primaryEntityId
        }).title;
        break;
    }

    return result;
  }
});
