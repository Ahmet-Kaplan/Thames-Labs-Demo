Template.footer.helpers({
  tenantName: function() {
    var tenant = Tenants.findOne({});
    return !!tenant ? tenant.name : null;
  }
});

Template.footer.events({
    'click #toggle-search': function(event) {
    event.preventDefault();
    var state = Session.get('globalSearchOpen');
    if (state === false) {
      Session.set('globalSearchOpen', true);
      Modal.show('globalSearch');
    } else {
      Session.set('globalSearchOpen', false);
      Modal.hide('globalSearch');
    }
  },
})
