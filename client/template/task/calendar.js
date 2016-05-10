Template.displayCalendar.onCreated(function() {
  this.startTime = new ReactiveVar({});
  this.endTime = new ReactiveVar({});
  this.tasksList = new ReactiveVar({});
  this.eventsListeners = new ReactiveVar([]);
  this.popoverHoldersList = new ReactiveVar([]);
  this.currentView = new ReactiveVar({});
});

Template.displayCalendar.onRendered(function() {

  //Check first if the user had already been looking in a date/time window and if so go to it
  if(TasksIndex.getComponentDict().get('searchOptions').props) {
    var getStartDate = TasksIndex.getComponentDict().get('searchOptions').props.after
    var getEndDate = TasksIndex.getComponentDict().get('searchOptions').props.before
    if(moment(getStartDate).isValid()) {
      $('#tasksCalendar').fullCalendar('gotoDate', moment(getStartDate).startOf('month'));
    } else if (moment(getEndDate).isValid()) {
      $('#tasksCalendar').fullCalendar('gotoDate', moment(getEndDate).startOf('month'));
    }
  }

  //On change from month to week, renders current week if is current month
  this.autorun(() => {
    var currentView = this.currentView.get();
    var newView = $('#tasksCalendar').fullCalendar('getView');
    if( currentView.type === "month" && newView.type === "agendaWeek" && currentView.start.isBefore(moment()) && currentView.end.isAfter(moment()) ) {
      $('#tasksCalendar').fullCalendar('gotoDate', moment());
    }
  });

  //Looks for views rendering, i.e. when the user changes month or between day/week/month views
  this.autorun(() => {
    var startTime = this.startTime.get();
    var endTime = this.endTime.get();

    TasksIndex.getComponentMethods().addProps('after', startTime.format('DD MMM YYYY'));
    TasksIndex.getComponentMethods().addProps('before', endTime.format('DD MMM YYYY'));
  });

  //Update search index according to the view and trigger the update of the view with new events
  this.autorun(() => {
    var name = TasksIndex.getComponentDict().name;
    var searchDefinition = Session.get(name + '.searchDefinition') || '';
    var searchOptions = TasksIndex.getComponentDict().get('searchOptions');
    searchOptions.limit = 200;
    var tasksList = TasksIndex.search(searchDefinition, searchOptions);

    if(tasksList.isReady()) {
      this.tasksList.set(tasksList.fetch());
      $('#tasksCalendar').fullCalendar('removeEvents');
      $('#tasksCalendar').fullCalendar('refetchEvents');
    }
  });
});

Template.displayCalendar.helpers({
  calendarOptions: function() {
    var instance = Template.instance();
    return {
      id: 'tasksCalendar',
      firstDay: 1,
      weekNumbers: true,
      header: {
        left: 'title',
        center: 'month,agendaWeek,agendaDay',
        right: 'today prev,next'
      },
      timezone: 'local',
      displayEventEnd: false,
      eventLimit: 4,
      height: 'auto',
      eventLimitClick: 'popover',
      eventStartEditable: true,
      eventDurationEditable: false,
      selectable: false,
      selectHelper: true,
      snapDuration: '00:30:00',
      slotLabelFormat: 'HH:mm',
      timeFormat: 'HH:mm',
      eventOrder: [
        function(taskA, taskB) {
          if(taskA.myTask && !taskB.myTask) {
            return 1;
          }
          return -1;
        }, 'start'],
      eventSources: [
        {
          events: function(start, end, timezone, callback) {
            var tasksList = instance.tasksList.get()
            var events = []
            if(!!tasksList.length) {
              _.each(tasksList, (task) => {
                //Check first that the event is not already displayed
                var taskDisplayed = this.clientEvents('evt_' + task._id).length;

                if(typeof task.dueDate !== 'undefined' && !taskDisplayed) {
                  var background = {
                    'company': 'primary',
                    'contact': 'info',
                    'opportunity': 'warning',
                    'project': 'danger',
                    'product': 'success',
                    'user': 'user-task'
                  };

                  events.push({
                    id: 'evt_' + task.__originalId,
                    title: task.title,
                    description: task.description,
                    allDay: task.isAllDay,
                    start: moment(task.dueDate),
                    __originalId: task.__originalId,
                    entityType: task.entityType,
                    myTask: task.assigneeId === Meteor.userId(),
                    className: (task.assigneeId === Meteor.userId()) ? 'btn-' + background[task.entityType] : 'btn-non-user text-' + background[task.entityType]
                  });
                }
              });
            }
            callback(events);
          }
        }
      ],
      eventClick: function(event, jsEvent, view) {
        var popoverHolder = $(jsEvent.target).closest('.fc-content') || $(jsEvent.target).closest('.fc-time-grid-event');

        //Creates popover only on first instance
        if(!popoverHolder.data('haspopover')) {

          if(!!event.description && event.description.length > 100) {
            event.description = event.description.substring(0, 97) + '...';
          }

          eventData = _.clone(event);
          eventData.start = moment(eventData.start).format('Do MMM YYYY, HH:mm')
          popoverHolder.popover({
            container: 'body',
            content: Blaze.toHTMLWithData(Template.taskPopover, eventData),
            html: true,
            placement: 'top',
            title: eventData.title,
            trigger: 'manual'
          });

          var popoverHoldersList = instance.popoverHoldersList.get();
          popoverHoldersList.push(popoverHolder);
          instance.popoverHoldersList.set(popoverHoldersList);

          popoverHolder.attr('data-haspopover', true);


          //----------------------------------------//
          //     JS EVENTS HANDLING FOR POPOVER     //
          //----------------------------------------//


          //Add event listener to hide popover if click is outside
          var hidePopoverHandle = function(evt) {
            if ($(evt.target).closest(jsEvent.target).length < 1) {
              popoverHolder.popover('hide');
            }
          };
          $(window).bind('click', hidePopoverHandle);

          //Add event listener to list to remove when template is destroyed
          const elList = instance.eventsListeners.get();
          elList.push({
            elt: $(window),
            type: 'click',
            fct: hidePopoverHandle
          });
          instance.eventsListeners.set(elList);
        }

        //----------------------------------------//
        //       JS EVENTS HANDLING FOR LINKS     //
        //----------------------------------------//

        //The popover needs to be displayed first for the links elements to exist
        popoverHolder.popover('toggle');

        //Add event handler to show modal from link in popover. This cannot be done with Template.events because of the toHTMWithData function
        var editTaskHandle = function(jsInnerEvent) {
          jsInnerEvent.preventDefault();
          var task = _.find(instance.tasksList.get(), {'__originalId': event.__originalId});
          task._id = task.__originalId
          Modal.show('updateTask', task);
        };
        $('.popover-edit-task').bind('click', editTaskHandle);

        //Add event listener to list to remove when template is destroyed
        const elList = instance.eventsListeners.get();
        elList.push({
          elt: $('.popover-edit-task'),
          type: 'click',
          fct: editTaskHandle
        });
        instance.eventsListeners.set(elList);
      },
      eventDrop: function(event, delta, revertFunc) {
        var newStartDate = moment(event.start)
        bootbox.confirm({
          message: 'Do you want to change the task due date to ' + newStartDate.format('Do MMM YYYY, HH:mm') + '?',
          title: 'Update task due date',
          backdrop: false,
          callback: function(result) {
            if(result === true) {
              Meteor.call('tasks.updateDueDate', event.__originalId, newStartDate.format(), function(err, res) {
                if(!res) {
                  toastr.error('Unable to update task');
                  revertFunc();
                } else {
                  toastr.success('Task due date successfully updated');
                }
                return;
              });
            } else {
              revertFunc();
            }
          }
        });
      },
      viewRender: function(view, element) {
        //Destroy all popover from previous view and update view boundaries for db fetch
        $('.popover').remove();
        instance.startTime.set(view.intervalStart);
        instance.endTime.set(view.intervalEnd);
      },
      viewDestroy: function(view, element) {
        instance.currentView.set(view);
      },
      dayClick: function(date, jsEvent, view) {
        var popoverHolder = $(jsEvent.target);

        if(view.type === "month") {
          date.hours(12);
        }

        //Creates popover only on first instance
        if(!popoverHolder.data('haspopover')) {
          var title = '<span class="fa-stack"><i class="fa fa-calendar-o fa-stack-2x"></i><i class="fa fa-stack-1x"><small>' + date.format('D') + '</small></i></span> ';
          title += (view.type === 'agendaDay') ? 'Day view' : '<a href="#" class="go-to-day-view">Go to day view</a>';
          popoverHolder.popover({
            container: 'body',
            content: Blaze.toHTMLWithData(Template.quickCalendarAddPopover, {
              date: date.format('Do MMM YYYY, HH:mm')
            }),
            html: true,
            placement: 'top',
            title: '<h5>' + title + '</h5>',
            trigger: 'manual'
          });

          var popoverHoldersList = instance.popoverHoldersList.get();
          popoverHoldersList.push(popoverHolder);
          instance.popoverHoldersList.set(popoverHoldersList);

          popoverHolder.attr('data-haspopover', true);

          //----------------------------------------//
          //     JS EVENTS HANDLING FOR POPOVER     //
          //----------------------------------------//

          //Add event listener to hide popover if click is outside
          var hidePopoverHandle = function(evt) {
            if(evt.target != popoverHolder[0]) {
              popoverHolder.popover('hide');
            }
          };
          $(window).bind('click', hidePopoverHandle);
          //Add event listener to list to remove when template is destroyed
          const elList = instance.eventsListeners.get();
          elList.push({
            elt: $(window),
            type: 'click',
            fct: hidePopoverHandle
          });
          instance.eventsListeners.set(elList);
        }

        //----------------------------------------//
        //       JS EVENTS HANDLING FOR LINKS     //
        //----------------------------------------//

        //The popover needs to be displayed first for the links elements to exist
        if(view.type === "agendaWeek") {
        //On agendaWeek view, need to tweek the positioning of the popover because of the way the table is displayed
          if(date.format('ddd').toLowerCase() == popoverHolder.data('day')) {
            popoverHolder.popover('hide');
          } else {
            popoverHolder.popover('show');
            var day = date.format('ddd').toLowerCase();
            var dayOffset = $('.fc-day.fc-' + day).offset().left;
            var dayWidth = $('.fc-day-header.fc-' + day).width();
            var popoverWidth = $('.popover').width();
            var setLeftOffset = dayOffset - (popoverWidth - dayWidth) /2;
            $('#' + popoverHolder.attr('aria-describedby')).offset({left: setLeftOffset});
            popoverHolder.data('day', day);
          }
        } else {
          popoverHolder.popover('toggle');
        }

        //Add event handler to show modal. This cannot be done with Template.events because of the toHTMWithData function
        var quickLinkHandle = function(jsInnerEvent) {
          jsInnerEvent.preventDefault();
          var entityType = $(jsInnerEvent.target).attr('id');
          Modal.show('insertNewTask', {
            entity_type: entityType,
            dueDate: date
          });
        };
        $('.quick-add-task').bind('click', quickLinkHandle);

        //Add event handler to go to day view. This cannot be done with Template.events because of the toHTMWithData function
        var dayViewHandle = function() {
          $('#tasksCalendar').fullCalendar('changeView', 'agendaDay');
          $('#tasksCalendar').fullCalendar('gotoDate', date)
        };
        $('.go-to-day-view').bind('click', dayViewHandle);

        //Add event listener to list to remove when template is destroyed
        const elList = instance.eventsListeners.get();
        elList.push({
          elt: $('.quick-add-task'),
          type: 'click',
          fct: quickLinkHandle
        });
        elList.push({
          elt: $('.go-to-day-view'),
          type: 'click',
          fct: dayViewHandle
        });
        instance.eventsListeners.set(elList);
      }
    }
  }
});

Template.displayCalendar.onDestroyed(function() {
  var eventsListeners = this.eventsListeners.get();
  _.each(eventsListeners, function(event) {
  });

  var popoverHoldersList = this.popoverHoldersList.get();
  _.each(popoverHoldersList, function(popoverHolder) {
    popoverHolder.popover('destroy');
  });

  //Reset search options
  TasksIndex.getComponentMethods().removeProps('after');
  TasksIndex.getComponentMethods().removeProps('before');
});