// Super secret server only methods
Meteor.methods({
  sendFeedback: function(doc) {
    check(doc, Schemas.Feedback);
    this.unblock();
    var asanaApiKey = '7U5d5HNS.9gBvXvNdFeaiNoajrOvchS7',
        asanaWorkspace = '20585633191816',
        asanaProject = '36900399110512';

    HTTP.post('https://app.asana.com/api/1.0/tasks', {
      auth: asanaApiKey + ':',
      data: {
        data: {
          name: _.trunc(doc.message),
          projects: asanaProject,
          workspace: asanaWorkspace,
          notes: doc.message + '\n\nurl: ' + doc.url + '\nname: ' + doc.name
        }
      }
    }, function(error, result) {
      if (error) console.log(error);
    });
  },

  switchTenancy: function(user, target){
    Partitioner.clearUserGroup(user);
    Partitioner.setUserGroup(user, target);
  }
});
