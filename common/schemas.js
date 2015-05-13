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
