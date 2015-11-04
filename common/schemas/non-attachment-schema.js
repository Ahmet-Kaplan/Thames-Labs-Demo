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