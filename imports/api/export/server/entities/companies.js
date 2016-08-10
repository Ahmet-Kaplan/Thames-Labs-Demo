//This function takes a company JSON object, and returns another JSON object with required headings for export
const formatCompanyForExport = (record) => ({
  name: record.name || "",
  address: record.address || "",
  address2: record.address2 || "",
  city: record.city || "",
  county: record.county || "",
  country: record.country || "",
  postcode: record.postcode || "",
  phone: record.phone || "",
  website: record.website || "",
  tags: record.tags || "",
  createdAt: record.createdAt || ""
});

export { formatCompanyForExport };