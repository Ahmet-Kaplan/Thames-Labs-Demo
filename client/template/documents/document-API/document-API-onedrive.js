// documentAPI.onedriveChooser = function(cb) {
//   var pickerOptions = {
//     success: function(files) {
//       var results = _.map(files, function(file) {
//         return {
//           docPath: file.link,
//           docName: file.fileName,
//           fileIcon: 'file-o',
//           service: 'onedrive',
//           serviceIcon: 'windows'
//         };
//       });
//       cb(null, results);
//     },
//     cancel: function() {},
//     linkType: "webViewLink",
//     multiSelect: false
//   };
//
//   OneDrive.open(pickerOptions);
// }
