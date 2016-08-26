import './search-help.html';

Template.searchHelp.helpers({
  options: function() {
    switch(this.collection) {
      case 'tasks':
        return [
          {
            name: 'Assignee',
            description: 'Show tasks assigned to the selected user',
            multiple: true
          },
          {
            name: 'Company',
            description: 'Shows tasks connected to the selected company',
            multiple: true
          },
          {
            name: 'Completed',
            description: 'Select whether to show or hide completed tasks',
            multiple: false
          },
          {
            name: 'Contact',
            description: 'Shows tasks connected to the selected contact',
            multiple: true
          },
          {
            name: 'Due After',
            description: 'Shows tasks with a due date after the selected date',
            multiple: false
          },
          {
            name: 'Due Before',
            description: 'Shows tasks with a due date before the selected date',
            multiple: false
          },
          {
            name: 'Due Date',
            description: 'Can be set by a specific date (e.g. ' + moment().format('DD/MM/YYYY') + ') or by an expression ([last/this/next] [week/month], today, tomorrow, yesterday)',
            multiple: false
          },
          {
            name: 'Opportunity',
            description: 'Shows tasks connected to the selected opportunity',
            multiple: true
          },
          {
            name: 'Project',
            description: 'Shows tasks connected to the selected project',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows tasks that have the selected tag',
            multiple: true
          },
          {
            name: 'Subtasks',
            description: 'Show or hide subtasks on the list',
            multiple: false
          }
        ];
      case 'companies':
        return [
          {
            name: 'City',
            description: 'Shows the companies that are in the given city',
            multiple: true
          },
          {
            name: 'Country',
            description: 'Shows the companies that are in the given country',
            multiple: true
          },
          {
            name: 'Postcode',
            description: 'Shows the companies that are in the given postcode',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows companies that have the selected tag',
            multiple: true
          }
        ];
      case 'contacts':
        return [
          {
            name: 'Company',
            description: 'Shows the contacts connected to the given company',
            multiple: true
          },
          {
            name: 'Forename',
            description: 'Shows the contacts with a forename matching the given value. Useful for filtering by first letter of name (e.g "a" will return all contacts with forenames starting with the leter "a")',
            multiple: false
          },
          {
            name: 'Surname',
            description: 'Works the same as forename, but for the surname',
            multiple: false
          },
          {
            name: 'Phone',
            description: 'Shows contacts with the given phone number',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows contacts that have the selected tag',
            multiple: true
          }
        ];
      case 'opportunities':
        return [
          {
            name: 'Company',
            description: 'Shows the opportunities connected to the given company',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'Shows the opportunities connected to the given contact',
            multiple: true
          },
          {
            name: 'Next Action',
            description: 'Shows the opportunities were the next task is overdue or due today',
            multiple: true
          },
          {
            name: 'Phone',
            description: 'Shows opportunities with the given phone number',
            multiple: true
          },
          {
            name: 'Sales Manager',
            description: 'Shows opportunities assigned to the selected user',
            multiple: true
          },
          {
            name: 'Stage',
            description: 'Shows opportunities that are at the selected stage',
            multiple: true
          },
          {
            name: 'Status',
            description: 'Shows opportunities with the selected status',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows opportunities with the selected tag',
            multiple: true
          },
          {
            name: 'Value <',
            description: 'Shows opportunities with a value smaller than the given value. Can be used together with Value >',
            multiple: false
          },
          {
            name: 'Value >',
            description: 'Shows opportunities with a value greater than the given value. Can be used together with Value <',
            multiple: false
          }
        ];
      case 'projects':
        return [
          {
            name: 'Active',
            description: 'Select whether to show or hide active projects',
            mulitple: false
          },
          {
            name: 'Company',
            description: 'Shows the projects connected to the given company',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'Shows the projects connected to the given contact',
            multiple: true
          },
          {
            name: 'Manager',
            description: 'Shows projects assigned to the given user',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows projects with the selected tag',
            multiple: true
          },
          {
            name: 'Due Date',
            description: 'Can be set by a specific date (e.g. ' + moment().format('DD/MM/YYYY') + ') or by an expression ([last/this/next] [week/month], today, tomorrow, yesterday)',
            multiple: false
          },
          {
            name: 'Due After',
            description: 'Shows projects with a due date after the selected date',
            multiple: false
          },
          {
            name: 'Due Before',
            description: 'Shows projects with a due date before the selected date',
            multiple: false
          },
          {
            name: 'Value <',
            description: 'Shows projects with a value smaller than the given value. Can be used together with Value >',
            multiple: false
          },
          {
            name: 'Value >',
            description: 'Shows projects with a value greater than the given value. Can be used together with Value <',
            multiple: false
          }
        ];
      case 'purchaseorders':
        return [
          {
            name: 'Active',
            description: 'Select whether to show or hide active purchase orders',
            mulitple: false
          },
          {
            name: 'Company',
            description: 'Shows purchase orders connected to the given company',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'Shows purchase orders connected to the given company',
            multiple: true
          },
          {
            name: 'Status',
            description: 'Shows projects with the selected status (' + Schemas.PurchaseOrder.schema().status.allowedValues.join(', ') + ')',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows products with the selected tag',
            multiple: true
          },
          {
            name: 'Total Price <',
            description: 'Shows purchase orders with a total price smaller than the given value. Can be used together with Total Price >',
            multiple: false
          },
          {
            name: 'Total Price >',
            description: 'Shows purchase orders with a total price greater than the given value. Can be used together with Total Price <',
            multiple: false
          }
        ];
      case 'products':
        return [
          {
            name: 'Sales Price <',
            description: 'Shows products with a sales price smaller than the given value. Can be used together with Sales Price >',
            multiple: false
          },
          {
            name: 'Sales Price >',
            description: 'Shows products with a sales price greater than the given value. Can be used together with Sales Price <',
            multiple: false
          },
          {
            name: 'Cost Price <',
            description: 'Shows products with a cost price smaller than the given value. Can be used together with Cost Price >',
            multiple: false
          },
          {
            name: 'Cost Price >',
            description: 'Shows products with a cost price greater than the given value. Can be used together with Cost Price <',
            multiple: false
          },
          {
            name: 'Tag',
            description: 'Shows products with the selected tag',
            multiple: true
          }
        ];
      case 'activities':
        return [
          {
            name: 'Activity Date',
            description: 'Can be set by a specific date (e.g. ' + moment().format('DD/MM/YYYY') + ') or by an expression ([last/this/next] [week/month], today, tomorrow, yesterday',
            mulitple: true
          },
          {
            name: 'Date After',
            description: 'Shows activities that happened after the selected date',
            multiple: false
          },
          {
            name: 'Date Before',
            description: 'Shows activities that happened before the selected date',
            multiple: false
          },
          {
            name: 'Record Types',
            description: 'Shows activities with the given record type (e.g companies)',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Shows activities with the selected tag',
            multiple: true
          },
          {
            name: 'Type',
            description: 'Shows activities of the selected type',
            multiple: true
          }
        ];
    }
  }
});
