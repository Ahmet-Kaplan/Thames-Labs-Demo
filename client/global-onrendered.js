// Template.onRendered provided by aldeed:template-extension
// https://github.com/aldeed/meteor-template-extension

Template.onRendered(function() {
  // Initialise all tooltips whenever a template is rendered
  this.$('[data-toggle="tooltip"]').tooltip({
    delay: {"show": 500, "hide": 100}
  });
});
