Schemas.Company = new SimpleSchema({
  sequencedIdentifier: {
    type: Number,
    label: "RealTime ID"
  },
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
    regEx: /(^$)|((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/,
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
    },
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  companiesHouseId: {
    type: String,
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
  }
});
Companies.attachSchema(Schemas.Company);
