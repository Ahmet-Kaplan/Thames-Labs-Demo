import _ from 'lodash';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Opportunities } from '/imports/api/collections.js';

//This function takes an task JSON object, and returns another JSON object with required headings for export
const formatTaskForExport = (record) => {
  // This is to deal with related entities on tasks
  if (record.entityType && record.entityId) {
    record.relatedRecordType = record.entityType;

    switch (record.entityType) {
      case 'company':
        const company = Companies.findOne({
          _id: record.entityId
        });
        record.relatedRecord = company ? company.name : null;
        break;
      case 'contact':
        const contact = Contacts.findOne({
          _id: record.entityId
        });
        record.relatedRecord = contact ? contact.name() : null;
        break;
      case 'opportunity':
        const opportunity = Opportunities.findOne({
          _id: record.entityId
        });
        record.relatedRecord = opportunity ? opportunity.name : null;
        break;
      case 'project':
        const project = Projects.findOne({
          _id: record.entityId
        });
        record.relatedRecord = project ? project.name : null;
        break;
      case 'user':
        const user = Meteor.users.findOne({
          _id: record.entityId,
          profile: {
            $exists: true
          }
        });
        record.relatedRecord = user ? user.profile.name : null;
        break;
    }
  }

  if ( _.has(record, 'completed') ) {
    record.completed = record.completed ? 'Yes' : 'No';
  }

  if ( _.has(record, 'isAllDay') ) {
    record.isAllDay = record.isAllDay ? 'Yes' : 'No';
  }

  if (record.dueDate) {
    record.dueDate = moment(record.dueDate).format('DD/MM/YY hh:mm');
  }

  if (record.completedAt) {
    record.completedAt = moment(record.completedAt).format('DD/MM/YY hh:mm');
  }

  if (record.assigneeId) {
    const assignee = Meteor.users.findOne({
      _id: record.assigneeId,
      "profile.name": {
        $exists: true
      }
    });
    record.assignee = assignee ? assignee.profile.name : 'Not assigned';
  }

  return {
    title: record.title || "",
    description: record.description || "",
    dueDate: record.dueDate || "",
    isAllDay: record.isAllDay || "",
    completed: record.completed || "",
    assignee: record.assignee || "",
    relatedRecord: record.relatedRecord || "",
    relatedRecordType: record.relatedRecordType || ""
  };
};

export { formatTaskForExport };