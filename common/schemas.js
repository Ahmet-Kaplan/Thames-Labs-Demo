// Outlines the schema used when talking to the database.

Schemas = {};

// Define schema for Customer object
Schemas.Customer = new SimpleSchema({
  name: {
    type: String,
    label: 'Customer name',
    unique: true
  }
});

// Add schema to collection
Customers.attachSchema(Schemas.Customer);

// Define Schema for User object
// NB! We don't attach to collection as this is only used for
// validation before passing to Accounts.createUser()
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
    regEx: SimpleSchema.RegEx.Email
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

Schemas.Company = new SimpleSchema({
  name: {
    type: String,
    label: "Company name"
  },
  address: {
    type: String,
    label: "Address"
  },
  city: {
    type: String,
    label: "City/Town"
  },
  county: {
    type: String,
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
  }
});
Companies.attachSchema(Schemas.Company);

// This is just used for the feedback form - no attachment
// to a collection
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

Schemas.Contact = new SimpleSchema({
  title: {
    type: String,
    allowedValues: [
      "Mr",
      "Mrs",
      "Miss",
      "Dr"
    ]
  },
  forename: {
    type: String
  },
  surname: {
    type: String
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
  companyId: {
    type: String
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
  }
});

Activities.attachSchema(Schemas.Activity);

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
    label: "Account Manager",
    // autoform: {
    //   options: function() {
    //     return _.map(Meteor.users, function(user) {
    //       return {
    //         'label': user.profile.name,
    //         'value': user._id
    //       };
    //     });
    //   }
    // }
  },
  status: {
    type: String,
    allowedValues: [
      'Proposed',
      'Quoted',
      'Accepted',
      'Lost',
      'Ordered',
      'Incomplete',
      'Completed'
    ]
  },
  value: {
    type: Number
  },
  probability: {
    type: Number
  },
  lastActionDate: {
    type: Date,
    optional: true
  },
  nextActionBy: {
    type: String,
    optional: true,
    // autoform: {
    //   options: function() {
    //     return _.map(Meteor.users, function(user) {
    //
    //       return {
    //         'label': user.profile.name,
    //         'value': user._id
    //       };
    //     });
    //   }
    // }
  }
});
Projects.attachSchema(Schemas.Project);
