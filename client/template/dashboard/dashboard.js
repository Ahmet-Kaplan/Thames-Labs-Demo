/****************************************
    The widget list is generated from the following 'widgets' object.
    - to avoid conflict with other templates, the convention is to name the template widget.id + 'Widget', e.g. 'chatWidget'
    - the object must have the same key and id property. This is to speed up the reading.
    - The x and y parameters are the default position on the grid;
      The grid has 3 columns hence x must be 0, 1 or 2. There is no limitation for the y position.
      Note that if the specified position is occupied by another widget, the script will put it
      at the end of the page in the first available place.
    - w and h are respectively the width (1, 2 or 3) and the height of the widget
    - The 'displayed' property indicate whether or not the widget is to be displayed by default
    - 'name' is the text displayed on the dropdown.
*****************************************/
var widgetsDefault = {
  'chat': {
    id: 'chat',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Chatter'
  },
  'quotation': {
    id: 'quotation',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Quotation of the day'
  },
  'online': {
    id: 'online',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Online users'
  },
  'task': {
    id: 'task',
    x: 0,
    y: 1,
    w: 2,
    h: 1,
    displayed: true,
    name: 'My tasks',
    requiredPermission: "CanReadTasks"
  },
  'openPo': {
    id: 'openPo',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Requested Purchase Orders',
    requiredPermission: "CanReadPurchaseOrders"
  },
  'taskInformation': {
    id: 'taskInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Tasks Overview'
  },
  'opportunityInformation': {
    id: 'opportunityInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Opportunities Overview',
    requiredPermission: "CanReadOpportunities"
  },
  'projectInformation': {
    id: 'projectInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Projects Overview',
    requiredPermission: "CanReadProjects"
  },
  'productsInformation': {
    id: 'productsInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Products Overview',
    requiredPermission: "CanReadProducts"
  },
  'poInformation': {
    id: 'poInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Purchase Orders Overview',
  },
  'companySummary': {
    id: 'companySummary',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Company Summary'
  },
  // 'propagationChart': {
  //   id: 'propagationChart',
  //   x: 0,
  //   y: 0,
  //   w: 4,
  //   h: 2,
  //   displayed: false,
  //   name: 'Propagation Overview (Chart)'
  // },
};
//List of widget views
var dashboardWidgets = [];

function saveMyWidgets() {
  var elts = $('.grid-stack > .grid-stack-item:visible');

  var myWidgets = {};
  _.each(elts, function(elt) {
    var id = elt.id.split('Widget')[0];
    var data = elt.dataset;
    //Retrieve default info then update position
    myWidgets[id] = widgetsDefault[id];
    myWidgets[id].displayed = true;
    myWidgets[id].autoPosition = false;
    myWidgets[id].x = parseInt(data.gsX);
    myWidgets[id].y = parseInt(data.gsY);
  });

  if(myWidgets !== {}) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.myWidgets': myWidgets
      }
    });
  } else {
    Meteor.users.update(Meteor.userId(), {
      $unset: {
        'profile.myWidgets': ''
      }
    });
  }
}

function removeWidget(widgetName, template) {
  var grid = $('.grid-stack').data('gridstack');
  var widgetId = widgetName.split('Widget')[0];
  var widgetList = template.widgetListUser.get();

  grid.remove_widget($('#' + widgetName), true);
  Blaze.remove(dashboardWidgets[widgetName]);
  delete dashboardWidgets[widgetName];
  delete widgetList[widgetId];
  template.widgetListUser.set(widgetList);
}

Template.dashboard.onCreated(function() {
  this.autorun(() => {
    // Redirect superadmin
    if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) FlowRouter.go('tenants');
  });
});

Template.dashboard.onCreated(function() {
  //Retrieve list of widgets from db if exists
  this.widgetListUser = new ReactiveVar({});
  var savedWidgets = Meteor.user().profile.myWidgets;
  if(typeof savedWidgets === 'undefined' || savedWidgets === {}) {
    this.widgetListUser.set(widgetsDefault)
  } else {
    this.widgetListUser.set(savedWidgets);
  }
})

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
    var grid = $('.grid-stack').data('gridstack');
    var widgetList = this.widgetListUser.get();

    //Create the actual widgets table
    _.each(_.sortByOrder(widgetList, ['autoPosition', 'y'], ['desc', 'asc']), function(widget) {
      if($('#' + widget.id + 'Widget').length > 0) {
        return;
      }
      if (!!widget.requiredPermission) {
        var requiredPermission = widget.requiredPermission,
          userId = Meteor.userId();
        if (!Roles.userIsInRole(userId, ['Administrator', requiredPermission])) {
          return;
        }
      }
      if (widget.displayed) {
        //Control to avoid migration and for display safety
        widget.h = (widget.h > 2) ? 1 : widget.h;

        var autoPosition = (widget.autoPosition === true);
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
});

Template.dashboard.events({
 'change .grid-stack': function() {
    saveMyWidgets()
  },

 'click .addWidget': function(e) {
    var newWidgetName = e.target.id;

    if ($('#' + newWidgetName + 'Widget').length) {
      toastr.error('This widget is already displayed.');
      return;
    } else {
      var newWidgetList = Template.instance().widgetListUser.get();

      newWidgetList[newWidgetName] = widgetsDefault[newWidgetName];
      newWidgetList[newWidgetName].displayed = true;
      newWidgetList[newWidgetName].autoPosition = true;
      Template.instance().widgetListUser.set(newWidgetList);
    }
  },

  'click .close': function(e) {
    var widgetName = e.target.id.split('close_')[1];
    removeWidget(widgetName, Template.instance());
  }
});

Template.dashboard.helpers({
  widgetList: function() {
    var displayedWidgets = (Template.instance().widgetListUser) ? Template.instance().widgetListUser.get() : {};
    return _.map(widgetsDefault, function(widget) {
      widget.displayed = (displayedWidgets[widget.id] && displayedWidgets[widget.id].displayed === true);
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
