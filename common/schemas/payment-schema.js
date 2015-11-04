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
