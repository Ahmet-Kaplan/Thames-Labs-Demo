// Outlines the schema used when talking to the database.

Schemas = {};

Schemas.Customer = new SimpleSchema({
  name: {
    type: String,
    label: 'Customer name'
  }
});

Customers.attachSchema(Schemas.Customer);
