Template.insertCompanyContactModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertCompanyContactModal.helpers({
  companiesAsOptions: function() {

    return Companies.find({}, {
      sort: {
        name: 1
      }
    }).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.insertContactModal.onRendered(function() {
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });
});

Template.insertContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});
