Template.jumplist.onRendered(function() {
  this.$('.quick-menu').on('click', function(event) {
    event.preventDefault();
    var target = $(this).attr('href');

    if(target.length) {
      $('body').animate({
        scrollTop: $(target).offset().top - $('.navbar-header').height() - 10
      }, {
        duration: 300,
        easing: 'easeInOutCubic'
      });
    }
  });
})