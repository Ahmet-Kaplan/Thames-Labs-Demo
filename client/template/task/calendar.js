Template.displayCalendar.onCreated(function() {
  this.startTime = new ReactiveVar({});
  this.endTime = new ReactiveVar({});
  this.tasksList = new ReactiveVar({});
  this.eventsListeners = new ReactiveVar([]);
  this.popoverHoldersList = new ReactiveVar([]);
});

Template.displayCalendar.onRendered(function() {
  //Looks for views update, i.e. when the user changes month or between day/week/month views
  this.autorun(() => {
    var calendarView = $('#tasksCalendar').fullCalendar('getView');
    var startTime = this.startTime.get();
    var endTime = this.endTime.get();

    TasksIndex.getComponentMethods().addProps('after', startTime.format('DD MMM YYYY'));
    TasksIndex.getComponentMethods().addProps('before', endTime.format('DD MMM YYYY'));
  });
  //Update search index according to the view and trigger the update of the view with new events
  this.autorun(() => {
    var name = TasksIndex.getComponentDict().name;
    var searchDefinition = Session.get(name + '.searchDefinition');
    var searchOptions = TasksIndex.getComponentDict().get('searchOptions');
    var tasksList = TasksIndex.search(searchDefinition, searchOptions);

    if(tasksList.isReady()) {
      this.tasksList.set(tasksList.fetch());
      $('#tasksCalendar').fullCalendar('removeEvents');
      $('#tasksCalendar').fullCalendar('refetchEvents');
    }
  })
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
      eventSources: [
        function() {
          var tasksList = instance.tasksList.get()
          if(!!tasksList.length) {
            _.each(tasksList, (task) => {
              //Check first that the event is not already displayed
              var taskDisplayed = this.clientEvents('evt_' + task._id).length;
        
              if(typeof task.dueDate !== 'undefined' && !taskDisplayed) {
                this.renderEvent({
                  id: 'evt_' + task.__originalId,
                  title: task.title,
                  description: task.description,
                  start: moment(task.dueDate),
                  __originalId: task.__originalId
                }, true);
              }
            });
          }

        }
      ],
      eventClick: function(event, jsEvent, view) {
        var popoverHolder = (view.type === 'month') ? $(jsEvent.target).closest('.fc-content') : $(jsEvent.target).closest('.fc-time-grid-event');

        //Check if popover already exists, if not create it
        if(popoverHolder.attr('aria-describedby') !== undefined) {
          popoverHolder.popover('hide');
          return;
        //Creates popover only on first instance
        } else if(!popoverHolder.data('haspopover')) {

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
        }
        
        //Once popover exist, show it  
        popoverHolder.popover('show');


        //----------------------------------------//
        //           JS EVENTS HANDLING           //
        //----------------------------------------//

        //Add event handler to show modal from link in popover. This cannot be done with Template.events because of the toHTMWithData function
        var editTaskHandle = function() {
          var task = _.find(instance.tasksList.get(), {'__originalId': event.__originalId});
          task._id = task.__originalId
          Modal.show('updateTask', task);
        };
        $('.popover-edit-task').bind('click', editTaskHandle)

        //Add event listener to hide popover if click is outside
        var hidePopoverHandle = function(evt) {
          if ($(evt.target).closest(jsEvent.target).length < 1) {
            popoverHolder.popover('hide');
          }
        };
        $(window).bind('click', hidePopoverHandle);

        //remove the event listener when the popover is destroyed (on hide actually)
        var removePopoverListeners = function() {
          $('.popover-edit-task').unbind('click', editTaskHandle);
          $(window).unbind('click', hidePopoverHandle);
        };
        popoverHolder.bind('hidden.bs.popover', removePopoverListeners);

        //Add event listener to list to remove when template is destroyed
        var elList = instance.eventsListeners.get();
        elList.push({
          elt: $('.popover-edit-task'),
          type: 'click',
          fct: editTaskHandle
        });
        elList.push({
          elt: $(window),
          type: 'click',
          fct: hidePopoverHandle
        });
        elList.push({
          elt: popoverHolder,
          type: 'hidden.bs.popover',
          fct: removePopoverListeners
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
      dayClick: function(date, jsEvent, view) {
        var popoverHolder = $(jsEvent.target);

        if(view.type === "month") {
          date.hours(12);
        }

        popoverHolder.popover({
          container: 'body',
          content: Blaze.toHTMLWithData(Template.quickCalendarAddPopover, {
            date: date.format('Do MMM YYYY, HH:mm')
          }),
          html: true,
          placement: 'top',
          title: '<h4><a href="#" class="go-to-day-view">Go to day view</a></h4>',
          trigger: 'manual'
        });

        var popoverHoldersList = instance.popoverHoldersList.get();
        popoverHoldersList.push(popoverHolder);
        instance.popoverHoldersList.set(popoverHoldersList);

        popoverHolder.popover('toggle');

        //On agendaWeek view, need to tweek the positioning of the popover because of the way the table is displayed
        if(view.type === "agendaWeek") {
          var day = date.format('ddd').toLowerCase();
          var dayOffset = $('.fc-day.fc-' + day).offset().left;
          var dayWidth = $('.fc-day-header.fc-' + day).width();
          var popoverWidth = $('.popover').width();
          var setLeftOffset = dayOffset - (popoverWidth - dayWidth) /2;
          $('#' + popoverHolder.attr('aria-describedby')).offset({left: setLeftOffset});
        }

        //----------------------------------------//
        //           JS EVENTS HANDLING           //
        //----------------------------------------//
        
        //Add event listener to hide popover if click is outside
        var hidePopoverHandle = function(evt) {
          if(evt.target != popoverHolder[0]){
            popoverHolder.popover('hide');
          }
        };
        $(window).bind('click', hidePopoverHandle);

        //Add event handler to show modal. This cannot be done with Template.events because of the toHTMWithData function
        var quickLinkHandle = function(e) {
          e.preventDefault();
          var entityType = $(e.target).attr('id');
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

        //Remove event listeners
        var removePopoverListeners = function() {
          $(window).unbind('click', hidePopoverHandle);
          $('.quick-add-task').unbind('click', quickLinkHandle);
          // $('.go-to-day-view').unbind('click', dayViewHandle);
        };
        popoverHolder.bind('hidden.bs.popover', removePopoverListeners);

        //Add event listener to list to remove when template is destroyed
        var elList = instance.eventsListeners.get();
        elList.push({
          elt: $(window),
          type: 'click',
          fct: hidePopoverHandle
        });
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
        elList.push({
          elt: popoverHolder,
          type: 'hidden.bs.popover',
          fct: removePopoverListeners
        });
        instance.eventsListeners.set(elList);
      }
    }
  }
});

Template.displayCalendar.onDestroyed(function() {
  var eventsListeners = this.eventsListeners.get();
  _.each(eventsListeners, function(event) {
    event.elt.unbind(event.type, event.fct);
  });

  var popoverHoldersList = this.popoverHoldersList.get();
  _.each(popoverHoldersList, function(popoverHolder) {
    popoverHolder.popover('destroy');
  })
});