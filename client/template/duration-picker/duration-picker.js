AutoForm.addInputType('duration-picker', {
  template: 'DurationPicker',
  valueOut: function() {
    var val = this.val();
    if (val == "") return;
    return JSON.parse(val);
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
    var value = JSON.stringify({
      hours: hours[0].valueAsNumber,
      minutes: minutes[0].valueAsNumber
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
    $("input[name=hours]").val(this.data.value.hours);
    $("input[name=minutes]").val(this.data.value.minutes);
  }
})
