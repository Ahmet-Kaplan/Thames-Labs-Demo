import _ from 'lodash';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';

//This function takes an project JSON object, and returns another JSON object with required headings for export
const formatProjectForExport = (record) => {
  if (record.staff) {
    const staffList = [];
    _.each(record.staff, function(staffId) {
      const staff = Meteor.users.findOne({
        _id: staffId,
        "profile.name": {
          $exists: true
        }
      });
      staffList.push(staff.profile.name);
    });
    record.staff = staffList.length > 0 ? staffList.join(',') : 'Not assigned';
  }

  if ( _.has(record, 'projectTypeId') ) {
    const tenant = Tenants.findOne({
      _id: Partitioner.group()
    });
    const projects = tenant.settings.project.types,
          project = _.find(projects, { 'id': record.projectTypeId });
    record.project = project ? project.name : "";

    if ( _.has(record, 'projectMilestoneId') && project && project.milestones ) {
      const milestone = _.find(project.milestones, { 'id': record.projectMilestoneId });
      record.milestone = milestone ? milestone.name : "";
    }
  }

  if (record.dueDate) {
    record.dueDate = moment(record.dueDate).format('DD/MM/YY');
  }

  if ( _.has(record, 'active') ) {
    record.active = record.active ? 'Yes' : 'No';
  }

  return {
    name: record.name || "",
    description: record.description || "",
    projectType: record.project || "",
    milestone: record.milestone || "",
    value: record.value,
    dueDate: record.dueDate || "",
    staff: record.staff || "",
    active: record.active,
    tags: record.tags || "",
    companyName: record.companyName || "",
    contactName: record.contactName || "",
  };
};

export { formatProjectForExport };