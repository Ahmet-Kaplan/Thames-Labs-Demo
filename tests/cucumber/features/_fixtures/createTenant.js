export function createTenant(name) {
  const defaultTenant = {
    name: name,
    settings: {
      extInfo: {
        company: [],
        contact: [],
        project: [],
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
      project: {
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

  return Tenants.insert(defaultTenant);
}
