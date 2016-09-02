export const UserSchema = new SimpleSchema({
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
    },
    custom: function() {
      // Do server side check for uniqueness as client doesn't have list of all users
      if (Meteor.isClient && this.isSet) {
        Meteor.call('isEmailAvailable', this.value, (error, result) => {
          if (result === false) {
            // Would be good to do this for any context, but unsure how to do this
            UserSchema.namedContext('insertTenantUserModal').addInvalidKeys([
              { name: 'email', type: 'emailTaken' }
            ]);
          }
        });
      }
    }
  },
  password: {
    type: String,
    min: 6,
    optional: true
  },
  roles: {
    type: [String],
    optional: true
  },
  group: {
    type: String
  }
});
UserSchema.messages({
  emailTaken: "This email address is already registered with RealTimeCRM"
});

export const UserSignUpSchema = new SimpleSchema({
  name: {
    type: String,
    label: 'Your name'
  },
  email: {
    label: 'Email address',
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    unique: true,
    autoValue: function() {
      if (this.isSet && typeof this.value === "string") {
        return this.value.toLowerCase();
      }
    },
    custom: function() {
      // Do server side check for uniqueness as client doesn't have list of all users
      if (Meteor.isClient && this.isSet) {
        Meteor.call('isEmailAvailable', this.value, (error, result) => {
          if (result === false) {
            // Would be good to do this for any context, but unsure how to do this
            UserSignUpSchema.namedContext('signUpForm').addInvalidKeys([
              { name: 'email', type: 'emailTaken' }
            ]);
          }
        });
      }
    }
  },
  companyName: {
    label: 'Company name',
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
UserSignUpSchema.messages({
  emailTaken: "This email address is already registered with RealTimeCRM"
});
