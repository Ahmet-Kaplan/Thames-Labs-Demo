Meteor.methods({
  //Tasks
  'report.tasksCreated': function() {
    if (!this.userId) return;
    var taskData = Tasks.find({}).fetch();
    var data = {
      "CreatedTasks": (!Meteor.isDevelopment ? [] : taskData),
      "Count": (taskData.length)
    }
    return data;
  },
  'report.tasksCompleted': function() {
    if (!this.userId) return;
    var taskData = Tasks.find({
      completed: {
        $eq: true
      }
    }).fetch();
    var data = {
      "CompletedTasks": (!Meteor.isDevelopment ? [] : taskData),
      "Count": (taskData.length)
    }
    return data;
  },
  'report.tasksDueInTheNextWeek': function() {
    if (!this.userId) return;
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
      "Count": (taskData.length)
    }
    return data;
  },
  'report.tasksOverdue': function() {
    if (!this.userId) return;
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
      "Count": (taskData.length)
    }
    return data;
  },
  //Companies
  'report.companiesStored': function() {
    if (!this.userId) return;
    var companyData = Companies.find({}).fetch();
    var data = {
      "StoredCompanies": (!Meteor.isDevelopment ? [] : companyData),
      "Count": (companyData.length)
    }
    return data;
  },
  //Contacts
  'report.contactsStored': function() {
    if (!this.userId) return;
    var contactData = Contacts.find({}).fetch();
    var data = {
      "StoredContacts": (!Meteor.isDevelopment ? [] : contactData),
      "Count": (contactData.length)
    }
    return data;
  },
  //Projects
  'report.numberOfProjects': function() {
    if (!this.userId) return;
    var projectData = Projects.find({}).fetch();
    var data = {
      "StoredProjects": (!Meteor.isDevelopment ? [] : projectData),
      "Count": (projectData.length)
    }
    return data;
  },
  'report.activeProjects': function() {
    if (!this.userId) return;
    var projectData = Projects.find({
      active: {
        $eq: true
      }
    }).fetch();
    var data = {
      "ActiveProjects": (!Meteor.isDevelopment ? [] : projectData),
      "Count": (projectData.length)
    }
    return data;
  },
  'report.projectValue': function() {
    if (!this.userId) return;
    var projectData = Projects.find({
      active: {
        $eq: true
      }
    }).fetch();
    var value = 0;

    _.each(projectData, function(pd) {
      if (pd.value) {
        value += parseFloat(pd.value)
      }
    });

    var data = {
      "Value": value.toFixed(2)
    }
    return data;
  },
  'report.projectsAverage': function() {
    if (!this.userId) return;
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
    if (projData.length) {

      const data = {
        "Value": (value / projData.length).toFixed(2)
      }
      return data;
    }
    const data = {
      "Value": "0.00"
    }
    return data;
  },
  //Opportunities
  'report.numberOfOpportunities': function() {
    if (!this.userId) return;
    var oppData = Opportunities.find({}).fetch();
    var data = {
      "Count": (oppData.length)
    }
    return data;
  },
  'report.archivedOpportunities': function() {
    if (!this.userId) return;
    var oppData = Opportunities.find({
      isArchived: {
        $eq: true
      }
    }).fetch();
    var data = {
      "Count": (oppData.length)
    }
    return data;
  },
  'report.valueOfOpportunities': function() {
    if (!this.userId) return;
    var oppData = Opportunities.find({
      isArchived: {
        $ne: true
      }
    }).fetch();
    var value = 0;
    _.each(oppData, function(od) {
      if (od.value) {
        value += parseFloat(od.value);
      }
    });
    if (oppData.length) {
      const data = {
        "Value": value.toFixed(2)
      }
      return data;
    }
    const data = {
      "Value": "0.00"
    }
    return data;
  },
  'report.averageOpportunityValue': function() {
    if (!this.userId) return;
    var oppData = Opportunities.find({
      isArchived: {
        $ne: true
      }
    }).fetch();
    var value = 0;
    _.each(oppData, function(od) {
      if (od.value) {
        value += parseFloat(od.value)
      }
    });
    if (oppData.length) {
      const data = {
        "Value": (value / oppData.length).toFixed(2)
      }
      return data;
    }
    const data = {
      "Value": "0.00"
    }
    return data;
  },


  //Products
  'report.numberOfProducts': function() {
    if (!this.userId) return;
    var productData = Products.find({}).fetch();
    var data = {
      "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
      "Count": productData.length
    }
    return data;
  },
  'report.costOfProducts': function() {
    if (!this.userId) return;
    var productData = Products.find({}).fetch();
    var value = 0;
    _.each(productData, function(pd) {
      if (pd.cost) {
        value += parseFloat(pd.cost)
      }
    });
    var data = {
      "Value": value.toFixed(2)
    }
    return data;
  },
  'report.averageProductsCost': function() {
    if (!this.userId) return;
    var productData = Products.find({}).fetch();
    var value = 0;
    _.each(productData, function(pd) {
      if (pd.cost) {
        value += parseFloat(pd.cost)
      }
    });
    if (productData.length) {
      const data = {
        "Value": (value / productData.length).toFixed(2)
      }
      return data;
    }
    const data = {
      "Value": "0.00"
    }
    return data;
  },
  //Purchase Orders
  'report.numberOfPurchaseOrders': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({}).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  },
  'report.ApprovedPo': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({
      status: {
        $eq: "Approved"
      }
    }).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  },
  'report.ArrivedPo': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({
      status: {
        $eq: "Arrived"
      }
    }).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  },
  'report.ClosedPo': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({
      status: {
        $eq: "Closed"
      }
    }).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  },
  'report.CancelledPo': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({
      status: {
        $eq: "Cancelled"
      }
    }).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  },
  'report.RejectedPo': function() {
    if (!this.userId) return;
    var purchaseData = PurchaseOrders.find({
      status: {
        $eq: "Rejected"
      }
    }).fetch();
    var data = {
      "Count": (purchaseData.length)
    }
    return data;
  }
});