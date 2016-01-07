Template.searchHelp.helpers({
  options: function() {
    switch(this.collection) {
      case 'tasks':
        return [
          {
            name: 'Assignee',
            description: 'Select amongst your users who the task is assigned to',
            multiple: true
          },
          {
            name: 'Company',
            description: 'The Company tasks have been raised against',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'The Contact tasks have been raised against',
            multiple: true
          },
          {
            name: 'Opportunity',
            description: 'The Opportunity tasks have been raised against',
            multiple: true
          },
          {
            name: 'Project',
            description: 'The Project tasks have been raised against',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Which tags are applied',
            multiple: true
          },
          {
            name: 'Due Date',
            description: 'Can be set by a specific date (e.g. ' + moment().format('DD/MM/YYYY') + ') or by an expression ([last/this/next] [week/month], today, tomorrow, yesterday)',
            multiple: false
          },
          {
            name: 'Due After',
            description: 'Start date',
            multiple: false
          },
          {
            name: 'Due Before',
            description: 'End date',
            multiple: false
          }
        ];
      case 'companies':
        return [
          {
            name: 'City',
            description: 'Displays the company if the city contains the searched value',
            multiple: true
          },
          {
            name: 'Country',
            description: 'Displays the company if the country contains the searched value',
            multiple: true
          },
          {
            name: 'Postcode',
            description: 'Displays the company if the postcode contains the searched value',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Which tags are applied',
            multiple: true
          }
        ];
      case 'contacts':
        return [
          {
            name: 'Company',
            description: 'Select to which company(ies) the contact(s) belong to',
            multiple: true
          },
          {
            name: 'Phone',
            description: 'Displays the contact if the phone number or mobile number contains the searched value',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Which tags are applied',
            multiple: true
          }
        ];
      case 'opportunities':
        return [
          {
            name: 'Company',
            description: 'Select to which company(ies) the opportunity(ies) are related to',
            multiple: true
          },
          {
            name: 'Phone',
            description: 'Select to which contact(s) the opportunity(ies) are related to',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Which tags are applied',
            multiple: true
          },
          {
            name: 'Value <',
            description: 'An upper limit for the value. Can be used together with Value >',
            multiple: false
          },
          {
            name: 'Value >',
            description: 'A lower limit for the value. Can be used together with Value <',
            multiple: false
          }
        ];
      case 'projects':
        return [
          {
            name: 'Company',
            description: 'Select to which company(ies) the project(s) are related to',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'Select to which contact(s) the project(s) are related to',
            multiple: true
          },
          {
            name: 'Manager',
            description: 'Select amongst your users who the task is assigned to',
            multiple: true
          },
          {
            name: 'Tag',
            description: 'Which tags are applied',
            multiple: true
          },
          {
            name: 'Due Date',
            description: 'Can be set by a specific date (e.g. ' + moment().format('DD/MM/YYYY') + ') or by an expression ([last/this/next] [week/month], today, tomorrow, yesterday)',
            multiple: false
          },
          {
            name: 'Due After',
            description: 'Start date',
            multiple: false
          },
          {
            name: 'Due Before',
            description: 'End date',
            multiple: false
          }
        ];
      case 'purchaseorders':
        return [
          {
            name: 'Company',
            description: 'Select to which company(ies) the purchase order(s) are related to',
            multiple: true
          },
          {
            name: 'Contact',
            description: 'Select to which contact(s) the purchase order(s) are related to',
            multiple: true
          },
          {
            name: 'Status',
            description: 'Select amongst the different statuses (' + Schemas.PurchaseOrder.schema().status.allowedValues.join(', ') + ')',
            multiple: true
          }
        ];
      case 'products':
        return [
          {
            name: 'Sales Price <',
            description: 'An upper limit for the sales price. Can be used together with Sales Price >',
            multiple: false
          },
          {
            name: 'Sales Price >',
            description: 'A lower limit for the sales price. Can be used together with Sales Price <',
            multiple: false
          },
          {
            name: 'Cost Price <',
            description: 'An upper limit for the cost price. Can be used together with Cost Price >',
            multiple: false
          },
          {
            name: 'Cost Price >',
            description: 'A lower limit for the cost price. Can be used together with Cost Price <',
            multiple: false
          }
        ];
    }
  }
})