import { moment } from 'meteor/momentjs:moment';
import htmlToText from "html-to-text";

//This function takes an activity JSON object, and returns another JSON object with required headings for export
const formatActivityForExport = (record) => {
  if (record.activityTimestamp) {
    record.activityTimestamp = moment(record.activityTimestamp).format('DD/MM/YY hh:mm');
  }

  record.notes = htmlToText.fromString(record.notes, {
    uppercaseHeadings: false
  });

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