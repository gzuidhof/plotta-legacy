Meteor.methods({
  //Used for fixing string values in plots
  'fixOldData': function() {
    var streams = Streams.find({}).fetch();
    _.each(streams, function(stream) {
      var id = stream._id;

      newValues = _.map(stream.values, function(val) {
        val.x = parseFloat(val.x);
        val.y = parseFloat(val.y);
        return val;
      });

      Streams.update({_id:id}, {$set: {values: newValues}});
      console.log("Updated stream " + stream.title + " of job " +stream.job_id);
    });

    console.log("Updating stream values done!");
  },
  
  //Used for migrating to new api (with more explicit id names)
  'fixOldIds': function() {
    var jobs = Jobs.find({}).fetch();
    _.each(jobs, function(job) {
      var id = job._id;

      Jobs.update({_id:id}, {$set: {job_id: id}});
      console.log("Updated job " + job.name);
    });

    console.log("Updating job ids done!");
  }



});
