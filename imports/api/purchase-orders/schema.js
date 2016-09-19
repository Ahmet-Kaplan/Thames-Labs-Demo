export const PurchaseOrderSchema = new SimpleSchema({
  sequencedIdentifier: {
    type: String,
    label: "RealTime ID",
    defaultValue: 'xxx-000',
    optional: true
  },
  userId: {
    type: String,
    label: "Requestor"
  },
  orderNumber: {
    label: "Purchase Order Number",
    type: String,
    // unique: true,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  supplierCompanyId: {
    type: String,
    label: 'Supplier Company',
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('supplierContactId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  supplierContactId: {
    type: String,
    label: 'Supplier Contact',
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('supplierCompanyId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  description: {
    type: String,
    label: "Description"
  },
  supplierReference: {
    type: String,
    label: "Supplier Reference",
    optional: true
  },
  status: {
    type: String,
    allowedValues: [
      'Requested',
      'Approved',
      'Rejected',
      'Ordered',
      'Arrived',
      'Closed',
      'Cancelled'
    ]
  },
  locked: {
    type: Boolean,
    defaultValue: false
  },
  orderDate: {
    type: Date,
    defaultValue: new Date(),
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: {
        defaultDate: new Date(),
        autoclose: true,
        format: 'dd/mm/yyyy',
        todayHighlight: true
      }
    }
  },
  paymentMethod: {
    type: String,
    optional: true,
    allowedValues: [
      'Cash',
      'Debit Card',
      'Credit Card',
      'Company Account'
    ]
  },
  notes: {
    type: String,
    label: "Notes",
    optional: true
  },
  totalValue: {
    type: Number,
    decimal: true,
    defaultValue: 0.00
  },
  documents: {
    type: [Object],
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
PurchaseOrderSchema.messages({
  needsRelatedEntity: "A company or a contact is required"
});
