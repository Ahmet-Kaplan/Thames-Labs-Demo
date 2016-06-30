import './settings.css';
import './settings.html';

Template.settings.onRendered(function() {
  var buttonPressed = false;
  $('#settings-nav > ul > li').each(function() {
    const id = $(this).attr('id');
    $(this).click(function() {
      const heading = id.slice(0, -5);
      $('html, body').animate({
        scrollTop: $("#" + heading).offset().top - 60
      }, 0);
      $('#settings-nav > ul > li').removeClass('active');
      $(this).addClass('active');
      buttonPressed = true;
    });
  });

  $(window).scroll(function() {
    if (!buttonPressed) {
      var position = $(this).scrollTop();

      $('.heading').each(function() {
        var target = $(this).offset().top - 60;
        var id = '#' + $(this).attr('id') + '-link';
        console.log(id);

        if (position >= target) {
          $('#settings-nav > ul > li').removeClass('active');
          $(id).addClass('active');
        }
      });
    }
    buttonPressed = false;
  });
});