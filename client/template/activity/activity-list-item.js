Template.activityListItem.onCreated(function() {
  var templateRef = this;
  this.displayName = new ReactiveVar("<blank>");
  this.displayIcon = new ReactiveVar("<blank>");

  this.autorun(function() {
    var ref = templateRef.data;

    var icon = "fa fa-fw fa-";

    if (ref.taskId) {
      templateRef.displayName.set(ref.primaryEntityDisplayData);
      templateRef.displayIcon.set('fa fa-fw fa-check');
    } else {
      switch (ref.primaryEntityType) {
        case 'companies':
          icon = icon + 'building';
          break;
        case 'contacts':
          icon = icon + 'user';
          break;
        case 'opportunities':
          icon = icon + 'lightbulb-o';
          break;
        case 'projects':
          icon = icon + 'sitemap';
          break;
        case 'purchaseorders':
          icon = icon + 'shopping-cart';
          break;
      }

      templateRef.displayName.set(ref.primaryEntityDisplayData);
      templateRef.displayIcon.set(icon);
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
  entityName: function() {
    return Template.instance().displayName.get();
  },
  entityIcon: function() {
    return Template.instance().displayIcon.get();
  },
  listIcon: function(type) {
    var icons = {
      'note': 'file-text-o',
      'email': 'envelope-o',
      'call': 'phone',
      'Note': 'file-text-o',
      'Email': 'envelope-o',
      'Call': 'phone'
    };
    return icons[type];
  },
  routeName: function() {
    switch (this.primaryEntityType) {
      case 'companies':
        return 'company';
      case 'contacts':
        return 'contact';
      case 'opportunities':
        return 'opportunity';
      case 'projects':
        return 'project';
      case 'purchaseorders':
        return 'purchaseOrder';
    }
  }
});