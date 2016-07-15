import './insert-global-custom-field.html';

Template.insertGlobalCustomField.onRendered(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');

  // this.typeText = new ReactiveVar(true);
  // this.typeMultiText = new ReactiveVar(false);
  // this.typeCheckbox = new ReactiveVar(false);
  // this.typeDateTime = new ReactiveVar(false);
  // this.typeLabel = new ReactiveVar(false);
  // this.typePicklist = new ReactiveVar(false);


});

Template.onCreated(function() {
  this.typeText = new ReactiveVar(true);
  this.typeMultiText = new ReactiveVar(false);
  this.typeCheckbox = new ReactiveVar(false);
  this.typeDateTime = new ReactiveVar(false);
  this.typeLabel = new ReactiveVar(false);
  this.typePicklist = new ReactiveVar(false);

});

Template.insertGlobalCustomField.helpers({
  typeText: function() {
    return Template.instance().typeText.get();
  },
  typeMultiText: function() {
    return Template.instance().typeMultiText.get();
  },
  typeCheckbox: function() {
    return Template.instance().typeCheckbox.get();
  },
  typeDateTime: function() {
    return Template.instance().typeDateTime.get();
  },
  typeLabel: function() {
    return Template.instance().typeLabel.get();
  },
  typePicklist: function() {
    return Template.instance().typePicklist.get();
  }
});
