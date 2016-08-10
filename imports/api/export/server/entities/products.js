//This function takes a product JSON object, and returns another JSON object with required headings for export
const formatProductForExport = (record) => ({
  name: record.name || "",
  description: record.description || "",
  salePrice: record.price || "",
  costPrice: record.cost || ""
});

export { formatProductForExport };