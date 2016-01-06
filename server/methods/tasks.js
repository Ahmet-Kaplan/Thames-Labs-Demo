Meteor.methods({
  deleteCompletedTasks: function(searchDefinition, searchOptions) {
    if (!Roles.userIsInRole(this.userId, ['Administrator', 'CanDeleteTasks'])) {
      throw new Meteor.Error(403, 'You do not have the authorization to delete tasks');
    }
    searchOptions.limit = 99999;
    var tasksArray = TasksIndex.search(searchDefinition, searchOptions).fetch();
    _.each(tasksArray, function(task) {
      Tasks.remove(task._id);
    });
  },
  "tasks.export": function(searchDefinition, searchOptions) {
    var returnData = [];

    if (!Collections['tasks'] || !Collections['tasks'].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }
    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    var index = Collections['tasks'].index;
    var result = index.search(searchDefinition, searchOptions).fetch();
    // return result;

    _.each(result, function(res) {
      var assignee = 'Not assigned',
        entityDescriptor = '',
        taskDate = '',
        recordEntity = '';
      if (res.assigneeId) {
        assignee = Meteor.users.findOne({
          _id: res.assigneeId
        }).profile.name;
      }
      if (res.dueDate) {
        taskDate = moment(res.dueDate).format('MMMM Do YYYY, h:mm:ss a');
      }

      switch (res.entityType) {
        case 'company':
          recordEntity = '(Company)';
          entityDescriptor = Companies.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'contact':
          recordEntity = '(Contact)';
          var contact = Contacts.findOne({
            _id: res.entityId
          });
          entityDescriptor = contact.forename + " " + contact.surname;
          break;
        case 'opportunity':
          recordEntity = '(Opportunity)';
          entityDescriptor = Opportunities.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'project':
          recordEntity = '(Project)';
          entityDescriptor = Projects.findOne({
            _id: res.entityId
          }).name;
          break;
        case 'user':
          entityDescriptor = Meteor.users.findOne({
            _id: res.entityId
          }).profile.name;
          break;
      }

      var entity = {
        title: res.title,
        description: res.description,
        assignee: assignee,
        dueDate: taskDate,
        record: (res.entityType === "user" ? undefined : entityDescriptor + " " + recordEntity),
        completed: (res.completed === true ? 'Yes' : 'No')
      };
      returnData.push(entity);
    });

    return returnData;
  }
});
