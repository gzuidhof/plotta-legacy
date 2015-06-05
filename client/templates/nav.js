Template.nav.events = {
  "click .nav-menu-button": function (event) {
    Session.set("menuActive", !Session.get("menuActive"));
  }
};

Template.nav.helpers({
  isActive: function () {
    return Session.get("menuActive");
  }

});
