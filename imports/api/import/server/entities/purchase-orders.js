import { PurchaseOrders } from '/imports/api/collections.js';
export const importPurchaseOrder = (row, getValueForField, userId, rtId) => {
  const result = {};
  result.warning = [];

  //Check if already exists
  if (PurchaseOrders.findOne({
    description: getValueForField(row, 'description')
  })) {
    result.warning.push("already-exists");
  }

  //Get linked entities
  let company = getValueForField(row, 'supplier'),
      contact = getValueForField(row, 'supplierContact');

  if (company) {
    company = Companies.findOne({
      name: company
    });
    if (!company) {
      company = null;
      result.warning.push("linked-company");
    }
  }

  if (contact) {
    contact = Contacts.findOne({
      forename: contact.split(' ')[0],
      surname: contact.split(' ')[1]
    });
    if (!contact) {
      contact = null;
      result.warning.push("linked-contact");
    }
  }

  //Get dates
  let orderDate = getValueForField(row, 'orderDate');
  if (orderDate) orderDate = moment(orderDate, 'DD/MM/YYYY hh:mm').toDate();

  //Setup JSON object for entity
  const entityData = {
    description: getValueForField(row, 'description'),
    supplierReference: getValueForField(row, 'supplierReference'),
    notes: getValueForField(row, 'notes'),
    paymentMethod: getValueForField(row, 'paymentMethod'),
    status: getValueForField(row, 'status'),
    orderDate: orderDate,
    supplierCompanyId: (company ? company._id : null),
    supplierContactId: (contact ? contact._id : null),
    createdBy: userId,
    userId: userId,
    sequencedIdentifier: rtId
  };
  try {
    //Insert the record
    const entityId = PurchaseOrders.insert(entityData, function(error, docId) {
      if (error) {
        result.error = error;
        return result;
      }
    });

    result._id = entityId;

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
