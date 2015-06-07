Meteor.methods({
  'fixOldData': function() {
    var jobs = Jobs.find({}).fetch();
    _.each(jobs, function(job) {
      var id = job._id;

      newValues = _.map(job.values, function(val) {
        val.x = parseFloat(val.x);
        val.y = parseFloat(val.y);
        return val;
      });

      Jobs.update({_id:id}, {$set: {values: newValues}});
    });


  }



});
