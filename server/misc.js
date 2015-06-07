Meteor.methods({
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
  }



});
