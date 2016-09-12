import './progress-bar.html';

Template.progressBar.onRendered(function() {
  UserSession.set('progressValue', 0);
});

Template.progressBar.helpers({
  'percentComplete': function() {
    return UserSession.get('progressValue');
  }
});