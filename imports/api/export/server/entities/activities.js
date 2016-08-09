//This function takes an activity JSON object, and returns another JSON object with required headings for export
const formatActivityForExport = (record) => {
  if (record.activityTimestamp) {
    record.activityTimestamp = moment(record.activityTimestamp).format('DD/MM/YY hh:mm');
  }

  return {
    type: record.type || "",
    notes: record.notes || "",
    createdAt: record.createdAt || "",
    activityTimestamp: record.activityTimestamp || "",
    recordType: record.primaryEntityType || "",
    recordName: record.primaryEntityDisplayData || ""
  };
};

export { formatActivityForExport };