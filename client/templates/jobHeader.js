Template.jobHeader.helpers({
  'linkForNode': function() {
      if (this.node) {
        return Constants.COMA_LINKS[this.node];
      }
      return '';
  },

});

Template.jobHeader.helpers({
  'linkForNode': function() {
      if (this.node) {
        return Constants.COMA_LINKS[this.node];
      }
      return '';
  }
});

Template.jobHeader.events({
  'click .toggle-job': function(event, template) {
      var newStatus = Math.abs(template.data.status - 1);
      var job_id = template.data.job_id;
      Jobs.update({job_id:job_id}, {$set:{status:newStatus}});
  }
});
