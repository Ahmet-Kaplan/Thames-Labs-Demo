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
  email: {
    type: String
  },
  message: {
    type: String
  },
  url: {
    type: String
  }
});


Schemas.UserSignUp = new SimpleSchema({
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
    },
    custom: function() {
      var user = Meteor.users.findOne({
        emails: {
          $elemMatch: {
            address: this.value
          }
        }
      });
      if (user !== undefined) {
        return "emailTaken";
      }
    }
  },
  password: {
    type: String,
    min: 6
  },
  confirmPassword: {
    type: String,
    custom: function() {
      if (this.value !== this.field('password').value) {
        return "passwordMissmatch";
      }
    }
  },
  companyName: {
    type: String
  }
});

Schemas.UserSignUp.messages({
  passwordMissmatch: "Passwords must match",
  emailTaken: "This email address is already registered with RealTimeCRM"
});

// ** --------- Non-attachment schemas --------- ** //

Schemas.Tenant = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  settings: {
    type: Object,
    blackbox: true,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  createdAt: {
    type: Date
  }
});
Tenants.attachSchema(Schemas.Tenant);

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
  },
  customFields: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
});
Companies.attachSchema(Schemas.Company);

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
    type: String,
    optional: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  customFields: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
});
Contacts.attachSchema(Schemas.Contact);

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
  activityTimestamp: {
    type: Date,
    defaultValue: new Date(),
    label: "Activity Date/Time"
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
Activities.attachSchema(Schemas.Activity);

Schemas.Project = new SimpleSchema({
  description: {
    type: String,
    label: "Description"
  },
  companyId: {
    type: String,
    optional: true
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
Projects.attachSchema(Schemas.Project);

Schemas.PurchaseOrder = new SimpleSchema({
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
    optional: true
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
      'Arrived',
      'Closed',
      'Cancelled'
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
  notes: {
    type: String,
    label: "Notes",
    optional: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
PurchaseOrders.attachSchema(Schemas.PurchaseOrder);

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
PurchaseOrderItems.attachSchema(Schemas.PurchaseOrderItem);

Schemas.Notification = new SimpleSchema({
  title: {
    type: String
  },
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
Notifications.attachSchema(Schemas.Notification);


Schemas.Chatter = new SimpleSchema({
  user: {
    type: String
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date
  }
});
Chatterbox.attachSchema(Schemas.Chatter);


Schemas.Task = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  dueDate: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true
        }
      }
    }
  },
  assigneeId: {
    type: String
  },
  completed: {
    type: Boolean,
    defaultValue: false
  },
  entityType: {
    type: String,
    optional: true
  },
  entityId: {
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
Tasks.attachSchema(Schemas.Task);

//Features
Schemas.Feature = new SimpleSchema({
  icon: {
    type: String
  },
  description: {
    type: String
  }
});
Features.attachSchema(Schemas.Feature);
