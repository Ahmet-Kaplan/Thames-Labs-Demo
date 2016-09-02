//Note: the values in fieldOptions are the possible csv column names, they must be lowercase only
import { CompanyImportSchema } from '/imports/api/companies/import-schema.js';
import { ContactImportSchema } from '/imports/api/contacts/import-schema.js';
import { ProjectImportSchema } from '/imports/api/projects/import-schema.js';
import { ProductImportSchema } from '/imports/api/products/import-schema.js';
import { OpportunityImportSchema } from '/imports/api/opportunities/import-schema.js';
import { PurchaseOrderImportSchema } from '/imports/api/purchase-orders/import-schema.js';
import { TaskImportSchema } from '/imports/api/tasks/import-schema.js';
import { ActivityImportSchema } from '/imports/api/activities/import-schema.js';

export const importSchema = {
  companies: CompanyImportSchema,
  contacts: ContactImportSchema,
  projects: ProjectImportSchema,
  products: ProductImportSchema,
  opportunities: OpportunityImportSchema,
  purchaseorders: PurchaseOrderImportSchema,
  tasks: TaskImportSchema,
  activities: ActivityImportSchema
};