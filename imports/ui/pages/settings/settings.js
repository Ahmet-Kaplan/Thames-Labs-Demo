import '../../components/settings/plan-billing/plan-billing.js';
import '../../components/settings/general-settings/general-settings.js';
import '../../components/settings/users/users.js';

import './settings.css';
import './settings.html';

Template.settings.onRendered(function() {
  var buttonPressed = false;
  $('#settings-nav li').each(function() {
    const id = $(this).attr('id');
    $(this).click(function() {
      const heading = id.slice(0, -5);
      $('html, body').animate({
        scrollTop: $("#" + heading).offset().top - 80
      }, 0);
      $('#settings-nav li').removeClass('active');
      $(this).addClass('active');
      buttonPressed = true;
    });
  });

  $(window).scroll(function() {
    if (!buttonPressed) {
      var position = $(this).scrollTop();

      $('.heading').each(function() {
        var target = $(this).offset().top - 80;
        var id = '#' + $(this).attr('id') + '-link';

        if (position >= target) {
          $('#settings-nav li').removeClass('active');
          $(id).addClass('active');
        }
      });
    }
    buttonPressed = false;
  });
});