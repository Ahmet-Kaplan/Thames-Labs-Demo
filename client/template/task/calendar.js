Template.displayCalendar.onCreated(function() {
  this.startTime = new ReactiveVar({});
  this.endTime = new ReactiveVar({});
  this.tasksList = new ReactiveVar({});
  this.eventsListeners = new ReactiveVar([]);
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
      $('#tasksCalendar').fullCalendar('removeEvents')
      $('#tasksCalendar').fullCalendar('refetchEvents')
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
        var popoverHolder = $(jsEvent.target).closest('.fc-content');

        //Check if popover already exists, if not create it
        if(popoverHolder.attr('aria-describedby') !== undefined) {
          popoverHolder.popover('hide');
          return;
        //Creates popover only on first instance
        } else if(!popoverHolder.data('haspopover')) {

          if(!!event.description && event.description.length > 100) {
            event.description = event.description.substring(0, 97) + '...';
          }

          event.start = moment(event.start).format('Do MMM YYYY, HH:mm')
          popoverHolder.popover({
            container: 'body',
            content: Blaze.toHTMLWithData(Template.taskPopover, event),
            html: true,
            placement: 'top',
            title: event.title,
            trigger: 'manual'
          });

          popoverHolder.attr('data-haspopover', true);
        }
        
        //Once popover exist, show it  
        popoverHolder.popover('show');

        //Add event handler to show modal from link in popover. This cannot be done with Template.events because of the toHTMWithData function
        $('.popover-edit-task').click(function() {
          var task = _.find(instance.tasksList.get(), {'__originalId': event.__originalId});
          task._id = task.__originalId
          Modal.show('updateTask', task);
        })

        //Add event listener to hide popover if click is outside
        var handle = function(evt) {
          if ($(evt.target).closest(jsEvent.target).length < 1) {
            popoverHolder.popover('hide');
          }
        };
        $(window).bind('click', handle);

        //remove the event listener when the popover is destroyed (on hide actually)
        popoverHolder.on('hidden.bs.popover', function() {
          $(window).unbind('click', handle);
        });
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
        if(view.type === "month") {
          date.hours(12);
        }
        $(jsEvent.target).popover({
          container: 'body',
          content: Blaze.toHTMLWithData(Template.quickCalendarAddPopover, date),
          html: true,
          placement: 'top',
          title: '<h4>Add task on ' + date.format('Do MMM YYYY, HH:mm') + '</h4>',
          trigger: 'manual'
        });
        $(jsEvent.target).popover('show');
        
        //Add event listener to hide popover if click is outside
        var handle = function(evt) {
          if(evt.target != jsEvent.target){
            $(jsEvent.target).popover('hide');
          }
        };
        $(window).bind('click', handle);

        //Record event listener for removeol on template destroy
        $(jsEvent.target).on('hidden.bs.popover', function() {
          $(window).unbind('click', handle);
        });

        //Add event handler to show modal. This cannot be done with Template.events because of the toHTMWithData function
        $('.quick-add-task').click(function(e) {
          e.preventDefault();
          var entityType = $(e.target).attr('id');
          Modal.show('insertNewTask', {
            entity_type: entityType,
            dueDate: date
          });
        });
      }
    }
  }
});

Template.displayCalendar.onDestroyed(function() {
  $('.fc-content').popover('destroy');
  //removes event listeners added manually
  this.eventsListeners.get().each(function(listener) {
    $(window).unbind(listener.evt, listener.handle);
  })
});