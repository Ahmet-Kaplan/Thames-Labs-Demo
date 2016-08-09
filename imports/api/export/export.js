import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
if (Meteor.isServer) {
  // These column names are removed from all final exports
  // They may be used for interim processing - e.g. looking up related data
  const OMITTEDCOLUMNS = [
    '_id',
    'createdBy',
    'companyId',
    'contactId',
    'opportunityId',
    'projectId',
    'purchaseOrderId',
    'taskId',
    'productId',
    'currentStageId',
    'items',
    'userId',
    'supplierCompanyId',
    'supplierContactId',
    'primaryEntityId',
    'documents',
    'customFields',
    'extendedInformation',
    'metadata',
    'sequencedIdentifier',
    'assigneeId',
    'entityId',
    'entityType',
    'projectTypeId',
    'projectMilestoneId',
    'stripe'
  ];

  Meteor.methods({

    'search.export': function(collectionName, searchDefinition, searchOptions) {

      // We require a user as we make find calls on partitioned collections
      if (!this.userId) throw new Meteor.Error('401', 'Must be a logged in user to perform export');

      if (!Collections[collectionName] || !Collections[collectionName].index) {
        throw new Meteor.Error('500', 'Search index not found');
      }

      searchOptions.limit = 99999;
      if (!searchOptions.props) searchOptions.props = {};
      searchOptions.props.export = true;
      var index = Collections[collectionName].index;
      var results = index.search(searchDefinition, searchOptions).fetch();

      return results.map( (record) => {

        if (record.companyId) {
          const company = Companies.findOne({
            _id: record.companyId
          });
          record.companyName = company ? company.name : "";
        }

        if (record.contactId) {
          const contact = Contacts.findOne({
            _id: record.contactId
          });
          record.contactName = contact ? contact.name() : "";
        }

        if (record.createdAt) {
          record.createdAt = moment(record.createdAt).format('DD/MM/YY');
        }

        switch(collectionName) {
          case "companies":
            return {
              name: record.name || "",
              address: record.address || "",
              address2: record.address2 || "",
              city: record.city || "",
              county: record.county || "",
              country: record.country || "",
              postcode: record.postcode || "",
              phone: record.phone || "",
              website: record.website || "",
              tags: record.tags || "",
              createdAt: record.createdAt || ""
            };

          case "contacts":
            return {
              forename: record.forename || "",
              surname: record.surname || "",
              companyName: record.companyName,
              jobtitle: record.jobtitle || "",
              phone: record.phone || "",
              mobile: record.mobile || "",
              email: record.email || "",
              address: record.address || "",
              address2: record.address2 || "",
              city: record.city || "",
              county: record.county || "",
              country: record.country || "",
              postcode: record.postcode || "",
              tags: record.tags || "",
              createdAt: record.createdAt || ""
            };

          case "opportunities":
            if (record.salesManagerId) {
              const salesManager = Meteor.users.findOne({
                _id: record.salesManagerId,
                profile: {
                  $exists: true
                }
              });
              record.salesManager = salesManager ? salesManager.profile.name : "";
            }

            if ( _.has(record, 'currentStageId') ) {
              const tenant = Tenants.findOne({
                _id: Partitioner.group()
              });
              const stages = tenant.settings.opportunity.stages,
                    currentStage = _.find(stages, { 'id': record.currentStageId });
              record.stage = currentStage ? currentStage.title : "";
            }

            if ( _.has(record, 'value') ) {
              if(record.value) record.value = record.value.toFixed(2);
              else record.value = "0.00";
            } else {
              record.value = "0.00";
            }

            if (record.date) {
              record.date = moment(record.date).format('DD/MM/YY');
            }
            if (record.estCloseDate) {
              record.estCloseDate = moment(record.estCloseDate).format('DD/MM/YY');
            }

            return {
              name: record.name || "",
              description: record.description || "",
              stage: record.stage || "",
              date: record.date || "",
              estCloseDate: record.estCloseDate || "",
              value: record.value || "",
              salesManager: record.salesManager,
              companyName: record.companyName,
              contactName: record.contactName,
              tags: record.tags || ""
            };

          case "projects":
            if (record.staff) {
              const staffList = [];
              _.each(record.staff, function(staffId) {
                const staff = Meteor.users.findOne({
                  _id: staffId,
                  "profile.name": {
                    $exists: true
                  }
                });
                staffList.push(staff.profile.name);
              });
              record.staff = staffList.length > 0 ? staffList.join(',') : 'Not assigned';
            }

            if ( _.has(record, 'projectTypeId') ) {
              const tenant = Tenants.findOne({
                _id: Partitioner.group()
              });
              const projects = tenant.settings.project.types,
                    project = _.find(projects, { 'id': record.projectTypeId });
              record.project = project ? project.name : "";

              if ( _.has(record, 'projectMilestoneId') && project && project.milestones ) {
                const milestone = _.find(project.milestones, { 'id': record.projectMilestoneId });
                record.milestone = milestone ? milestone.name : "";
              }
            }

            if (record.dueDate) {
              record.dueDate = moment(record.dueDate).format('DD/MM/YY');
            }

            if ( _.has(record, 'active') ) {
              record.active = record.active ? 'Yes' : 'No';
            }

            return {
              name: record.name || "",
              description: record.description || "",
              projectType: record.project || "",
              milestone: record.milestone || "",
              value: record.value,
              dueDate: record.dueDate || "",
              staff: record.staff || "",
              active: record.active,
              tags: record.tags || "",
              companyName: record.companyName || "",
              contactName: record.contactName || "",
            };

          case "products":
            return {
              name: record.name || "",
              description: record.description || "",
              salePrice: record.price || "",
              costPrice: record.cost || ""
            };

          case "activities":
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

          case "purchaseorders":
            record.supplierCompany = "";
            if (record.supplierCompanyId) {
              const company = Companies.findOne({
                _id: record.supplierCompanyId
              });
              record.supplierCompany = company ? company.name : "";
            }

            record.supplierContact = "";
            if (record.supplierContactId) {
              const contact = Contacts.findOne({
                _id: record.supplierContactId
              });
              record.supplierContact = contact ? contact.name() : "";
            }

            if (record.orderDate) {
              record.orderDate = moment(record.orderDate).format('DD/MM/YY');
            }

            if ( _.has(record, 'locked') ) {
              record.locked = record.locked ? 'Yes' : 'No';
            }

            return {
              description: record.description || "",
              status: record.status || "",
              orderDate: record.orderDate || "",
              paymentMethod: record.paymentMethod || "",
              notes: record.notes || "",
              locked: record.locked,
              totalValue: record.totalValue,
              supplier: record.supplierCompany,
              supplierContact: record.supplierContact,
              supplierReference: record.supplierReference || "",
              tags: record.tags || "",
              createdAt: record.createdAt || ""
            };

          case "tasks":
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
              record.dueDate = moment(record.dueDate).format('DD/MM/YY');
            }

            if (record.completedAt) {
              record.completedAt = moment(record.completedAt).format('DD/MM/YY');
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

          default:
            return _.omit(record, OMITTEDCOLUMNS);
        }
      });
    }
  });
}