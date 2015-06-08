Template.nav.events = {
  "click .nav-menu-button": function (event) {
    Session.set("menuActive", !Session.get("menuActive"));
  },

  "click .filter-running": function (event, template) {
    var currentFilter = Session.get('jobFilter') || [];
    if (currentFilter.indexOf(0) == -1) {
      Session.set('jobFilter', _.union(currentFilter,0));
    }
    else {
      Session.set('jobFilter', _.without(currentFilter,0));
    }
  },

  "click .filter-finished": function (event, template) {
    var currentFilter = Session.get('jobFilter') || [];
    if (currentFilter.indexOf(1) == -1) {
      Session.set('jobFilter', _.union(currentFilter,1));
    }
    else {
      Session.set('jobFilter', _.without(currentFilter,1));
    }
  },

};

Template.nav.helpers({
  isActive: function () {
    return Session.get("menuActive");
  }

});
