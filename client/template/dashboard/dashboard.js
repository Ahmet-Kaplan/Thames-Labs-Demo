Template.dashboard.onRendered(function() {
  $('.grid-stack').gridstack({
    cell_height: 150,
    vertical_margin: 10,
    animate: true
  });

  grid = $('.grid-stack').data('gridstack');

  grid.add_widget('<div id="chatWidget"></div>', 0, 0, 4, 2, true);
  Blaze.render(Template.chatWidget, document.getElementById("chatWidget"));

  grid.add_widget('<div id="quotationWidget"></div>', 4, 0, 4, 2, true);
  Blaze.render(Template.quotationWidget, document.getElementById("quotationWidget"));

  grid.add_widget('<div id="onlineWidget"></div>', 8, 0, 4, 2, true);
  Blaze.render(Template.onlineWidget, document.getElementById("onlineWidget"));

  grid.add_widget('<div id="taskWidget"></div>', 0, 2, 12, 1, true);
  Blaze.render(Template.taskWidget, document.getElementById("taskWidget"));
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
      alert('This widget is already displayed.');
      return ;
    }
    var grid = $('.grid-stack').data('gridstack');
    var newWidgetProperties = document.getElementById(newWidgetName).dataset;
    grid.add_widget('<div id="' + newWidgetName + 'Widget"></div>', 0, 0, newWidgetProperties.w, newWidgetProperties.h, true);

    switch(newWidgetName) {
      case('test'):
        Blaze.render(Template['testWidget'], document.getElementById(newWidgetName + 'Widget'));
      break;

      case('chat'):
        Blaze.render(Template.chatWidget, document.getElementById(newWidgetName + 'Widget'));
      break;

      case('quotation'):
        Blaze.render(Template.quotationWidget, document.getElementById(newWidgetName + 'Widget'));
      break;

      case('online'):
        Blaze.render(Template.onlineWidget, document.getElementById(newWidgetName + 'Widget'));
      break;

      case('task'):
        Blaze.render(Template.taskWidget, document.getElementById(newWidgetName + 'Widget'));
      break;
    }
  },

  'click .close': function(e) {
    var widget = e.target.id.split('close_')[1];
    var gridstack = $('.grid-stack').data('gridstack');
    gridstack.remove_widget($('#' + widget), true);
    switch(widget) {
      case('test'):
        Blaze.remove(Template.testWidget);
      break;

      case('chat'):
        Blaze.remove(Template.chatWidget);
      break;

      case('quotation'):
        Blaze.remove(Template.quotationWidget);
      break;

      case('online'):
        Blaze.remove(Template.onlineWidget);
      break;

      case('task'):
        Blaze.remove(Template.taskWidget);
      break;
    }
  }

});

Template.dashboard.helpers({
  widgetList: [
    {
      id: 'test',
      w: 4,
      h: 2,
      name: 'Test Widget'
    },
    {
      id: 'chat',
      w: 4,
      h: 2,
      name: 'Chatter'
    },
    {
      id: 'quotation',
      w: 4,
      h: 2,
      name: 'Quotation of the day'
    },
    {
      id: 'online',
      w: 4,
      h: 2,
      name: 'Online users'
    },
    {
      id: 'task',
      w: 12,
      h: 1,
      name: 'My tasks'
    }
  ]
});