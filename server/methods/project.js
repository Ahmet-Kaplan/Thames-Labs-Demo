import { check, Match } from 'meteor/check';
import { Projects } from '/imports/api/collections.js';

Meteor.methods({
  'project.invertState': function(projectId) {
    var user = Meteor.users.findOne({_id: this.userId});
    var project = Projects.findOne({
      _id: projectId
    });
    var newState = (project.active ? "inactive" : "active");
    if (project) {
      Projects.update({
        _id: projectId
      }, {
        $set: {
          active: !project.active
        }
      }, function(err) {
        if(!err) {

          Activities.insert({
            type: 'Note',
            notes: user.profile.name + ' marked this project as ' + newState,
            createdAt: new Date(),
            activityTimestamp: new Date(),
            projectId: projectId,
            primaryEntityId: projectId,
            primaryEntityType: 'projects',
            primaryEntityDisplayData: project.name,
            createdBy: user._id
          });
        }
      });
    }
  },
  typeIsInUse: function(typeId) {
    var project = Projects.findOne({
      projectTypeId: typeId
    });
    return {
      exitCode: 0,
      exitStatus: !!project
    };
  },
  milestoneIsInUse: function(typeId, milestoneId) {
    var project = Projects.findOne({
      projectTypeId: typeId,
      projectMilestoneId: milestoneId
    });
    return {
      exitCode: 0,
      exitStatus: !!project
    };
  },

  'setMilestone': function(id, milestoneId) {
    check(id, String);
    check(milestoneId, Match.Integer);

    if(!this.userId) throw new Meteor.Error('Only logged in users may update project milestones');
    if(!Roles.userIsInRole(this.userId, ['CanEditProjects'])) throw new Meteor.Error('Only users with permission to edit projects can move project milestones');

    Projects.update(id, { $set: { projectMilestoneId: milestoneId }});

    return;
  },

  addProjectType: function(name) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
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
                "settings.project.types": currentTypes
              }
            });

            return {
              exitCode: 0,
              exitStatus: "Project type added successfully."
            };
          }
          return {
            exitCode: 1,
            exitStatus: "Project type already exists."
          };
          //type name in use
        }
        return {
          exitCode: 2,
          exitStatus: "No project settings found in tenant object."
        };
        //no project settings
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
  updateProjectType: function(id, name) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
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
                "settings.project.types": currentTypes
              }
            });
            return {
              exitCode: 0,
              exitStatus: "Project type updated successfully."
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
          exitStatus: "No project settings found in tenant object."
        };
        //no project settings
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
  removeProjectType: function(id) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
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
                "settings.project.types": currentTypes
              }
            });
            return {
              exitCode: 0,
              exitStatus: "Project type removed successfully."
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
          exitStatus: "No project settings found in tenant object."
        };
        //no project settings
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

  addProjectMilestone: function(typeId, name, description) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
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
                "settings.project.types.id": typeId
              }, {
                $set: {
                  "settings.project.types.$.milestones": milestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Project milestone added successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Project milestone already exists."
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
          exitStatus: "No project settings found in tenant object."
        };
        //no project object
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

  updateProjectMilestone: function(typeId, milestoneId, name, description) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var currentMilestones = projectSettings.types[typeIndex].milestones;
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
                "settings.project.types.id": typeId
              }, {
                $set: {
                  "settings.project.types.$.milestones": currentMilestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Project milestone updated successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Project milestone not found."
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
          exitStatus: "No project settings found in tenant object."
        };
        //no project object
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

  removeProjectMilestone: function(typeId, milestoneId) {

    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      var userTenant = Tenants.findOne({
        _id: user.group
      });
      if (userTenant) {
        var projectSettings = userTenant.settings.project;
        if (projectSettings) {
          var currentTypes = projectSettings.types;
          var typeIndex = -1;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var currentMilestones = projectSettings.types[typeIndex].milestones;

            if (currentMilestones.length === 2) {
              return {
                exitCode: 6,
                exitStatus: "A project type must have at least two milestones."
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
                "settings.project.types.id": typeId
              }, {
                $set: {
                  "settings.project.types.$.milestones": currentMilestones
                }
              });

              return {
                exitCode: 0,
                exitStatus: "Project milestone removed successfully."
              };
            }
            return {
              exitCode: 1,
              exitStatus: "Project milestone not found."
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
          exitStatus: "No project settings found in tenant object."
        };
        //no project object
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
