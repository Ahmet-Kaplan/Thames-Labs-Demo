Schema = {};
Schema.company = new SimpleSchema({
  Company: {
    type: String,
    label: "Company name",
    max: 50
  },
  Address: {
    type: String,
    label: "Address",
    max: 1000
  },
  City: {
    type: String,
    label: 'City/Town',
    max: 50
  },
  County: {
    type: String,
    label: 'County/State',
    max: 50
  },
  PostCode: {
    type: String,
    label: 'PostCode/Zip',
    max: 20
  },
  Country: {
    type: String,
    label: 'Country',
    max: 50
  },
  WebSite: {
    type: String,
    label: 'Website',
    regEx: SimpleSchema.RegEx.Url
  }
});
