Template.companies.onRendered(function() {
  // var sidebar = $('.sidebar').affix({
  //   offset: {
  //     top: function() {
  //       return $('.sidebar').offset().top
  //     }
  //   }
  // });
  // sidebar.width(sidebar.parent().width());
});

Template.companies.events({
  'click .add-random': function() {
    Meteor.call('addRandomCompany');
  }
});

Template.companyDetail.helpers({
  addressString: function() {
    return encodeURIComponent([
      this.address,
      this.city,
      this.country,
      this.postcode
    ].join(', '));
  },
  phoneHref: function(number) {
    return 'tel:' + number;
  }
});
