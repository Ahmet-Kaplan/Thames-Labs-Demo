UI.registerHelper("setPageTitle", function(title) {
    if(title) {
        document.title = title;
    } else {
        document.title = "RealtimeCRM";
    }
});
