import './generating-demo-data.html';

Template.generatingDemoData.helpers({
  totalStep: function() {
    return ServerSession.get('demoDataProgress').total;
  },
  currentStep: function() {
    const demoData = ServerSession.get('demoDataProgress');
    return demoData.completed / demoData.total * 100;
  }
});