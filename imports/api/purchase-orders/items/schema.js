export const PurchaseOrderItemSchema = new SimpleSchema({
  purchaseOrderId: {
    type: String
  },
  description: {
    type: String,
    label: "Description"
  },
  productCode: {
    type: String,
    label: "Product Code",
    optional: true
  },
  status: {
    type: String,
    allowedValues: [
      "",
      "Dispatched",
      "Delivered",
      "Cancelled"
    ],
    defaultValue: "",
    optional: true
  },
  value: {
    type: String,
    defaultValue: "0.00",
    autoform: {
      type: "number",
      step: "any"
    }
  },
  quantity: {
    type: Number,
    defaultValue: 1
  },
  totalPrice: {
    type: Number,
    decimal: true,
    defaultValue: 0.00
  },
  projectId: {
    type: String,
    optional: true,
    label: 'Project'
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
