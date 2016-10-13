import './data-dump.html';

Template.dataDump.events({
  'click #dump-data': function() {

    var zip = new JSZip();

    Meteor.call('search.dataDump', function(e, r) {
      if (e) throw new Meteor.Error(e);
      if (r) {
        _.each(r, function(res) {
          var fileData = Papa.unparse(res.data);
          zip.file(res.name + ".csv", fileData);
        });
        var blob = zip.generate({
          type: "blob"
        });
        saveAs(blob, "Thames Labs Data Extract " + moment().format('DD-MM-YYYY') + ".zip");
      }
    });
  }
});