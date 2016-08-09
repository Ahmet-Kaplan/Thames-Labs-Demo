//This function takes a contact JSON object, and returns another JSON object with required headings for export
const formatContactForExport = (record) => ({
  forename: record.forename || "",
  surname: record.surname || "",
  companyName: record.companyName,
  jobtitle: record.jobtitle || "",
  phone: record.phone || "",
  mobile: record.mobile || "",
  email: record.email || "",
  address: record.address || "",
  address2: record.address2 || "",
  city: record.city || "",
  county: record.county || "",
  country: record.country || "",
  postcode: record.postcode || "",
  tags: record.tags || "",
  createdAt: record.createdAt || ""
});

export { formatContactForExport };