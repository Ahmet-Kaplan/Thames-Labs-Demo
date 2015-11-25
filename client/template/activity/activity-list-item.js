Template.activityListItem.onCreated(function() {
  var templateRef = this;
  this.displayData = new ReactiveVar("<blank>");

  this.autorun(function() {
    var ref = templateRef.data;

    var icon = "fa fa-fw fa-";

    if (ref.taskId) {
      templateRef.displayData.set('<i class="fa fa-fw fa-check"></i> ' + ref.primaryEntityDisplayData);
    } else {
      switch (ref.primaryEntityType) {
        case 'company':
          icon = icon + 'building';
          break;
        case 'contact':
          icon = icon + 'user';
          break;
        case 'opportunity':
          icon = icon + 'lightbulb-o';
          break;
        case 'project':
          icon = icon + 'sitemap';
          break;
        case 'purchaseOrder':
          icon = icon + 'shopping-cart';
          break;
      }

      templateRef.displayData.set('<i class="' + icon + '"></i> ' + ref.primaryEntityDisplayData);
    }
  });
});

Template.activityListItem.helpers({
  fromNow: function(date) {
    if (date) {
      return moment(date).fromNow();
    } else {
      return "Date/time not specified";
    }
  },
  entityData: function() {
    return Template.instance().displayData.get();
  }
});
