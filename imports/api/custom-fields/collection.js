import { CustomFieldSchema } from './schema.js';
export const CustomFields = new Mongo.Collection('customFields');

CustomFields.attachSchema(CustomFieldSchema);

CustomFields.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();

Partitioner.partitionCollection(CustomFields);