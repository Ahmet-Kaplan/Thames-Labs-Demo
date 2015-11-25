Meteor.methods({
  getActivityEntityData: function(primaryEntityType, primaryEntityId) {
    var result = "";

    switch (primaryEntityType) {
      case 'company':
        result = Companies.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'contact':
        var contact = Contacts.findOne({
          _id: primaryEntityId
        });
        result = contact.forename + " " + contact.surname;
        break;
      case 'opportunity':
        result = Opportunities.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'project':
        result = Projects.findOne({
          _id: primaryEntityId
        }).name;
        break;
      case 'purchaseOrder':
        result = PurchaseOrders.findOne({
          _id: primaryEntityId
        }).description;
        break;
      case 'task':
        result = Companies.findOne({
          _id: primaryEntityId
        }).title;
        break;
    }

    return result;
  }
});
