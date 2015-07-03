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
      var _id = template.data._id;
      Jobs.update({_id:_id}, {$set:{status:newStatus}});
  }
});
