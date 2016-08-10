import { moment } from 'meteor/momentjs:moment';
//This function takes an purchase order JSON object, and returns another JSON object with required headings for export
const formatPurchaseOrderForExport = (record) => {
  record.supplierCompany = "";
  if (record.supplierCompanyId) {
    const company = Companies.findOne({
      _id: record.supplierCompanyId
    });
    record.supplierCompany = company ? company.name : "";
  }

  record.supplierContact = "";
  if (record.supplierContactId) {
    const contact = Contacts.findOne({
      _id: record.supplierContactId
    });
    record.supplierContact = contact ? contact.name() : "";
  }

  if (record.orderDate) {
    record.orderDate = moment(record.orderDate).format('DD/MM/YY');
  }

  if ( _.has(record, 'locked') ) {
    record.locked = record.locked ? 'Yes' : 'No';
  }

  return {
    description: record.description || "",
    status: record.status || "",
    orderDate: record.orderDate || "",
    paymentMethod: record.paymentMethod || "",
    notes: record.notes || "",
    locked: record.locked,
    totalValue: record.totalValue,
    supplier: record.supplierCompany,
    supplierContact: record.supplierContact,
    supplierReference: record.supplierReference || "",
    tags: record.tags || "",
    createdAt: record.createdAt || ""
  };
};

export { formatPurchaseOrderForExport };