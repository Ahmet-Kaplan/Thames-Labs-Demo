Template.loading.rendered = function() {
    $('#loading-page').fadeIn(200);
};

Template.loading.destroyed = function() {
    $('#loading-page').fadeOut(200);
};
