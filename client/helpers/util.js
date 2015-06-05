Template.registerHelper("localizedDateAndTime", function(date) {
    if(date)
        return moment(date).format('l LT');
});

Template.registerHelper("equals", function(a, b) {
    return a == b;
});
