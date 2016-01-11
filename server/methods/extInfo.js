Meteor.methods({
  "extInfo.deleteGlobal": function(self) {
    var targets = null;
    var user = Meteor.users.findOne(this.userId);
    var tenant = Tenants.findOne(user.group);
    var fields = null;

    switch (self.targetEntity) {

      case "company":
        targets = Companies.find({
          _groupId: user.group
        }).fetch();

        _.each(targets, function(cx) {

          var cfMaster = [];

          if (cx.extendedInformation) {
            for (var cf in cx.extendedInformation) {
              if (cx.extendedInformation[cf].dataName !== self.name) {
                cfMaster.push(cx.extendedInformation[cf]);
              }
            }
            Companies.update(cx._id, {
              $set: {
                extendedInformation: cfMaster
              }
            });
          }
        });
        break;

      case "contact":
        targets = Contacts.find({
          _groupId: user.group
        }).fetch();

        _.each(targets, function(cx) {

          var cfMaster = [];

          if (cx.extendedInformation) {
            for (var cf in cx.extendedInformation) {
              if (cx.extendedInformation[cf].dataName !== self.name) {
                cfMaster.push(cx.extendedInformation[cf]);
              }
            }
            Contacts.update(cx._id, {
              $set: {
                extendedInformation: cfMaster
              }
            });
          }
        });
        break;

      case "project":
        targets = Projects.find({
          _groupId: user.group
        }).fetch();

        _.each(targets, function(cx) {

          var cfMaster = [];

          if (cx.extendedInformation) {
            for (var cf in cx.extendedInformation) {
              if (cx.extendedInformation[cf].dataName !== self.name) {
                cfMaster.push(cx.extendedInformation[cf]);
              }
            }
            Projects.update(cx._id, {
              $set: {
                extendedInformation: cfMaster
              }
            });
          }
        });
        break;

      case "product":
        targets = Products.find({}).fetch();

        _.each(targets, function(cx) {

          var cfMaster = [];

          if (cx.extendedInformation) {
            for (var cf in cx.extendedInformation) {
              if (cx.extendedInformation[cf].dataName !== self.name) {
                cfMaster.push(cx.extendedInformation[cf]);
              }
            }
            Products.update(cx._id, {
              $set: {
                extendedInformation: cfMaster
              }
            });
          }
        });
        break;
    }

    switch (self.targetEntity) {
      case 'company':
        fields = tenant.settings.extInfo.company;
        break;
      case 'contact':
        fields = tenant.settings.extInfo.contact;
        break;
      case 'project':
        fields = tenant.settings.extInfo.project;
        break;
      case 'product':
        fields = tenant.settings.extInfo.product;
        break;
    }

    var data = [];
    _.each(fields, function(f) {
      if (f.name !== self.name) {
        data.push(f);
      }
    });

    switch (self.targetEntity) {
      case 'company':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.company': data
          }
        });
        break;
      case 'contact':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.contact': data
          }
        });
        break;
      case 'project':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.project': data
          }
        });
        break;
      case 'product':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.product': data
          }
        });
        break;
    }
  },
  "extInfo.addNewGlobal": function(cfName, cfType, cfValue, cfEntity) {
    var user = Meteor.users.findOne(this.userId);
    var tenant = Tenants.findOne(user.group);
    var fields = null;

    switch (cfEntity) {
      case 'company':
        fields = tenant.settings.extInfo.company;
        break;
      case 'contact':
        fields = tenant.settings.extInfo.contact;
        break;
      case 'project':
        fields = tenant.settings.extInfo.project;
        break;
      case 'product':
        fields = tenant.settings.extInfo.product;
        break;
    }

    var data = [];
    _.each(fields, function(f) {
      data.push(f);
    });

    var orderValue = data.length;

    var newField = {
      name: cfName,
      type: cfType,
      defaultValue: cfValue,
      targetEntity: cfEntity,
      dataOrder: orderValue
    };

    if (_.findWhere(fields, newField) === undefined) {
      data.push(newField);
    }

    switch (cfEntity) {
      case 'company':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.company': data
          }
        });
        break;
      case 'contact':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.contact': data
          }
        });
        break;
      case 'project':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.project': data
          }
        });
        break;
      case 'product':
        Tenants.update(user.group, {
          $set: {
            'settings.extInfo.product': data
          }
        });
        break;
    }

    var targets = null;
    var collName = '';
    switch (cfEntity) {
      case 'company':
        collName = 'companies';
        targets = Companies.find({
          _groupId: user.group
        }).fetch();
        break;
      case 'contact':
        collName = 'contacts';
        targets = Contacts.find({
          _groupId: user.group
        }).fetch();
        break;
      case 'project':
        collName = 'projects';
        targets = Projects.find({
          _groupId: user.group
        }).fetch();
        break;
      case 'product':
        collName = 'products';
        targets = Products.find({
          _groupId: user.group
        }).fetch();
        break;
    }

    _.each(targets, function(tx) {
      var nameExists = false;
      var cfMaster = [];

      if (tx.extendedInformation) {
        for (var cf in tx.extendedInformation) {
          if (tx.extendedInformation.hasOwnProperty(cf)) {
            if (tx.extendedInformation[cf].dataName === cfName) {
              nameExists = true;
              break;
            }
            cfMaster.push(tx.extendedInformation[cf]);
          }
        }
      }

      if (!nameExists) {
        var settings = {
          "dataName": cfName,
          "dataValue": cfValue,
          "dataType": cfType,
          "isGlobal": true,
          dataOrder: orderValue
        };
        cfMaster.push(settings);

        if (collName === 'companies') {
          Companies.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'contacts') {
          Contacts.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'projects') {
          Projects.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }

        if (collName === 'products') {
          Products.update(tx._id, {
            $set: {
              extendedInformation: cfMaster
            }
          });
        }
      }
    });

    return true;
  },
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
