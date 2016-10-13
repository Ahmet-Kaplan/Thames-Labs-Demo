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
export const widgetsDefault = {
  'quotation': {
    id: 'quotation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Quotation of the day'
  },
  'online': {
    id: 'online',
    x: 1,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Online users'
  },
  'task': {
    id: 'task',
    x: 1,
    y: 2,
    w: 2,
    h: 1,
    displayed: true,
    name: 'My tasks',
    requiredPermission: "CanReadTasks"
  },
  'taskInformation': {
    id: 'taskInformation',
    x: 0,
    y: 2,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Tasks Overview'
  },
  'jobInformation': {
    id: 'jobInformation',
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    displayed: false,
    name: 'Jobs Overview',
    requiredPermission: "CanReadJobs"
  },
  'companySummary': {
    id: 'companySummary',
    x: 2,
    y: 0,
    w: 1,
    h: 1,
    displayed: true,
    name: 'Company Summary'
  },
  'watchedEntity': {
    id: 'watchedEntity',
    x: 0,
    y: 1,
    w: 3,
    h: 1,
    displayed: true,
    name: 'Watched Items'
  }
};

//List of widget views
export const dashboardWidgets = [];

export const saveMyWidgets = () => {
  const elts = $('.grid-stack > .grid-stack-item:visible');

  const myWidgets = {};
  _.each(elts, function(elt) {
    const id = elt.id.split('Widget')[0];
    const data = elt.dataset;
    //Retrieve default info then update position
    myWidgets[id] = widgetsDefault[id];
    myWidgets[id].displayed = true;
    myWidgets[id].autoPosition = false;
    myWidgets[id].x = parseInt(data.gsX, 10);
    myWidgets[id].y = parseInt(data.gsY, 10);
    myWidgets[id].w = parseInt(data.gsWidth, 10);
    myWidgets[id].h = parseInt(data.gsHeight, 10);
  });

  if (myWidgets !== {}) {
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
};

export const removeWidget = (widgetName, template) => {
  const grid = $('.grid-stack').data('gridstack');
  const widgetId = widgetName.split('Widget')[0];
  const widgetList = template.widgetListUser.get();

  grid.remove_widget($('#' + widgetName), true);
  Blaze.remove(dashboardWidgets[widgetName]);
  delete dashboardWidgets[widgetName];
  delete widgetList[widgetId];
  template.widgetListUser.set(widgetList);
};
