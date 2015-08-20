Template.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index + 1;
      return item;
    });
  }
});

Template.registerHelper('decimal', function(number) {
  if (!number) number = 0;
  return parseFloat(number).toFixed(2);
});

Template.registerHelper("setPageTitle", function() {
  var title = "";
  for (var i = 0; i<arguments.length - 1; i++) {
    title += arguments[i];
  }
  document.title = title;
  SetRouteDetails(title);
});

Template.registerHelper("getDomainFromUrl", function(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
});
