Meteor.methods({
  rptTasksCreated: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var taskData = Tasks.find({}).fetch();
      var data = {
        "CreatedTasks": (!Meteor.isDevelopment ? [] : taskData),
        "Count": taskData.length
      }
      return data;
    });
  },
  rptTasksCompleted: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var taskData = Tasks.find({
        completed: {
          $eq: true
        }
      }).fetch();
      var data = {
        "CompletedTasks": (!Meteor.isDevelopment ? [] : taskData),
        "Count": taskData.length
      }
      return data;
    });
  },
  rptTasksDueInTheNextWeek: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var startDate = moment();
      var endDate = moment(startDate).add(7, 'days');

      var taskData = Tasks.find({
        dueDate: {
          $gte: startDate.toDate(),
          $lte: endDate.toDate()
        }
      }).fetch();
      var data = {
        "DueTasks": (!Meteor.isDevelopment ? [] : taskData),
        "Count": taskData.length
      }
      return data;
    });
  },
  rptTasksOverdue: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var startDate = moment();

      var taskData = Tasks.find({
        dueDate: {
          $lt: startDate.toDate()
        },
        completed: {
          $eq: false
        }
      }).fetch();
      var data = {
        "OverdueTasks": (!Meteor.isDevelopment ? [] : taskData),
        "Count": taskData.length
      }
      return data;
    });
  },
  rptCompaniesStored: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var companyData = Companies.find({}).fetch();
      var data = {
        "StoredCompanies": (!Meteor.isDevelopment ? [] : companyData),
        "Count": companyData.length
      }
      return data;
    });
  },
  rptContactsStored: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var contactData = Contacts.find({}).fetch();
      var data = {
        "StoredContacts": (!Meteor.isDevelopment ? [] : contactData),
        "Count": contactData.length
      }
      return data;
    });
  },
  rptNumberOfProjects: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projectData = Projects.find({}).fetch();
      var data = {
        "StoredProjects": (!Meteor.isDevelopment ? [] : projectData),
        "Count": projectData.length
      }
      return data;
    });
  },
  rptActiveProjects: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projectData = Projects.find({
        active: {
          $eq: true
        }
      }).fetch();
      var data = {
        "ActiveProjects": (!Meteor.isDevelopment ? [] : projectData),
        "Count": projectData.length
      }
      return data;
    });
  },
  rptActiveProjectsValue: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projData = Projects.find({
        active: {
          $eq: true
        }
      }).fetch();
      var value = 0;

      _.each(projData, function(pd) {
        if (pd.value) {
          value += parseFloat(od.value)
        }
      });

      var data = {
        "ActiveProjects": (!Meteor.isDevelopment ? [] : projData),
        "Count": projData.length,
        "Value": parseFloat(value).toFixed(2)
      }
      return data;
    });
  },
  rptAverageActiveProjectValue: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projData = Projects.find({
        active: {
          $eq: true
        }
      }).fetch();
      var value = 0;

      _.each(projData, function(pd) {
        if (pd.value) {
          value += parseFloat(od.value)
        }
      });

      var data = {
        "ActiveProjects": (!Meteor.isDevelopment ? [] : projData),
        "Count": projData.length,
        "Value": parseFloat(value / projData.length).toFixed(2)
      }
      return data;
    });
  },
  rptNumberOfOpportunities: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var oppData = Opportunities.find({}).fetch();
      var data = {
        "Opportunities": (!Meteor.isDevelopment ? [] : oppData),
        "Count": oppData.length
      }
      return data;
    });
  },
  rptValueOfOpportunities: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var oppData = Opportunities.find({}).fetch();
      var value = 0;

      _.each(oppData, function(od) {
        if (od.value) {
          value += parseFloat(od.value)
        }
      });

      var data = {
        "Opportunities": (!Meteor.isDevelopment ? [] : oppData),
        "Count": oppData.length,
        "Value": parseFloat(value).toFixed(2)
      }
      return data;
    });
  },
  rptAverageOpportunityValue: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var oppData = Opportunities.find({}).fetch();
      var value = 0;

      _.each(oppData, function(od) {
        if (od.value) {
          value += parseFloat(od.value)
        }
      });

      var data = {
        "Opportunities": (!Meteor.isDevelopment ? [] : oppData),
        "Count": oppData.length,
        "Value": parseFloat(value / oppData.length).toFixed(2)
      }
      return data;
    });
  },
  rptNumberOfProducts: function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var productData = Products.find({}).fetch();
      var data = {
        "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
        "Count": productData.length
      }
      return data;
    });
  }
});
