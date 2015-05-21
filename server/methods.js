// Super secret server only methods

Meteor.methods({

  sendFeedback: function(doc) {
    check(doc, Schemas.Feedback);
    this.unblock();
    var asanaApiKey = 'KAfqgsK.bfT1KDQeXqg1bxEN25c0dLDO',
        asanaWorkspace = '20585633191816',
        asanaProject = '27810469635780';

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

    // Email.send({
    //   to: 'jamie@cambridgesoftware.co.uk',
    //   from: 'admin@elitebms.net',
    //   subject: 'new user feedback',
    //   text: JSON.stringify(doc)
    // });
  }

});
