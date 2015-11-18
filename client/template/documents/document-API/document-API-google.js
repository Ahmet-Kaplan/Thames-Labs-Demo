// See https://developers.google.com/picker/docs/ for details on this crazy!

// The Browser API key obtained from the Google Developers Console.
var developerKey = Meteor.settings.public.googleDeveloperKey;
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = Meteor.settings.public.googleClientKey;
// Scope to use to access user's photos.
var scope = ['https://www.googleapis.com/auth/drive.readonly'];
// Callback to send results
var callback = null;

// A simple callback implementation.
var pickerCallback = function(data) {
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var docUrl = '',
      friendlyName = '';
    var doc = data[google.picker.Response.DOCUMENTS][0];

    docUrl = doc[google.picker.Document.URL];
    friendlyName = doc[google.picker.Document.NAME];

    var data = {
      docPath: docUrl,
      docName: friendlyName,
      fileIcon: 'file-o',
      service: 'google',
      serviceIcon: 'google'
    };

    // Callback expects a list
    callback(null, [data]);
  }
};

// Create and render a Picker object for picking user docs
var createPicker = function(authResult) {
  if (authResult.access_token) {
    var picker = new google.picker.PickerBuilder()
      .addView(google.picker.ViewId.FOLDERS)
      .setOAuthToken(authResult.access_token)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }
};

documentAPI.googleChooser = function(cb) {
  callback = cb;
  gapi.auth.authorize(
    {
      'client_id': clientId,
      'scope': scope,
      'immediate': false
    },
    createPicker
  );
};
