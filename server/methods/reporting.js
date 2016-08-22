import { Products } from '/imports/api/collections.js';
Meteor.methods({
  //Tasks
  'report.tasksCreated': function() {
    if (!this.userId) return;
    const taskData = Tasks.find({}).fetch(),
          data = {
            "CreatedTasks": (!Meteor.isDevelopment ? [] : taskData),
            "Count": (taskData.length)
          };
    return data;
  },
  'report.tasksCompleted': function() {
    if (!this.userId) return;
    const taskData = Tasks.find({
            completed: {
              $eq: true
            }
          }).fetch(),
          data = {
            "CompletedTasks": (!Meteor.isDevelopment ? [] : taskData),
            "Count": (taskData.length)
          };
    return data;
  },
  'report.tasksDueInTheNextWeek': function() {
    if (!this.userId) return;
    const startDate = moment(),
          endDate = moment(startDate).add(7, 'days'),
          taskData = Tasks.find({
            dueDate: {
              $gte: startDate.toDate(),
              $lte: endDate.toDate()
            }
          }).fetch(),
          data = {
            "DueTasks": (!Meteor.isDevelopment ? [] : taskData),
            "Count": (taskData.length)
          };
    return data;
  },
  'report.tasksOverdue': function() {
    if (!this.userId) return;
    const startDate = moment(),
          taskData = Tasks.find({
            dueDate: {
              $lt: startDate.toDate()
            },
            completed: {
              $eq: false
            }
          }).fetch(),
          data = {
            "OverdueTasks": (!Meteor.isDevelopment ? [] : taskData),
            "Count": (taskData.length)
          };
    return data;
  },
  //Companies
  'report.companiesStored': function() {
    if (!this.userId) return;
    const companyData = Companies.find({}).fetch(),
          data = {
            "StoredCompanies": (!Meteor.isDevelopment ? [] : companyData),
            "Count": (companyData.length)
          };
    return data;
  },
  //Contacts
  'report.contactsStored': function() {
    if (!this.userId) return;
    const contactData = Contacts.find({}).fetch(),
          data = {
            "StoredContacts": (!Meteor.isDevelopment ? [] : contactData),
            "Count": (contactData.length)
          };
    return data;
  },
  //Projects
  'report.numberOfProjects': function() {
    if (!this.userId) return;
    const projectData = Projects.find({}).fetch(),
          data = {
            "StoredProjects": (!Meteor.isDevelopment ? [] : projectData),
            "Count": (projectData.length)
          };
    return data;
  },
  'report.activeProjects': function() {
    if (!this.userId) return;
    const projectData = Projects.find({
            active: {
              $eq: true
            }
          }).fetch(),
          data = {
            "ActiveProjects": (!Meteor.isDevelopment ? [] : projectData),
            "Count": (projectData.length)
          };
    return data;
  },
  'report.projectValue': function() {
    if (!this.userId) return;
    const projectData = Projects.find({
      active: {
        $eq: true
      }
    }).fetch();

    let value = 0;

    _.each(projectData, function(pd) {
      if (pd.value) {
        value += parseFloat(pd.value);
      }
    });

    const data = {
      "Value": value.toFixed(2)
    };
    return data;
  },
  'report.projectsAverage': function() {
    if (!this.userId) return;
    const projData = Projects.find({
      active: {
        $eq: true
      }
    }).fetch();

    let value = 0;

    _.each(projData, function(pd) {
      if (pd.value) {
        value += parseFloat(pd.value);
      }
    });

    if (projData.length) {
      const data = {
        "Value": (value / projData.length).toFixed(2)
      };
      return data;
    }

    data = {
      "Value": "0.00"
    };
    return data;
  },
  //Opportunities
  'report.openOpportunities': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
            isArchived: {
              $ne: true
            }
          }).fetch(),
          data = {
            "Count": (oppData.length)
          };
    return data;
  },
  'report.archivedOpportunities': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
            isArchived: {
              $eq: true
            }
          }).fetch(),
          data = {
            "Count": (oppData.length)
          };
    return data;
  },
  'report.wonOpportunities': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
            hasBeenWon: {
              $eq: true
            }
          }).fetch(),
          data = {
            "Count": (oppData.length)
          };
    return data;
  },
  'report.lostOpportunities': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
            isArchived: {
              $eq: true
            },
            hasBeenWon: {
              $ne: true
            }
          }).fetch(),
          data = {
            "Count": (oppData.length)
          };
    return data;
  },
  'report.valueOfOpportunities': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
      isArchived: {
        $ne: true
      }
    }).fetch();

    let value = 0;

    _.each(oppData, function(od) {
      if (od.value) {
        value += parseFloat(od.value);
      }
    });

    if (oppData.length) {
      const data = {
        "Value": value.toFixed(2)
      };
      return data;
    }

    data = {
      "Value": "0.00"
    };
    return data;
  },
  'report.averageOpportunityValue': function() {
    if (!this.userId) return;
    const oppData = Opportunities.find({
      isArchived: {
        $ne: true
      },
      value: {
        $gt: 0
      }
    }).fetch();

    let value = 0;

    _.each(oppData, function(od) {
      if (od.value) {
        value += parseFloat(od.value);
      }
    });

    if (oppData.length) {
      const data = {
        "Value": (value / oppData.length).toFixed(2)
      };
      return data;
    }

    data = {
      "Value": "0.00"
    };
    return data;
  },


  //Products
  'report.numberOfProducts': function() {
    if (!this.userId) return;
    const productData = Products.find({}).fetch(),
          data = {
            "StoredProducts": (!Meteor.isDevelopment ? [] : productData),
            "Count": productData.length
          };
    return data;
  },
  'report.costOfProducts': function() {
    if (!this.userId) return;
    const productData = Products.find({}).fetch();
    let value = 0;
    _.each(productData, function(pd) {
      if (pd.cost) {
        value += parseFloat(pd.cost);
      }
    });
    const data = {
      "Value": value.toFixed(2)
    };
    return data;
  },
  'report.averageProductsCost': function() {
    if (!this.userId) return;
    const productData = Products.find({}).fetch();
    let value = 0;
    _.each(productData, function(pd) {
      if (pd.cost) {
        value += parseFloat(pd.cost);
      }
    });
    if (productData.length) {
      const data = {
        "Value": (value / productData.length).toFixed(2)
      };
      return data;
    }
    data = {
      "Value": "0.00"
    };
    return data;
  },
  //Purchase Orders
  'report.numberOfPurchaseOrders': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({}).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  },
  'report.ApprovedPo': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({
            status: {
              $eq: "Approved"
            }
          }).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  },
  'report.ArrivedPo': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({
            status: {
              $eq: "Arrived"
            }
          }).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  },
  'report.ClosedPo': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({
            status: {
              $eq: "Closed"
            }
          }).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  },
  'report.CancelledPo': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({
            status: {
              $eq: "Cancelled"
            }
          }).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  },
  'report.RejectedPo': function() {
    if (!this.userId) return;
    const purchaseData = PurchaseOrders.find({
            status: {
              $eq: "Rejected"
            }
          }).fetch(),
          data = {
            "Count": (purchaseData.length)
          };
    return data;
  }
});
