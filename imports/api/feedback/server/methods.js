import { FeedbackSchema } from '/imports/api/feedback/schema.js';

Meteor.methods({

  'feedback.sendFeedback': function(doc) {
    check(doc, FeedbackSchema);
    this.unblock();

    var asanaApiKey = process.env.ASANA_API_KEY;
    if (typeof asanaApiKey == 'undefined') {
      throw new Meteor.Error(500, 'No asana API key set');
    }

    var asanaWorkspace = '20585633191816',
        asanaProject = '36900399110512';

    HTTP.post('https://app.asana.com/api/1.0/tasks', {
      auth: asanaApiKey + ':',
      data: {
        data: {
          name: _.truncate(doc.message),
          projects: asanaProject,
          workspace: asanaWorkspace,
          notes: doc.message + '\n\nurl: ' + doc.url + '\nname: ' + doc.name + '\nemail: ' + doc.email
        }
      }
    }, function(error) {
      if (error) throw new Meteor.Error('feedback-failure', error);
    });
  }

});