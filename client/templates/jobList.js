Template.jobList.helpers({
  isSelected: function(id) {
    return Session.get('jobSelected') == id;
  }
});

Template.jobList.events = {
  "click .job-item": function(event, template) {
    var job_id = this._id;
    Router.go('/job/'+job_id);
  }

};
