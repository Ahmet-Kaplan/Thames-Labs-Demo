Schemas = {};

// ** --------- Non-attachment schemas --------- ** //
Schemas.User = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    unique: true,
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        return this.value.toLowerCase();
      }
    }
  },
  password: {
    type: String,
    min: 6
  },
  roles: {
    type: [String],
    optional: true
  },
  group: {
    type: String
  }
});

Schemas.Feedback = new SimpleSchema({
  name: {
    type: String
  },
  message: {
    type: String
  },
  url: {
    type: String
  }
});

// ** --------- Non-attachment schemas --------- ** //

Schemas.Tenant = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    unique: true
  },
  settings:{
    type: Object,
    blackbox: true,
    autoform: {
      type: "hidden"
    },
    optional: true
  }
});
g_Tenants.attachSchema(Schemas.Tenant);

Schemas.Company = new SimpleSchema({
  name: {
    type: String,
    label: "Company name"
  },
  address: {
    type: String,
    label: "Address"
  },
  address2: {
    type: String,
    optional: true,
    label: "Address Line 2"
  },
  city: {
    type: String,
    label: "City/Town"
  },
  county: {
    type: String,
    optional: true,
    label: "County/State"
  },
  postcode: {
    type: String,
    label: "PostCode/Zip"
  },
  country: {
    type: String,
    label: "Country"
  },
  website: {
    type: String,
    label: "Website",
    optional: true,
    regEx: SimpleSchema.RegEx.Url
  },
  phone: {
    type: String,
    label: "Phone number",
    optional: true
  },
  // source: {
  //   type: String,
  //   label: "Source",
  //   optional: true
  // },
  // industry: {
  //   type: String,
  //   label: "Industry",
  //   optional: true
  // },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_Companies.attachSchema(Schemas.Company);

Schemas.Contact = new SimpleSchema({
  title: {
    type: String,
    allowedValues: [
      "Mr",
      "Mrs",
      "Miss",
      "Ms",
      "Dr"
    ]
  },
  forename: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  phone: {
    type: String,
    label: "Phone number",
    optional: true
  },
  mobile: {
    type: String,
    label: "Mobile phone number",
    optional: true
  },
  jobtitle: {
    type: String,
    label: "Job title",
    optional: true
  },
  companyId: {
    type: String
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_Contacts.attachSchema(Schemas.Contact);

Schemas.Activity = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [
      'Note',
      'Email',
      'Call'
    ]
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date
  },
  companyId: {
    type: String,
    optional: true
  },
  contactId: {
    type: String,
    optional: true
  },
  projectId: {
    type: String,
    optional: true
  },
  purchaseOrderId: {
    type: String,
    optional: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_Activities.attachSchema(Schemas.Activity);

Schemas.Project = new SimpleSchema({
  description: {
    type: String,
    label: "Description"
  },
  companyId: {
    type: String
  },
  contactId: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    label: "Account Manager"
  },
  // status: {
  //   type: String,
  //   allowedValues: [
  //     'Proposed',
  //     'Quoted',
  //     'Accepted',
  //     'Lost',
  //     'Ordered',
  //     'Incomplete',
  //     'Completed'
  //   ]
  // },
  value: {
    type: Number
  },
  // probability: {
  //   type: Number
  // },
  // lastActionDate: {
  //   type: Date,
  //   optional: true
  // },
  // nextActionBy: {
  //   type: String,
  //   optional: true
  // },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_Projects.attachSchema(Schemas.Project);

Schemas.PurchaseOrder = new SimpleSchema({
  userId: {
    type: String,
    label: "Requestor"
  },
  supplierCompanyId: {
    type: String
  },
  supplierContactId: {
    type: String,
    optional: true
  },
  projectId: {
    type: String,
    optional: true
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
      'Arrived'
    ]
  },
  orderDate: {
    type: Date
  },
  // deliveryDate: {
  //   type: Date,
  //   optional: true
  // },
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
  // currency: {
  //   type: String,
  //   allowedValues: [
  //     'GBP',
  //     'USD',
  //     'EUR'
  //   ]
  // },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_PurchaseOrders.attachSchema(Schemas.PurchaseOrder);

Schemas.PurchaseOrderItem = new SimpleSchema({

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
  // currency: {
  //   type: String,
  //   allowedValues: [
  //     'GBP',
  //     'USD',
  //     'EUR'
  //   ]
  // },
  value: {
    type: String,
    defaultValue: "0.00"
  },
  quantity: {
    type: String,
    defaultValue: "1"
  },
  totalPrice: {
    type: String,
    defaultValue: "0.00"
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_PurchaseOrderItems.attachSchema(Schemas.PurchaseOrderItem);

Schemas.Notification = new SimpleSchema({
  detail: {
    type: String
  },
  createdAt: {
    type: Date
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
g_Notifications.attachSchema(Schemas.Notification);
