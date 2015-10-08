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
  $(".nav li a").on('click', function(event) {
    event.preventDefault();
    console.log('clicked ' + $(this).attr('href'));
    window.location.hash = $(this).attr('href');
  });

  var sidebar = $('.sidebar');
  //sidebar.length is the number of elements matching '.sidebar'
  if (sidebar.length > 0 && !bowser.mobile && !bowser.tablet) {
    sidebar.affix({
      offset: {
        top: sidebar.offset().top
      }
    });
  }
});
