Meteor.methods({
  'report.tasksCreated': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var taskData = Tasks.find({}).fetch();
      var data = {
        "CreatedTasks": (!Meteor.isDevelopment ? [] : taskData),
        "Count": taskData.length
      }
      return data;
    });
  },
  'report.tasksCompleted': function() {
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
  'report.tasksDueInTheNextWeek': function() {
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
  'report.tasksOverdue': function() {
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
  'report.companiesStored': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var companyData = Companies.find({}).fetch();
      var data = {
        "StoredCompanies": (!Meteor.isDevelopment ? [] : companyData),
        "Count": companyData.length
      }
      return data;
    });
  },
  'report.contactsStored': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var contactData = Contacts.find({}).fetch();
      var data = {
        "StoredContacts": (!Meteor.isDevelopment ? [] : contactData),
        "Count": contactData.length
      }
      return data;
    });
  },
  'report.numberOfProjects': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projectData = Projects.find({}).fetch();
      var data = {
        "StoredProjects": (!Meteor.isDevelopment ? [] : projectData),
        "Count": projectData.length
      }
      return data;
    });
  },
  'report.activeProjects': function() {
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
  'report.activeProjectsValue': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projData = Projects.find({
        active: {
          $eq: true
        }
      }).fetch();
      var value = 0;

      _.each(projData, function(pd) {
        if (pd.value) {
          value += parseFloat(pd.value)
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
  'report.activeProjects': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var projData = Projects.find({
        active: {
          $eq: true
        }
      }).fetch();
      var value = 0;

      _.each(projData, function(pd) {
        if (pd.value) {
          value += parseFloat(pd.value)
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
  'report.numberOfOpportunities': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var oppData = Opportunities.find({}).fetch();
      var data = {
        "Opportunities": (!Meteor.isDevelopment ? [] : oppData),
        "Count": oppData.length
      }
      return data;
    });
  },
  'report.valueOfOpportunities': function() {
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
  'report.averageOpportunityValue': function() {
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
  'report.numberOfProducts': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var productData = Products.find({}).fetch();
      var data = {
        "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
        "Count": productData.length
      }
      return data;
    });
  },
  'report.costOfProducts': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var productData = Products.find({}).fetch();
      var value = 0;

      _.each(productData, function(pd) {
        if (pd.value) {
          value += parseFloat(pd.value)
        }
      });

      var data = {
        "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
        "Count": productData.length,
        "Value": parseFloat(value).toFixed(2)
      }
      return data;
    });
  },
  'report.averageProductsCost': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var productData = Products.find({}).fetch();
      var value = 0;

      _.each(productData, function(pd) {
        if (pd.value) {
          value += parseFloat(pd.value)
        }
      });

      var data = {
        "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
        "Count": productData.length,
        "Value": parseFloat(value / productData.length).toFixed(2)
      }
      return data;
    });
  },
  'report.numberOfPurchaseOrders': function() {
    return Partitioner.bindUserGroup(this.userId, function() {
      var purchaseData = Products.find({}).fetch();
      var data = {
        "StoredPurchaseOrders": (!Meteor.isDevelopment ? [] : purchaseData),
        "Count": purchaseData.length
      }
      return data;
    });
  },
});
