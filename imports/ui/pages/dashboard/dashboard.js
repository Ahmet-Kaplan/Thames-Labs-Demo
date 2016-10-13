import './dashboard.html';
import './dashboard.css';

import '/imports/ui/components/tutorial-modals/welcome/first-mobile.js';
import '/imports/ui/components/tutorial-modals/welcome/first-run-modal.js';
import '/imports/ui/components/dashboard/widgets/online/online.js';
import '/imports/ui/components/dashboard/widgets/quotation/quotation.js';
import '/imports/ui/components/dashboard/widgets/task/task.js';
import '/imports/ui/components/dashboard/widgets/watched/watchedEntity.js';
import '/imports/ui/components/dashboard/widgets/reporting/companySummary/companySummary.js';
import '/imports/ui/components/dashboard/widgets/reporting/jobInformation/jobInformation.js';
import '/imports/ui/components/dashboard/widgets/reporting/tasks/tasksInformation.js';

import { widgetsDefault, saveMyWidgets, removeWidget, dashboardWidgets } from '/imports/api/widgets/widgets.js';

Template.dashboard.onCreated(function() {
  this.autorun(() => {
    // Redirect superadmin
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) FlowRouter.go('tenants');
  });

  //Retrieve list of widgets from db if exists
  this.widgetListUser = new ReactiveVar({});
  if (!Roles.userIsInRole(Meteor.userId(), 'superadmin')) {
    var savedWidgets = Meteor.user().profile.myWidgets;
  }
  if (typeof savedWidgets === 'undefined' || savedWidgets === {}) {
    this.widgetListUser.set(widgetsDefault);
  } else {
    this.widgetListUser.set(savedWidgets);
  }
});

Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 300,
    vertical_margin: 10,
    animate: true,
    handle: '.panel-heading',
    height: 0,
    width: 3
  });

  //Autorun that looks at changes in the widget list and update dashboard
  this.autorun(() => {
    const grid = $('.grid-stack').data('gridstack');
    const widgetList = this.widgetListUser.get();

    //Create the actual widgets table
    _.each(_.orderBy(widgetList, ['autoPosition', 'y'], ['desc', 'asc']), function(widget) {
      if ($('#' + widget.id + 'Widget').length > 0) {
        return;
      }
      if (!!widget.requiredPermission) {
        const requiredPermission = widget.requiredPermission,
              userId = Meteor.userId();
        if (!Roles.userIsInRole(userId, [requiredPermission])) {
          return;
        }
      }

      // Self-cleaning widget list
      if(!widgetsDefault[widget.id]) {
        const u = Meteor.users.findOne({_id: Meteor.userId()});
        if(u.profile) {
          const widgets = u.profile.myWidgets;
          if (widgets && widgets[widget.id]) {
            delete widgets[widget.id];
            Meteor.users.update({
              _id: u._id
            }, {
              $set: {
                'profile.myWidgets': widgets
              }
            });
          }
        }
      }

      if (widget.displayed) {
        //Control to avoid migration and for display safety
        widget.h = (widget.h > 2) ? 1 : widget.h;

        const autoPosition = (widget.autoPosition === true);
        grid.add_widget('<div id="' + widget.id + 'Widget"></div>', widget.x, widget.y, widget.w, widget.h, autoPosition);
        grid.resizable($('#' + widget.id + 'Widget'), false);
        newWidget = Blaze.render(Template[widget.id + 'Widget'], document.getElementById(widget.id + "Widget"));
        dashboardWidgets[widget.id + "Widget"] = newWidget;
      }
    });
  });

  //Save wiget list if changes are detected
  this.autorun(() => {
    this.widgetListUser.get();
    saveMyWidgets();
  });

  //Has user seen the welcome modal yet?
  if (!Meteor.user().profile.welcomeTour) {
    Modal.show("firstRun");
  } else if (Meteor.isCordova) {
    if (!Meteor.user().profile.mobile) {
      Modal.show("firstRunMobile");
    }
  }
});

Template.dashboard.events({
  'change .grid-stack': function() {
    saveMyWidgets();
  },

  'click .addWidget': function(e) {
    const newWidgetName = e.target.id;

    if ($('#' + newWidgetName + 'Widget').length) {
      toastr.error('This widget is already displayed.');
      return;
    }

    const newWidgetList = Template.instance().widgetListUser.get();

    newWidgetList[newWidgetName] = widgetsDefault[newWidgetName];
    newWidgetList[newWidgetName].displayed = true;
    newWidgetList[newWidgetName].autoPosition = true;
    Template.instance().widgetListUser.set(newWidgetList);
  },

  'click .close': function(e) {
    const widgetName = e.target.id.split('close_')[1];
    removeWidget(widgetName, Template.instance());
  }
});

Template.dashboard.helpers({
  widgetList: function() {
    const displayedWidgets = (Template.instance().widgetListUser) ? Template.instance().widgetListUser.get() : {};
    return _.map(widgetsDefault, function(widget) {
      widget.displayed = (displayedWidgets[widget.id] && displayedWidgets[widget.id].displayed === true);
      return widget;
    }).filter(function(widget) {

      if (widget.id === 'openPo' || widget.id === 'poInformation') {
        const user = Meteor.user();
        if (!user || !user.group) return false;
      }

      if (!!widget.requiredPermission) {
        const requiredPermission = widget.requiredPermission,
              userId = Meteor.userId();
        return Roles.userIsInRole(userId, [requiredPermission]);
      }
      return true;
    });
  }
});
