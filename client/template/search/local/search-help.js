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
            description: 'Can be set by a specific date (e.g. 25/10/2015) or by an expression (e.g. \'next week\')',
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
    }
  }
})