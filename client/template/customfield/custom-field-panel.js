Template.customFieldDisplay.events({
  'click #add-custom-field': function(event) {
    event.preventDefault();
    Modal.show('addCustomField', this);
  },
  'click #edit-custom-fields': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  },
});

Template.customFieldDisplay.helpers({
  hasCustomFields: function() {
    return this.entity_data.extendedInformation.length > 0;
  },
  globalFields: function() {
    var ret = [];
    var extInfo = this.entity_data.extendedInformation;
    var panelDisplayMode = FlowRouter.current().route.name;
    var orderList = [];
    var arr = [];

    switch (panelDisplayMode) {
      case 'company':
        arr = Tenants.findOne({
          _id: Meteor.user().group
        }).settings.extInfo.company;
        break;
      case 'contact':
        arr = Tenants.findOne({
          _id: Meteor.user().group
        }).settings.extInfo.contact;
        break;
      case 'project':
        arr = Tenants.findOne({
          _id: Meteor.user().group
        }).settings.extInfo.project;
        break;
    }

    _.each(arr, function(e) {
      orderList.push({
        'name': e.name,
        'dataOrder': e.dataOrder
      });
    });

    _.each(_.where(extInfo, {
      isGlobal: true
    }), function(ei) {
      var dv = ei.dataValue;
      switch (ei.dataType) {
        case 'checkbox':
          dv = (ei.dataValue ? ei.dataValue : "false");
          break;
        case 'date':
          dv = new moment(ei.dataValue).format('MMMM Do YYYY');
          break;
      }
      var orderIndex = -1;
      for (var x = 0; x < orderList.length; x++) {
        if (orderList[x].name === ei.dataName) {
          orderIndex = x;
          break;
        }
      }
      var orderValue = (orderIndex === -1 ? 0 : orderList[orderIndex].dataOrder);

      var cfObj = {
        name: ei.dataName,
        value: ei.dataValue,
        type: ei.dataType,
        displayValue: dv,
        isGlobal: true,
        dataOrder: orderValue
      };
      ret.push(cfObj);
    });

    return ret.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  },
  customFields: function() {
    var ret = [];
    var extInfo = this.entity_data.extendedInformation;
    _.each(_.where(extInfo, {
      isGlobal: false
    }), function(ei) {
      var dv = ei.dataValue;
      switch (ei.dataType) {
        case 'checkbox':
          dv = (ei.dataValue ? ei.dataValue : "false");
          break;
        case 'date':
          dv = new moment(ei.dataValue).format('MMMM Do YYYY');
          break;
      }

      var cfObj = {
        name: ei.dataName,
        value: ei.dataValue,
        type: ei.dataType,
        displayValue: dv,
        isGlobal: false
      };
      ret.push(cfObj);
    });

    return ret.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  }
});
