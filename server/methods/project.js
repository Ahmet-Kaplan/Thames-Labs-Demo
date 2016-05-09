Meteor.methods({
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

  moveMilestone: function(projectId, direction) {
    var value = (direction === "forward" ? 1 : -1);
    var project = Projects.findOne({
      _id: projectId
    });
    if (project) {
      var typeId = project.projectTypeId;
      var milestoneId = project.projectMilestoneId;

      var user = Meteor.users.findOne({
        _id: this.userId
      });
      if (user) {
        var userTenant = Tenants.findOne({
          _id: user.group
        });
        if (userTenant) {
          var typeIndex = -1;
          var currentTypes = userTenant.settings.project.types;
          for (var i = 0, len = currentTypes.length; i < len; i++) {
            if (currentTypes[i].id === typeId) {
              typeIndex = i;
              break;
            }
          }
          if (typeIndex !== -1) {
            var milestones = currentTypes[typeIndex].milestones;
            var milestoneIndex = -1;
            for (var j = 0, mlen = milestones.length; j < mlen; j++) {
              if (milestones[j].id === milestoneId) {
                milestoneIndex = j;
                break;
              }
            }
            var newId = milestoneId;
            if (milestoneIndex !== -1) {
              var newIndex = milestoneIndex + value;

              if (newIndex < 0 || newIndex > milestones.length) {
                return {
                  exitCode: 6,
                  exitStatus: 'Cannot move milestone beyond existing limits.'
                };
              } else {
                newId = milestones[newIndex].id;

                return {
                  exitCode: 0,
                  exitStatus: newId
                };
              }
            } else {
              return {
                exitCode: 1,
                exitStatus: 'Milestone not found.'
              };
            }
          } else {
            return {
              exitCode: 2,
              exitStatus: 'Type not found.'
            };
          }
        } else {
          return {
            exitCode: 3,
            exitStatus: 'User tenant not found.'
          };
        }
      } else {
        return {
          exitCode: 4,
          exitStatus: 'User not found.'
        };
      }
    } else {
      return {
        exitCode: 5,
        exitStatus: 'Project not found.'
      };
    }
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
          } else {
            return {
              exitCode: 1,
              exitStatus: "Project type already exists."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 2,
            exitStatus: "No project settings found in tenant object."
          };
          //no project settings
        }
      } else {
        return {
          exitCode: 3,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 4,
        exitStatus: "No user found."
      };
      //no user
    }
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
          } else {
            return {
              exitCode: 1,
              exitStatus: "Type not found."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 2,
            exitStatus: "No project settings found in tenant object."
          };
          //no project settings
        }
      } else {
        return {
          exitCode: 3,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 4,
        exitStatus: "No user found."
      };
      //no user
    }
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
          } else {
            return {
              exitCode: 1,
              exitStatus: "Type not found."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 2,
            exitStatus: "No project settings found in tenant object."
          };
          //no project settings
        }
      } else {
        return {
          exitCode: 3,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 4,
        exitStatus: "No user found."
      };
      //no user
    }
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
            } else {
              return {
                exitCode: 1,
                exitStatus: "Project milestone already exists."
              };
              //type name in use
            }
          } else {
            return {
              exitCode: 2,
              exitStatus: "Type not found."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 3,
            exitStatus: "No project settings found in tenant object."
          };
          //no project object
        }
      } else {
        return {
          exitCode: 4,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 5,
        exitStatus: "No user found."
      };
      //no user
    }
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
            } else {
              return {
                exitCode: 1,
                exitStatus: "Project milestone not found."
              };
              //type name in use
            }
          } else {
            return {
              exitCode: 2,
              exitStatus: "Type not found."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 3,
            exitStatus: "No project settings found in tenant object."
          };
          //no project object
        }
      } else {
        return {
          exitCode: 4,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 5,
        exitStatus: "No user found."
      };
      //no user
    }
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
            } else {
              return {
                exitCode: 1,
                exitStatus: "Project milestone not found."
              };
              //type name in use
            }
          } else {
            return {
              exitCode: 2,
              exitStatus: "Type not found."
            };
            //type name in use
          }
        } else {
          return {
            exitCode: 3,
            exitStatus: "No project settings found in tenant object."
          };
          //no project object
        }
      } else {
        return {
          exitCode: 4,
          exitStatus: "User tenant not found."
        };
        //no tenant
      }
    } else {
      return {
        exitCode: 5,
        exitStatus: "No user found."
      };
      //no user
    }
  }

});
