Template.mergeModal.onCreated(function() {
  var currentCompany = this.data;

  this.autorun(() => {
    var companies = ReactiveMethod.call('company.getMergeTargets', currentCompany._id, function(err, res) {
      if (err) throw new Meteor.Error(err);
      return res;
    });
    if (companies) {
      var options = _.map(companies, function(cmp) {
        return {
          value: cmp._id,
          text: cmp.name
        }
      });

      $('#select-entity').selectize({
        create: false,
        allowEmptyOption: false,
        options: options,
        maxItems: 1,
        closeAfterSelect: true,
        hideSelected: true,
        maxOptions: 10
      });
    }
  });
});

Template.mergeModal.events({
  'click #initiateMerge': function(event, template) {
    if (!Roles.userIsInRole(Meteor.userId(), 'Administrator')) {
      toastr.error('Only administrators can merge records.');
      return;
    }

    var deleteRecord = $('#cbDelete').prop('checked');
    var companyId = this._id;
    var targetCompanyId = $('#select-entity').val();
    Meteor.call('company.findById', targetCompanyId, function(err, res) {
      if (res) targetName = res;
    });

    if (targetCompanyId === "") {
      toastr.warning('Please select a target company');
      return;
    }

    bootbox.confirm({
      message: "Are you sure you wish to merge these companies? This action cannot be undone.",
      backdrop: false,
      callback: function(result) {
        if (result === true) {

          toastr.info("Merge in progress...", "RealTimeCRM", {
            timeOut: 3000,
            closeButton: false,
            "debug": false,
            "newestOnTop": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": true,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          });

          Meteor.call('company.merge', companyId, targetCompanyId, deleteRecord, function(err, res) {
            if (err) {
              toastr.clear();
              throw new Meteor.Error(err);
            }

            if (res) {
              toastr.clear();

              if (res === 0) {
                Modal.hide();
                toastr.success('Merge successful.')
              } else {
                toastr.error(res.source + ": " + res.error)
              }
            }

          });
        }
      }
    });
  }
});