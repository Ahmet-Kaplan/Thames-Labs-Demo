//Note: the values in fieldOptions are the possible csv column names, they must be lowercase only
import { CompanyImportSchema } from '/imports/api/companies/import-schema.js';
import { ContactImportSchema } from '/imports/api/contacts/import-schema.js';
import { JobImportSchema } from '/imports/api/jobs/import-schema.js';
import { TaskImportSchema } from '/imports/api/tasks/import-schema.js';
import { ActivityImportSchema } from '/imports/api/activities/import-schema.js';

export const importSchema = {
  companies: CompanyImportSchema,
  contacts: ContactImportSchema,
  jobs: JobImportSchema,
  tasks: TaskImportSchema,
  activities: ActivityImportSchema
};