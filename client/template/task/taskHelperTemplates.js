Template.insertNewTask.helpers({
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  getEntityType: function() {
    return this.entity_type;
  },
  getEntityId: function() {
    return this.entity_id;
  },
  isUserTask: function(){
    return (this.entity_type ==="user" ? true:false);
  },
  getCurrentUserId: function(){
    return Meteor.userId();
  }
});

Template.insertNewTask.events({

});

Template.updateTask.helpers({
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  isUserTask: function(){
    return (this.entity_type ==="user" ? true:false);
  },
  getCurrentUserId: function(){
    return Meteor.userId();
  }
});

Template.updateTask.events({
});

Template.insertNewTask.events({

});

Template.taskDisplay.helpers({
  isDashboard: function(){
    return(Router.current().route.getName() === "dashboard" ? true : false);
  },
  tasks: function() {
    return Tasks.find({
      entityId: this.entity_id,
      completed: false
    });
  }
});

Template.taskDisplay.events({
  'click #btnAddTaskToEntity': function() {
    Modal.show('insertNewTask', this);
  }
});

Template.taskDisplayItem.helpers({});

Template.taskDisplayItem.events({
  'click #btnEditEntityTask': function() {
    Modal.show('updateTask', this);
  },
  'click #btnDeleteEntityTask': function() {
    Tasks.remove(this._id);
  }
});
