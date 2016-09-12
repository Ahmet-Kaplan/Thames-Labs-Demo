export const ActivityImportSchema = [
  {
    fieldLabel: 'Type',
    fieldIdentifier: 'type',
    fieldOptions: ['type', 'activitytype'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Date',
    fieldIdentifier: 'date',
    fieldOptions: ['date', 'activitytimestamp'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Notes',
    fieldIdentifier: 'notes',
    fieldOptions: ['notes', 'content', 'description'],
    fieldType: 'default',
    required: true
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