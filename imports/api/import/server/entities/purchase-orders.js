import { Companies, Contacts, PurchaseOrders } from '/imports/api/collections.js';
export const importPurchaseOrder = (row, getValueForField, userId, rtId) => {
  const result = {};
  result.warning = [];

  //Check if already exists
  if (PurchaseOrders.findOne({
    description: getValueForField(row, 'description')
  })) {
    result.warning.push(`A purchase order already exists with the name "${getValueForField(row, 'description')}"`);
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
      result.warning.push(`Cannot find referenced company "${getValueForField(row, 'supplier')}" for purchase order "${getValueForField(row, 'name')}"`);
    }
  }

  if (contact) {
    const names = contact.split(' ');
    let fn, sn;
    if (names.length === 2) {
      fn = names[0];
      sn = names[1];
    } else if (names.length > 2) {
      fn = names[0];
      sn = "";

      for(let i = 1; i < names.length; i++) {
        sn = sn + names[i] + " ";
      }
      sn = sn.trim();
    }

    contact = Contacts.findOne({
      forename: fn,
      surname: sn
    });
    if (!contact) {
      contact = null;
      result.warning.push(`Cannot find referenced contact "${getValueForField(row, 'supplierContact')}" for purchase order "${getValueForField(row, 'name')}"`);
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

    //Add tags
    const tags = getValueForField(row, 'tags');
    if (tags) {
      const tagList = _.split(tags, ',');
      _.each(tagList, function(tag) {
        PurchaseOrders.addTag(tag, { _id: entityId });
      });
    }

    return result;
  } catch(err) {
    result.error = err;
    return result;
  }
};
