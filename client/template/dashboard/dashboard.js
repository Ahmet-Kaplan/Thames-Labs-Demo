//List of all the available widets
widgets = [
    {
      id: 'chat',
      x: 0,
      y: 0,
      w: 4,
      h: 2,
      displayed: true,
      name: 'Chatter'
    },
    {
      id: 'quotation',
      x: 4,
      y: 0,
      w: 4,
      h: 2,
      displayed: true,
      name: 'Quotation of the day'
    },
    {
      id: 'online',
      x: 8,
      y: 0,
      w: 4,
      h: 2,
      displayed: true,
      name: 'Online users'
    },
    {
      id: 'task',
      x: 0,
      y: 2,
      w: 12,
      h: 1,
      displayed: true,
      name: 'My tasks'
    }
  ];

//List of widgets used by the user
myWidgets = [];
//List of widget views
dashboardWidgets = [];

Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 150,
    vertical_margin: 10,
    animate: true
  });

  grid = $('.grid-stack').data('gridstack');

  if(Meteor.users.findOne(Meteor.userId()).dashboardWidgets) {
    myWidgets = Meteor.users.findOne(Meteor.userId()).dashboardWidgets;
  } else {
    myWidgets = widgets;
  }

  _.each(myWidgets, function(widget) {
    if(widget.displayed) {
      grid.add_widget('<div id="' + widget.id + 'Widget"></div>', widget.x, widget.y, widget.w, widget.h, true);
      newWidget = Blaze.render(Template[widget.id + 'Widget'], document.getElementById(widget.id + "Widget"));
      dashboardWidgets[widget.id + "Widget"] = newWidget;
    }
  });
});

Template.dashboard.events({
  'change .grid-stack': function(e, items) {
      var elts = $('.grid-stack > .grid-stack-item:visible');
      var userWidgets = new Array();
      _.each(elts, function(elt) {
        var id = elt.id;
        elt = $(elt);
        attributes = {
          id: id,
          x: elt.attr('data-gs-x'),
          y: elt.attr('data-gs-y'),
          height: elt.attr('data-gs-height'),
          width: elt.attr('data-gs-width')
        };
        userWidgets.push(attributes);
      });
  },

  'click .addWidget': function(e) {
    var newWidgetName = e.target.id;
    if($('#' + newWidgetName + 'Widget').length) {
      toastr.error('This widget is already displayed.');
      return;
    }
    var grid = $('.grid-stack').data('gridstack');
    var newWidget = $.grep(widgets, function(widget) {
      if(widget.id == newWidgetName) {
        return widget;
      }
    });

    if(newWidget.length == 1) {
      newWidget = newWidget[0];
      console.log(newWidget);
      grid.add_widget('<div id="' + newWidget.id + 'Widget"></div>', newWidget.x, newWidget.y, newWidget.w, newWidget.h, true);
      addedWidget = Blaze.render(Template[newWidget.id + 'Widget'], document.getElementById(newWidget.id + 'Widget'));
      dashboardWidgets[newWidget.id + 'Widget'] = addedWidget;
      console.log(dashboardWidgets);
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
  }

});

Template.dashboard.helpers({
  widgetList: function() {
    return widgets;
  }
});