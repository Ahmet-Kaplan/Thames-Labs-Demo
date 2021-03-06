export function createTenant(name) {
  const defaultTenant = {
    name: name,
    settings: {
      extInfo: {
        company: [],
        contact: [],
        job: [],
        product: []
      },
      activity: {
        defaultNumber: 1,
      },
      task: {
        defaultNumber: 1,
      },
      company: {
        defaultNumber: 1,
      },
      contact: {
        defaultNumber: 1,
      },
      opportunity: {
        defaultNumber: 1,
        stages: []
      },
      job: {
        defaultNumber: 1,
        types: []
      },
      purchaseorder: {
        defaultPrefix: "",
        defaultNumber: 1,
      },
      product: {
        defaultNumber: 1,
      }
    },
    stripe: {},
    createdAt: new Date()
  };
  const { Tenants } = require('/imports/api/collections.js');
  return Tenants.insert(defaultTenant);
}
