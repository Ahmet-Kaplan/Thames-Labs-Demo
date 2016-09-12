export const TaskImportSchema = [
  {
    fieldLabel: 'Title',
    fieldIdentifier: 'title',
    fieldOptions: ['title', 'name'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Description',
    fieldIdentifier: 'description',
    fieldOptions: ['description', 'desc', 'details'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Assigned User',
    fieldIdentifier: 'assignee',
    fieldOptions: ['assignee', 'assigned user', 'user'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Due Date',
    fieldIdentifier: 'dueDate',
    fieldOptions: ['due date', 'duedate'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Record Name',
    fieldIdentifier: 'record',
    fieldOptions: ['record', 'recordname', 'record name', 'relatedrecord', 'related record'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Record Type',
    fieldIdentifier: 'recordType',
    fieldOptions: ['record type', 'recordtype', 'entity', 'entitytype', 'relatedrecordtype', 'related record type'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Tags',
    fieldIdentifier: 'tags',
    fieldOptions: ['tags'],
    fieldType: 'default',
    required: false
  }];