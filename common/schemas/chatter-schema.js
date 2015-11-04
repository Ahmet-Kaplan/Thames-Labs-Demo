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