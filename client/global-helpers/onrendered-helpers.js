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
  $('#draggableModal').draggable({
    grid: [50, 50],
    handle: '.modal-header',
    opacity: 0.35,
  });

  //Triggers collapsing and expanding accordions
  $('.accordion-toggle').on('click', function() {
    $('#collapse' + this.id).collapse('toggle');
  });

  //IE fix: prevent all default actions and handle the hashlinks correctly
  $(".sidebar .nav li a").on('click', function(event) {
    event.preventDefault();
    window.location.hash = $(this).attr('href');
  });

  var sidebar = $('.sidebar');
  //sidebar.length is the number of elements matching '.sidebar'
  if (sidebar.length > 0 && !bowser.mobile && !bowser.tablet) {
    sidebar.css('position', 'fixed');
    sidebar.css('width', '18.315972%');
  }

  //IE fix: prevent all default actions and handle the hashlinks correctly
  $(".stick-bar .nav li a").on('click', function(event) {
    event.preventDefault();
    window.location.hash = $(this).attr('href');
  });

  var stickBar = this.$('.stick-bar');
  if (stickBar.length > 0 && !bowser.mobile && !bowser.tablet) {
    var percentWidth = stickBar.width() / window.screen.width;
    stickBar.affix({
      offset: {
        top: stickBar.offset().top
      }
    });
    stickBar.on('affixed.bs.affix', function() {
      stickBar.css('width', percentWidth * 100 + '%');
      stickBar.css('top', $('.navbar-header').height());
    });
    stickBar.on('affixed-top.bs.affix', function() {
      stickBar.css('width', '');
    })
  }
});
