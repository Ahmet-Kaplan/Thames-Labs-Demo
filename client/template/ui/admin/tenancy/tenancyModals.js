Template.updateTenantSettings.helpers({
  settings: function() {
    var ret = [];

    for (var property in this.settings) {
      var o = {
        name: property,
        value: this.settings[property]
      };
      ret.push(o);
    }

    return ret;
  }
});

Template.updateTenantSettings.events({
  'click #btnSubmitSettings': function() {

    var o = {};
    for (var p in this.settings) {
      o[p] = $('#val-' + p).val();
    }

    Tenants.update(this._id, {
      $set: {
        settings: o
      }
    });

    Modal.hide();
    toastr.success("Settings saved.");
  }
});
