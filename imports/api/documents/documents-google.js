// See https://developers.google.com/picker/docs/ for details on this crazy!

// The Browser API key obtained from the Google Developers Console.
var developerKey = Meteor.settings.public.googleDeveloperKey;
// Google App ID. (Its the first number in the Client ID)
var appId = Meteor.settings.public.googleAppId;
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = Meteor.settings.public.googleClientKey;
// Scope to use to access user's photos.
var scope = ['https://www.googleapis.com/auth/drive'];
// Callback to send results
var callback = null;

// A simple callback implementation.
function pickerCallback(data) {
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var docUrl = '',
        friendlyName = '',
        doc = data[google.picker.Response.DOCUMENTS][0];

    docUrl = doc[google.picker.Document.URL];
    friendlyName = doc[google.picker.Document.NAME];
    docId = doc[google.picker.Document.ID];

    const cbData = {
      docPath: docUrl,
      docName: friendlyName,
      fileIcon: 'file-o',
      service: 'google',
      serviceIcon: 'google',
      fileId: docId,
    };

    // Callback expects a list
    callback(null, [cbData]);
  }
}

// Create and render a Picker object for picking user docs
function createPicker(authResult) {
  if (authResult.access_token) {
    var picker = new google.picker.PickerBuilder()
      .setAppId(appId)
      .addView(google.picker.ViewId.FOLDERS)
      .setOrigin(window.location.protocol + "//" + window.location.host)
      .setOAuthToken(authResult.access_token)
      .setDeveloperKey(developerKey)
      .setCallback(pickerCallback)
      .build();

    if (picker) {
      picker.setVisible(true);
    }
  }
}

const googleChooser = (cb) => {
  callback = cb;
  gapi.auth.authorize({
    'client_id': clientId,
    'scope': scope,
    'immediate': false
  },
    createPicker
  );
};

export { googleChooser };