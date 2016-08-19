import './export.html';

Template.exportCollection.helpers({
  date() {
    return moment().format("DD/MM/YYYY");
  }
});

Template.exportCollection.events({
  'click #export': function(e) {
    e.preventDefault();

    const collectionName = Template.currentData().entity;
    if (!Collections[collectionName]) {
      throw new Meteor.Error('collection-missing', 'Collection not found');
    }

    if (!Collections[collectionName].index) {
      throw new Meteor.Error('index-missing', 'Search index not found');
    }

    const index = Collections[collectionName].index,
          searchDefinition = index.getComponentDict().get('searchDefinition'),
          searchOptions = index.getComponentDict().get('searchOptions');

    Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, results) => {
      if (err) {
        throw new Meteor.Error('500', err);
      }

      const filename = [
        'RealTimeCRM-',
        collectionName,
        '-',
        moment().format("DD/MM/YYYY"),
        '.csv'
      ].join('');

      const fileData = Papa.unparse(results);

      const blob = new Blob([fileData], {
        type: "text/csv;charset=utf-8"
      });

      saveAs(blob, filename);
    });
  }
});