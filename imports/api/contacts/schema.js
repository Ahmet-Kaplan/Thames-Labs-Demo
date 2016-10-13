export const ContactSchema = new SimpleSchema({
  sequencedIdentifier: {
    type: Number,
    label: "ID",
    optional: true
  },
  title: {
    label: 'Title',
    type: String,
    optional: true
  },
  forename: {
    type: String
  },
  surname: {
    type: String
  },
  name_sort: {
    type: String,
    optional: false,
    autoValue: function() {
      const forename = this.field("forename");
      const surname = this.field("surname");
      if (forename.isSet && surname.isSet) return `${surname.value.toLowerCase()} ${forename.value.toLowerCase()}`;
    }
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
    label: "Company",
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
  extendedInformation: {
    type: [Object],
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
  },
  documents: {
    type: [Object],
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});