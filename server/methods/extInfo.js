Meteor.methods({
  changeExtInfoOrder: function(type, name, direction) {
    var value = (direction === "up" ? -1 : 1);
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (!user) {
      return {
        exitCode: 1,
        exitStatus: "Failure: no user."
      };
    }

    var currentOrder = Tenants.findOne({
      _id: user.group
    }).settings.extInfo[type].sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });

    var index = -1;
    _.each(currentOrder, function(co, i) {
      if (co.name === name) index = i;
    });
    var GaiaRecord = currentOrder[index];

    GaiaRecord.dataOrder = GaiaRecord.dataOrder + value;
    if (GaiaRecord.dataOrder < 0 || GaiaRecord.dataOrder > currentOrder.length - 1) {
      return {
        exitCode: 2,
        exitStatus: "Failure: beyond bounds."
      };
    }

    _.each(currentOrder, function(co, i) {
      if (co.name !== name) {
        if (co.dataOrder === GaiaRecord.dataOrder) {
          co.dataOrder = co.dataOrder - value;
        }
      }
    });
    if (type === 'company') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.company': currentOrder
        }
      });
    }
    if (type === 'contact') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.contact': currentOrder
        }
      });
    }
    if (type === 'project') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.project': currentOrder
        }
      });
    }

    return {
      exitCode: 0,
      exitStatus: "Success."
    };
  }
});
