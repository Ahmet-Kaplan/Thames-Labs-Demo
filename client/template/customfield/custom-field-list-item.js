Template.cfDisplay.helpers({
  parentHelper: function(parentContext) {
    this.parentEntity = parentContext;
  },
  trimmedName: function() {
    if (this.name) {
      return this.name.replace(/\s/g, '');
    }
  },
  isAdvancedText: function() {
    return this.type === "advtext";
  }
});

Template.cfDisplay.events({
  'click #delete-custom-field': function(event) {
    event.preventDefault();
    var self = this;
    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {
        Meteor.call('extInfo.deleteLocal', self._id, function(err, res) {
          if (err) throw new Meteor.Error(err);
          toastr.success('Custom field removed.');
        });
      } else {
        return;
      }
    });
  }
});