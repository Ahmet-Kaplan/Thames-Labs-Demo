import '/imports/ui/components/tags/tag-badges/tag-badges.js';
import htmlToText from "html-to-text";
import './activity-list-item.html';

Template.activityListItem.onCreated(function() {
  const templateRef = this;
  this.displayName = new ReactiveVar("<blank>");
  this.displayIcon = new ReactiveVar("<blank>");

  this.autorun(function() {
    const ref = templateRef.data;

    let icon = "fa fa-fw fa-";

    if (ref.taskId) {
      templateRef.displayName.set(ref.primaryEntityDisplayData);
      templateRef.displayIcon.set('fa fa-fw fa-check');
    } else {
      switch (ref.primaryEntityType) {
        case 'companies':
          icon += 'building';
          break;
        case 'contacts':
          icon += 'user';
          break;
        case 'opportunities':
          icon += 'lightbulb-o';
          break;
        case 'projects':
          icon += 'sitemap';
          break;
        case 'purchaseorders':
          icon += 'shopping-cart';
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
    }
    return "Date/time not specified";
  },
  entityName: function() {
    return Template.instance().displayName.get();
  },
  entityIcon: function() {
    return Template.instance().displayIcon.get();
  },
  listIcon: function(type) {
    const icons = {
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
  },
  activityNotes: function() {
    return htmlToText.fromString(this.notes, {
      uppercaseHeadings: false
    });
  }
});
