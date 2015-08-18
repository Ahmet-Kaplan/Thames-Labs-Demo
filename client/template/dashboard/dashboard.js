//List of all the available widets
widgets = {
  'chat': { 
    id: 'chat',
    x: 0,
    y: 0,
    w: 4,
    h: 6,
    displayed: true,
    name: 'Chatter'
  },
  'quotation': {
    id: 'quotation',
    x: 4,
    y: 0,
    w: 4,
    h: 6,
    displayed: true,
    name: 'Quotation of the day'
  },
  'online':  {
    id: 'online',
    x: 8,
    y: 0,
    w: 4,
    h: 6,
    displayed: true,
    name: 'Online users'
  },
  'task':  {
    id: 'task',
    x: 0,
    y: 6,
    w: 12,
    h: 3,
    displayed: true,
    name: 'My tasks'
  },
  'test':  {
    id: 'test',
    x: 0,
    y: 0,
    w: 4,
    h: 4,
    displayed: false,
    name: 'Test Widget'
  }
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

Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 50,
    vertical_margin: 10,
    animate: true,
    height: 0
  });

  grid = $('.grid-stack').data('gridstack');

  //Retrieve list of widgets from db if exists
  var savedWidgets = Meteor.users.findOne(Meteor.userId()).profile.myWidgets;

  //For each widget, check if defined in db otherwise use default display value
  _.each(widgets, function(widget, key) {
    if(savedWidgets !== undefined && savedWidgets[key] !== undefined) {
      myWidgets[key] = savedWidgets[key];
    } else {
      myWidgets[key] = widget;
    }
  });

  //Create the actual widgets table
  var organizedWidgets = _.sortBy(myWidgets, 'y');
  _.each(organizedWidgets, function(widget) {
    if(widget.displayed) {
      grid.add_widget('<div id="' + widget.id + 'Widget"></div>', widget.x, widget.y, widget.w, widget.h, true);
      newWidget = Blaze.render(Template[widget.id + 'Widget'], document.getElementById(widget.id + "Widget"));
      dashboardWidgets[widget.id + "Widget"] = newWidget;
    }
  });
});

Template.dashboard.events({
  'change .grid-stack': function() {
    saveMyWidgets()
  },

  'click .addWidget': function(e) {
    var newWidgetName = e.target.id;
    if($('#' + newWidgetName + 'Widget').length) {
      toastr.error('This widget is already displayed.');
      return;
    }
    var grid = $('.grid-stack').data('gridstack');
    var newWidget = (myWidgets[newWidgetName] !== undefined) ? myWidgets[newWidgetName] : widgets[newWidgetName];

    if(newWidget !== undefined) {
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
  }

});

Template.dashboard.helpers({
  widgetList: function() {
    return _.map(widgets, function(widget) { 
      return widget ;
    });
  }
});