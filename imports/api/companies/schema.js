export const CompanySchema = new SimpleSchema({
  sequencedIdentifier: {
    type: Number,
    label: "ID",
    optional: true
  },
  name: {
    type: String,
    label: "Company name"
  },
  name_sort: {
    type: String,
    optional: false,
    autoValue: function() {
      const name = this.field("name");
      if (name.isSet) return name.value.toLowerCase();
    }
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
    regEx: /(^$)|((https?:\/\/)?([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,6})([\/\w \.-]*)*\/?)/,
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
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
CompanySchema.messages({
  "regEx website": "The website address is not valid"
});
