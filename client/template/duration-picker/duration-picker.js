AutoForm.addInputType('duration-picker', {
  template: 'DurationPicker',
  valueOut: function() {
    var val = this.val();
    return val;
  }
});

Template.DurationPicker.events({
  'change .duration-picker input:not([type=hidden])': function(event, template) {
    var target = $(event.target).closest(".duration-picker");
    var hours = target.find('input[name=hours]');
    var minutes = target.find('input[name=minutes]');

    while (minutes[0].valueAsNumber >= 60) {
      hours.val(hours[0].valueAsNumber + 1);
      minutes.val(minutes[0].valueAsNumber - 60);
    }

    while (minutes[0].valueAsNumber < 0 && hours[0].valueAsNumber > 0) {
      hours.val(hours[0].valueAsNumber - 1);
      minutes.val(minutes[0].valueAsNumber + 60);
    }

    if (minutes[0].valueAsNumber < 0) minutes.val(0);
    if (hours[0].valueAsNumber < 0) hours.val(0);

    var input = target.find("input[type=hidden]");
    var value = moment.duration({
      hours: hours[0].valueAsNumber,
      minutes: minutes[0].valueAsNumber,
      second: 0
    });
    input.val(value);
    input.trigger('change');
  }
});

Template.DurationPicker.onRendered(function() {
  if (!this.data.value) {
    $("input[name=hours]").val(0);
    $("input[name=minutes]").val(0);
  } else {
    var val = moment.duration(this.data.value);
    //Display hours over 23
    var mins = moment.duration({
      minutes: val.minutes()
    });
    var hours = val.subtract(mins);
    $("input[name=hours]").val(hours.asHours());
    $("input[name=minutes]").val(mins.get('minutes'));
  }
});
