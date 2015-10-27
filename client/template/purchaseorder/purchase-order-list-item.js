Template.purchaseOrderListItem.onCreated(function() {
  this.subscribe('companyById', this.data.supplierCompanyId);
  this.subscribe('contactById', this.data.supplierContactId);
  this.subscribe('companyById', this.data.customerCompanyId);
  this.subscribe('contactById', this.data.customerContactId);
  this.subscribe('projectById', this.data.projectId);
});

Template.purchaseOrderListItem.helpers({
  supplierCompany: function() {
    return Companies.findOne(this.supplierCompanyId);
  },
  supplierContact: function() {
    return Contacts.findOne(this.supplierContactId);
  },
  project: function() {
    return Projects.findOne(this.projectId);
  }
});
