var jumplistIndex = -1;

Template.jumplist.onRendered(function() {
  this.$('.jumplist-elt a').on('click', function(event) {
    event.preventDefault();
    var target = $(this).attr('href');

    if(target.length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top - $('.navbar-header').height() - 40
      }, {
        duration: 300,
        easing: 'easeInOutCubic'
      });
    }
  });
  jumplist = -1;
});

Template.jumplist.helpers({
  hasPermission: function() {
    return Roles.userIsInRole(Meteor.userId(), [this.permission]);
  },
  index: function() {
    jumplistIndex++;
    return jumplistIndex;
  }
});
