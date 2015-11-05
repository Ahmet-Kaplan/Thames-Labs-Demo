// List of all the available widets
// To add a new widget, complete the object below
// Be careful to give the same name to your object and to its id
// The x, y, w, h are relative to the grid size
// The 'displayed' property indicate whether or not the widget is to be displayed by default
// 'name' if for the drop-down menu
widgets = {
  'chat': {
    id: 'chat',
    x: 0,
    y: 0,
    w: 1,
    h: 7,
    displayed: true,
    name: 'Chatter'
  },
  'quotation': {
    id: 'quotation',
    x: 1,
    y: 0,
    w: 1,
    h: 4,
    displayed: true,
    name: 'Quotation of the day'
  },
  'online': {
    id: 'online',
    x: 2,
    y: 0,
    w: 1,
    h: 10,
    displayed: true,
    name: 'Online users'
  },
  'task': {
    id: 'task',
    x: 0,
    y: 8,
    w: 2,
    h: 3,
    displayed: true,
    name: 'My tasks',
    requiredPermission: "CanReadTasks"
  },
  'openPo': {
    id: 'openPo',
    x: 0,
    y: 0,
    w: 2,
    h: 5,
    displayed: false,
    name: 'Requested Purchase Orders',
    requiredPermission: "CanReadPurchaseOrders"
  },
  'taskInformation': {
    id: 'taskInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 6,
    displayed: false,
    name: 'Tasks Overview'
  },
  'opportunityInformation': {
    id: 'opportunityInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 6,
    displayed: false,
    name: 'Opportunities Overview',
    requiredPermission: "CanReadOpportunities"
  },
  'projectInformation': {
    id: 'projectInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 6,
    displayed: false,
    name: 'Projects Overview',
    requiredPermission: "CanReadProjects"
  },
  'productsInformation': {
    id: 'productsInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 6,
    displayed: false,
    name: 'Products Overview',
    requiredPermission: "CanReadProducts"
  },
  'poInformation': {
    id: 'poInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 8,
    displayed: false,
    name: 'Purchase Orders Overview',
  },
  'companySummary': {
    id: 'companySummary',
    x: 0,
    y: 0,
    w: 1,
    h: 9,
    displayed: false,
    name: 'Company Summary'
  },
  // 'propagationChart': {
  //   id: 'propagationChart',
  //   x: 0,
  //   y: 0,
  //   w: 4,
  //   h: 13,
  //   displayed: false,
  //   name: 'Propagation Overview (Chart)'
  // },
};
//List of widgets used by the user
myWidgets = {};
//List of widget views
dashboardWidgets = [];

function saveMyWidgets() {
  var elts = $('.grid-stack > .grid-stack-item:visible');
  _.each(elts, function(elt) {
    var id = elt.id.split('Widget')[0];
    var data = elt.dataset;
    myWidgets[id].x = data.gsX;
    myWidgets[id].y = data.gsY;
    myWidgets[id].w = data.gsWidth;
    myWidgets[id].h = data.gsHeight;
  });

  var profile = Meteor.users.findOne(Meteor.userId()).profile;
  profile.myWidgets = myWidgets;
  Meteor.users.update(Meteor.userId(), {
    $set: {
      profile: profile
    }
  });
}

function instanciateDashboard(savedWidgets) {

  grid = $('.grid-stack').data('gridstack');
  grid.remove_all();

  //For each widget, check if defined in db otherwise use default display value
  _.each(widgets, function(widget, key) {
    if (savedWidgets !== undefined && savedWidgets[key] !== undefined) {
      myWidgets[key] = savedWidgets[key];
    } else {
      myWidgets[key] = widget;
    }
  });

  //Create the actual widgets table
  var organizedWidgets = _.sortBy(myWidgets, 'y');
  _.each(organizedWidgets, function(widget) {
    if (!!widget.requiredPermission) {
      var requiredPermission = widget.requiredPermission,
        userId = Meteor.userId();
      if (!Roles.userIsInRole(userId, ['Administrator', requiredPermission])) {
        return;
      }
    }
    if (widget.displayed) {
      grid.add_widget('<div id="' + widget.id + 'Widget"></div>', widget.x, widget.y, widget.w, widget.h, false);
      newWidget = Blaze.render(Template[widget.id + 'Widget'], document.getElementById(widget.id + "Widget"));
      dashboardWidgets[widget.id + "Widget"] = newWidget;
    }
  });
}

Template.dashboard.onCreated(function() {
  this.autorun(() => {
    // Redirect superadmin
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) FlowRouter.go('tenants');
  });
});

Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 40,
    vertical_margin: 10,
    animate: true,
    height: 0,
    width: 3
  });

  //Retrieve list of widgets from db if exists
  var savedWidgets = Meteor.user().profile.myWidgets;
  instanciateDashboard(savedWidgets);
});

Template.dashboard.events({
  // 'click #test': function() {
  //   Meteor.call('report.companiesStored', function(err, data) {
  //     console.log(Meteor.isDevelopment);
  //     console.log(err, data);
  //   })
  // },
  'change .grid-stack': function() {
    saveMyWidgets()
  },

  'click .addWidget': function(e) {
    var newWidgetName = e.target.id;
    if ($('#' + newWidgetName + 'Widget').length) {
      toastr.error('This widget is already displayed.');
      return;
    }
    var grid = $('.grid-stack').data('gridstack');
    var newWidget = (myWidgets[newWidgetName] !== undefined) ? myWidgets[newWidgetName] : widgets[newWidgetName];

    if (newWidget !== undefined) {
      grid.add_widget('<div id="' + newWidget.id + 'Widget"></div>', newWidget.x, newWidget.y, newWidget.w, newWidget.h, true);
      addedWidget = Blaze.render(Template[newWidget.id + 'Widget'], document.getElementById(newWidget.id + 'Widget'));
      dashboardWidgets[newWidget.id + 'Widget'] = addedWidget;
      myWidgets[newWidget.id].displayed = true;
      saveMyWidgets();
    } else {
      toastr.error('Unable to add widget.');
    }
  },

  'click .close': function(e) {
    var widgetName = e.target.id.split('close_')[1];
    var gridstack = $('.grid-stack').data('gridstack');
    gridstack.remove_widget($('#' + widgetName), true);
    Blaze.remove(dashboardWidgets[widgetName]);
    delete dashboardWidgets[widgetName];
    var widgetId = widgetName.split('Widget')[0];
    myWidgets[widgetId].displayed = false;
    saveMyWidgets();
  },

  'click #resetDashboard': function() {
    myWidgets = {};
    instanciateDashboard(myWidgets);
    saveMyWidgets();
  }

});

Template.dashboard.helpers({
  widgetList: function() {
    return _.map(widgets, function(widget) {
      return widget;
    }).filter(function(widget) {
      if (!!widget.requiredPermission) {
        var requiredPermission = widget.requiredPermission,
          userId = Meteor.userId();
        return Roles.userIsInRole(userId, ['Administrator', requiredPermission])
      }
      return true;
    });
  }
});
