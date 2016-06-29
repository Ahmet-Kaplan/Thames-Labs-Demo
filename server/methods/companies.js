Meteor.methods({
  'company.checkExistsByName': function(companyName) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    var results = Companies.find({
      name: {$regex: companyName, $options: 'i'},
      _groupId: user.group
    }).fetch();
    if (results.length >= 1) return results[0];
    return null;

  },
  'company.getMergeTargets': function(companyId) {
    return Companies.find({
      _id: {
        $ne: companyId
      }
    }, {
      fields: {
        name: 1
      }
    }).fetch();
  },
  'company.findById': function(companyId) {
    return Companies.findOne({
      _id: companyId
    });
  },
  'company.merge': function(sourceId, targetId, deleteSource) {

    if (!Roles.userIsInRole(this.userId, 'Administrator')) {
      return {
        code: -1,
        error: 'Only administrators can merge records.',
        source: 'Company record merge failed'
      };
    }

    var sourceRecord = Companies.findOne({
      _id: sourceId
    });
    var targetRecord = Companies.findOne({
      _id: targetId
    });

    if (!sourceRecord || !targetRecord) {
      return -1;
    }

    var name = (targetRecord.name ? targetRecord.name : sourceRecord.name);
    var address = (targetRecord.address ? targetRecord.address : sourceRecord.address);
    var address2 = (targetRecord.address2 ? targetRecord.address2 : sourceRecord.address2);
    var city = (targetRecord.city ? targetRecord.city : sourceRecord.city);
    var county = (targetRecord.county ? targetRecord.county : sourceRecord.county);
    var postcode = (targetRecord.postcode ? targetRecord.postcode : sourceRecord.postcode);
    var country = (targetRecord.country ? targetRecord.country : sourceRecord.country);
    var website = (targetRecord.website ? targetRecord.website : sourceRecord.website);
    var phone = (targetRecord.phone ? targetRecord.phone : sourceRecord.phone);
    var metadata = (targetRecord.metadata ? targetRecord.metadata : sourceRecord.metadata);

    Companies.update({
      _id: targetRecord._id
    }, {
      $set: {
        name: name,
        address: address,
        address2: address2,
        city: city,
        county: county,
        country: country,
        postcode: postcode,
        website: website,
        phone: phone,
        metadata: metadata
      }
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Company record merge failed'
        };
      }
    });

    Activities.insert({
      type: 'Note',
      notes: sourceRecord.name + " was merged into this company",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      companyId: targetRecord._id,
      primaryEntityId: targetRecord._id,
      primaryEntityType: 'companies',
      primaryEntityDisplayData: targetRecord.name,
      createdBy: Meteor.userId()
    });

    Activities.update({
      companyId: sourceId
    }, {
      $set: {
        companyId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Activity record merge failed'
        };
      }
    });

    Contacts.update({
      companyId: sourceId
    }, {
      $set: {
        companyId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Contact record merge failed'
        };
      }
    });

    CustomFields.update({
      entityId: sourceId,
      global: false
    }, {
      $set: {
        entityId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Custom field record merge failed'
        };
      }
    });

    Opportunities.update({
      companyId: sourceId
    }, {
      $set: {
        companyId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Opportunity record merge failed'
        };
      }
    });

    Projects.update({
      companyId: sourceId
    }, {
      $set: {
        companyId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Project record merge failed'
        };
      }
    });

    PurchaseOrders.update({
      supplierCompanyId: sourceId
    }, {
      $set: {
        supplierCompanyId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) {
        return {
          code: -1,
          error: err,
          source: 'Purchase order record merge failed'
        };
      }
    });

    Tasks.update({
      entityId: sourceId
    }, {
      $set: {
        entityId: targetId
      }
    }, {
      multi: true
    }, function(err) {
      if (err) return -1;
    });

    if (deleteSource) {
      Companies.remove({
        _id: sourceId
      }, function(err) {
        if (err) {
          return {
            code: -1,
            error: err,
            source: 'Project record merge failed'
          };
        }
      });
    }

    return 0;
  }
});