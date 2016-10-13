import { check, Match } from 'meteor/check';
import { Activities, Jobs, Tenants } from '/imports/api/collections.js';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'jobs.changeMilestoneOrder': function(typeId, milestoneId, newIndex) {

    if (!this.userId) throw new Meteor.Error('Only logged in users may update job milestones');

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) throw new Meteor.Error('Only users with administrator permission can move job milestones');

    var userTenant = Tenants.findOne(Meteor.user().group);
    var jobTypes = userTenant.settings.job.types;
    var typeMilestones = _.find(jobTypes, { 'id': typeId }).milestones;
    const currentMilestone = _.find(typeMilestones, { 'id': milestoneId });
    const currentIndex = _.findIndex(typeMilestones, { 'id': milestoneId });

    //Reorder array
    _.pullAt(typeMilestones, currentIndex);
    typeMilestones.splice(newIndex, 0, currentMilestone);
    _.find(jobTypes, { 'id': typeId }).milestones = typeMilestones;

    //Save changes
    Tenants.update(userTenant._id, {
      $set: {
        'settings.job.types': jobTypes
      }
    });
  },
  'job.invertState': function(jobId) {
    var user = Meteor.users.findOne({_id: this.userId});
    var job = Jobs.findOne({
      _id: jobId
    });
    var newState = (job.active ? "inactive" : "active");
    if (job) {
      Jobs.update({
        _id: jobId
      }, {
        $set: {
          active: !job.active
        }
      }, function(err) {
        if(!err) {

          Activities.insert({
            type: 'Note',
            notes: user.profile.name + ' marked this job as ' + newState,
            createdAt: new Date(),
            activityTimestamp: new Date(),
            jobId: jobId,
            primaryEntityId: jobId,
            primaryEntityType: 'jobs',
            primaryEntityDisplayData: job.name,
            createdBy: user._id
          });
        }
      });
    }
  },
  typeIsInUse: function(typeId) {
    var job = Jobs.findOne({
      jobTypeId: typeId
    });
    return {
      exitCode: 0,
      exitStatus: !!job
    };
  },
  milestoneIsInUse: function(typeId, milestoneId) {
    var job = Jobs.findOne({
      jobTypeId: typeId,
      jobMilestoneId: milestoneId
    });
    return {
      exitCode: 0,
      exitStatus: !!job
    };
  },

  'setMilestone': function(id, milestoneId) {
    check(id, String);
    check(milestoneId, Match.Integer);

    if(!this.userId) throw new Meteor.Error('Only logged in users may update job milestones');
    if(!Roles.userIsInRole(this.userId, ['CanEditJobs'])) throw new Meteor.Error('Only users with permission to edit jobs can move job milestones');

    Jobs.update(id, { $set: { jobMilestoneId: milestoneId }});

    return;
  },

  addJobType: function(name) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var exists = false;
          var maxId = -1;
          _.each(currentTypes, function(t) {
            if (t.id > maxId) {
              maxId = t.id;
            }
            if (t.name === name) {
              exists = true;
            }
          });
          if (exists === false) {
            var newType = {
              id: maxId + 1,
              name: name,
              milestones: []
            };
            currentTypes.push(newType);
            Tenants.update({
              _id: userTenant._id
            }, {
              $set: {
                "settings.job.types": currentTypes
              }
            });

            return {
              exitCode: 0,
              exitStatus: "Job type added successfully."
            };
          }
          return {
            exitCode: 1,
            exitStatus: "Job type already exists."
          };
          //type name in use
        }
        return {
          exitCode: 2,
          exitStatus: "No job settings found in tenant object."
        };
        //no job settings
      }
      return {
        exitCode: 3,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 4,
      exitStatus: "No user found."
    };
    //no user
  },
  updateJobType: function(id, name) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === id) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            currentTypes[typeIndex].name = name;
            Tenants.update({
              _id: userTenant._id
            }, {
              $set: {
                "settings.job.types": currentTypes
              }
            });
            return {
              exitCode: 0,
              exitStatus: "Job type updated successfully."
            };
          }
          return {
            exitCode: 1,
            exitStatus: "Type not found."
          };
          //type name in use
        }
        return {
          exitCode: 2,
          exitStatus: "No job settings found in tenant object."
        };
        //no job settings
      }
      return {
        exitCode: 3,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 4,
      exitStatus: "No user found."
    };
    //no user
  },
  removeJobType: function(id) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === id) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            currentTypes.splice(typeIndex, 1);
            Tenants.update({
              _id: userTenant._id
            }, {
              $set: {
                "settings.job.types": currentTypes
              }
            });
            return {
              exitCode: 0,
              exitStatus: "Job type removed successfully."
            };
          }
          return {
            exitCode: 1,
            exitStatus: "Type not found."
          };
          //type name in use
        }
        return {
          exitCode: 2,
          exitStatus: "No job settings found in tenant object."
        };
        //no job settings
      }
      return {
        exitCode: 3,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 4,
      exitStatus: "No user found."
    };
    //no user
  },

  addJobMilestone: function(typeId, name, description) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var selectedType = currentTypes[typeIndex];
            var milestones = selectedType.milestones;
            var maxId = -1;
            var exists = false;
            _.each(milestones, function(m) {
              if (m.id > maxId) {
                maxId = m.id;
              }
              if (m.name === name) {
                exists = true;
              }
            });
            if (exists === false) {
              var newMilestone = {
                id: maxId + 1,
                name: name,
                description: description
              };
              milestones.push(newMilestone);

              Tenants.update({
                _id: userTenant._id,
                "settings.job.types.id": typeId
              }, {
                $set: {
                  "settings.job.types.$.milestones": milestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Job milestone added successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Job milestone already exists."
            };
            //type name in use
          }
          return {
            exitCode: 2,
            exitStatus: "Type not found."
          };
          //type name in use
        }
        return {
          exitCode: 3,
          exitStatus: "No job settings found in tenant object."
        };
        //no job object
      }
      return {
        exitCode: 4,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 5,
      exitStatus: "No user found."
    };
    //no user
  },

  updateJobMilestone: function(typeId, milestoneId, name, description) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var currentMilestones = jobSettings.types[typeIndex].milestones;
            var milestoneIndex = -1;
            for (var j = 0, mLen = currentMilestones.length; j < mLen; j++) {
              if (currentMilestones[j].id === milestoneId) {
                milestoneIndex = j;
                break;
              }
            }

            if (milestoneIndex !== -1) {
              currentMilestones[milestoneIndex].name = name;
              currentMilestones[milestoneIndex].description = description;

              Tenants.update({
                _id: userTenant._id,
                "settings.job.types.id": typeId
              }, {
                $set: {
                  "settings.job.types.$.milestones": currentMilestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Job milestone updated successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Job milestone not found."
            };
            //type name in use
          }
          return {
            exitCode: 2,
            exitStatus: "Type not found."
          };
          //type name in use
        }
        return {
          exitCode: 3,
          exitStatus: "No job settings found in tenant object."
        };
        //no job object
      }
      return {
        exitCode: 4,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 5,
      exitStatus: "No user found."
    };
    //no user
  },

  removeJobMilestone: function(typeId, milestoneId) {

    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var jobSettings = userTenant.settings.job;
        if (jobSettings) {
          var currentTypes = jobSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var currentMilestones = jobSettings.types[typeIndex].milestones;

            if (currentMilestones.length === 2) {
              return {
                exitCode: 6,
                exitStatus: "A job type must have at least two milestones."
              };
            }

            var milestoneIndex = -1;
            for (var j = 0, mLen = currentMilestones.length; j < mLen; j++) {
              if (currentMilestones[j].id === milestoneId) {
                milestoneIndex = j;
                break;
              }
            }

            if (milestoneIndex !== -1) {
              currentMilestones.splice(milestoneIndex, 1);

              Tenants.update({
                _id: userTenant._id,
                "settings.job.types.id": typeId
              }, {
                $set: {
                  "settings.job.types.$.milestones": currentMilestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Job milestone removed successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Job milestone not found."
            };
            //type name in use
          }
          return {
            exitCode: 2,
            exitStatus: "Type not found."
          };
          //type name in use
        }
        return {
          exitCode: 3,
          exitStatus: "No job settings found in tenant object."
        };
        //no job object
      }
      return {
        exitCode: 4,
        exitStatus: "User tenant not found."
      };
      //no tenant
    }
    return {
      exitCode: 5,
      exitStatus: "No user found."
    };
    //no user
  }

});
