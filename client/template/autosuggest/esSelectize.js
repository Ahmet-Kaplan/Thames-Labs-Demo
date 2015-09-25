Template.esSelectize.onRendered(function() {
  $('#selectizer').selectize({
    create: false,
    closeAfterSelect: true,
    labelField: "id",
    valueField: "name",
    sortField: "name"
  });
});

Template.insertContactModal.events({
  'keyup input': function() {
    var selectize = $('#selectizer')[0].selectize;
    selectize.addOption({id: '111', name: 'Cambridge Software Ltd'});
    console.warn('keyup', selectize)
  }
});
