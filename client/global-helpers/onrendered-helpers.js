// Template.onRendered provided by aldeed:template-extension
// https://github.com/aldeed/meteor-template-extension

Template.onRendered(function() {

  // Initialise all tooltips whenever a template is rendered
  this.$('[data-toggle="tooltip"]').tooltip({
    delay: {
      "show": 500,
      "hide": 100
    }
  });

  // Initialise all draggable modals
  this.$('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  //Triggers collapsing and expanding accordions
  this.$('.accordion-toggle').on('click', function() {
    $('#collapse' + this.id).collapse('toggle');
  });

  //IE fix: prevent all default actions and handle the hashlinks correctly
  this.$(".sidebar .nav li a").on('click', function(event) {
    event.preventDefault();
    window.location.hash = $(this).attr('href');
  });

  var sidebar = this.$('.sidebar');
  //sidebar.length is the number of elements matching '.sidebar'
  if (sidebar.length > 0 && !bowser.mobile && !bowser.tablet) {
    sidebar.css('position', 'fixed');
    sidebar.css('width', '18.315972%');
  }

  //IE fix: prevent all default actions and handle the hashlinks correctly
  this.$(".stick-bar .nav li a").on('click', function(event) {
    event.preventDefault();
    window.location.hash = $(this).attr('href');
  });

  var stickBar = this.$('.stick-bar');
  if (stickBar.length > 0 && !bowser.mobile && !bowser.tablet) {
    stickBar.affix({
      offset: {
        top: (stickBar.offset().top - $('.navbar-header').height())
      }
    });
    stickBar.on('affix.bs.affix', function() {
      $('.stick-bar-placeholder').height(0);
    });
    stickBar.on('affixed.bs.affix', function() {
      stickBar.css('width', stickBar.parent().width());
      stickBar.css('top', $('.navbar-header').height());
      //+25 to account for padding
      $('.stick-bar-placeholder').height(stickBar.height() + 25);
    });

    stickBar.on('affixed-top.bs.affix', function() {
      $('.stick-bar-placeholder').height(0);
      stickBar.css('width', '');
    });
  }
});
