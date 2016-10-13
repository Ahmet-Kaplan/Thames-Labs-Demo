import _ from 'lodash';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Tenants } from '/imports/api/collections.js';

//This function takes an job JSON object, and returns another JSON object with required headings for export
const formatJobForExport = (record) => {
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

  if ( _.has(record, 'jobTypeId') ) {
    const tenant = Tenants.findOne({
      _id: Partitioner.group()
    });
    const jobs = tenant.settings.job.types,
          job = _.find(jobs, { 'id': record.jobTypeId });
    record.job = job ? job.name : "";

    if ( _.has(record, 'jobMilestoneId') && job && job.milestones ) {
      const milestone = _.find(job.milestones, { 'id': record.jobMilestoneId });
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
    jobType: record.job || "",
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

export { formatJobForExport };