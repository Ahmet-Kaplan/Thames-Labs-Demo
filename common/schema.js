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
  },
  coupon: {
    type: String,
    autoform: {
      type: "hidden"
    },
    optional: true,
    label: "Coupon code"
  }
});

Schemas.UserSignUp.messages({
  passwordMissmatch: "Passwords must match",
  emailTaken: "This email address is already registered with RealTimeCRM"
});

// ** --------- End Non-attachment schemas --------- ** //

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
  stripe: {
    type: Object,
    autoform: {
      type: "hidden"
    }
  },
  "stripe.paying": {
    type: Boolean,
    label: "Paying tenant",
    defaultValue: false
  },
  "stripe.freeUnlimited": {
    type: Boolean,
    label: "Free unlimited",
    defaultValue: false
  },
  "stripe.blocked": {
    type: Boolean,
    defaultValue: false
  },
  "stripe.stripeId": {
    type: String,
    optional: true
  },
  "stripe.stripeSubs": {
    type: String,
    optional: true
  },
  "stripe.totalRecords": {
    type: Number,
    defaultValue: 0
  },
  "stripe.coupon": {
    type: String,
    optional: true,
    label: "Coupon code"
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
    optional: true,
    label: "Address"
  },
  address2: {
    type: String,
    optional: true,
    label: "Address Line 2"
  },
  city: {
    type: String,
    optional: true,
    label: "City/Town"
  },
  county: {
    type: String,
    optional: true,
    label: "County/State"
  },
  postcode: {
    type: String,
    optional: true,
    label: "PostCode/Zip"
  },
  country: {
    type: String,
    optional: true,
    label: "Country"
  },
  lat: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  lng: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  website: {
    type: String,
    label: "Website",
    optional: true,
    defaultValue: "",
    regEx: /^(((\w|\W){0,7}|http:\/\/)|((?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?))$/i,
    autoform: {
      placeholder: 'http://'
    }
  },
  phone: {
    type: String,
    label: "Phone number",
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
  },
  metadata: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    },
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});
Companies.attachSchema(Schemas.Company);

Schemas.Contact = new SimpleSchema({
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
  address: {
    type: String,
    optional: true,
    label: "Address"
  },
  address2: {
    type: String,
    optional: true,
    label: "Address Line 2"
  },
  city: {
    type: String,
    optional: true,
    label: "City/Town"
  },
  county: {
    type: String,
    optional: true,
    label: "County/State"
  },
  postcode: {
    type: String,
    optional: true,
    label: "PostCode/Zip"
  },
  country: {
    type: String,
    optional: true,
    label: "Country"
  },
  lat: {
    type: String,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  lng: {
    type: String,
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
  customFields: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  metadata: {
    type: Object,
    blackbox: true,
    optional: true,
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
    label: "Activity Date/Time",
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true,
          widgetPositioning: {
            vertical: "top"
          }
        }
      }
    }
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
  opportunityId: {
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
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  companyId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('contactId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  contactId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('companyId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  userId: {
    type: String,
    label: "Account Manager"
  },
  value: {
    type: Number
  },
  active: {
    type: Boolean,
    defaultValue: true
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
  dueDate: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true,
          widgetPositioning: {
            vertical: "top"
          }
        }
      }
    }
  },
  staff: {
    type: [String],
    optional: true
  }
});
Schemas.Project.messages({
  needsRelatedEntity: "A company or a contact is required"
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
    defaultValue: new Date()
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
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
Schemas.PurchaseOrder.messages({
  needsRelatedEntity: "A company or a contact is required"
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
  }
});
PurchaseOrderItems.attachSchema(Schemas.PurchaseOrderItem);

Schemas.Notification = new SimpleSchema({
  title: {
    type: String
  },
  shortDescription: {
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
  },
  icon: {
    type: String,
    optional: true
  },
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
          sideBySide: true,
          widgetPositioning: {
            vertical: 'top'
          }
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

//Products
Schemas.Product = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    optional: true,
    label: "Sales Price",
    decimal: true
  },
  cost: {
    type: Number,
    optional: true,
    label: "Cost Price",
    decimal: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  }
});
Products.attachSchema(Schemas.Product);

Schemas.Audit = new SimpleSchema({
  token: {
    type: String,
    unique: true
  },
  date: {
    type: Date
  },
  source: {
    type: String,
    defaultValue: 'client'
  },
  level: {
    type: String
  },
  message: {
    type: String
  },
  user: {
    type: String,
    optional: true
  },
  entityType: {
    type: String,
    optional: true
  },
  entityId: {
    type: String,
    optional: true
  }
});
AuditLog.attachSchema(Schemas.Audit);

//Opportunities
Schemas.OpportunityStage = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
  }
});
OpportunityStages.attachSchema(Schemas.OpportunityStage);

Schemas.Opportunity = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true,
          widgetPositioning: {
            vertical: "top"
          }
        }
      }
    }
  },
  value: {
    type: Number,
    optional: true
  },
  estCloseDate: {
    type: Date,
    optional: true,
    label: "Estimated Close Date",
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true,
          widgetPositioning: {
            vertical: "top"
          }
        }
      }
    }
  },
  items: {
    type: Array,
    optional: true
  },
  hasBeenWon: {
    type: Boolean,
    optional: true
  },
  reasonLost: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  isArchived: {
    type: Boolean,
    optional: true
  },
  currentStageId: {
    type: String,
    optional: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  companyId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('contactId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  contactId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('companyId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  'items.$': {
    type: Object
  },
  'items.$.id': {
    type: String
  },
  'items.$.name': {
    type: String
  },
  'items.$.description': {
    type: String,
    optional: true
  },
  'items.$.value': {
    type: Number,
    optional: true,
    decimal: true,
    custom: function() {
      if (this.value !== Math.round(this.value * 100) / 100) {
        return 'valueTo2DecimalPlaces';
      }
    }
  },
  'items.$.quantity': {
    type: Number,
    optional: true
  },
  projectId: {
    type: String,
    optional: true
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});
Schemas.Opportunity.messages({
  needsRelatedEntity: "A company or a contact is required",
  valueTo2DecimalPlaces: "Value must be entered to two decimal places"
});
Opportunities.attachSchema(Schemas.Opportunity);

Schemas.Payment = new SimpleSchema({
  token: {
    type: String
  },
  tenantId: {
    type: String
  },
  date: {
    type: Number
  },
  createdBy: {
    type: String
  },
  cardType: {
    type: String
  },
  cardCountry: {
    type: String
  },
  last4: {
    type: String
  },
  email: {
    type: String
  }
});
Payments.attachSchema(Schemas.Payment);
