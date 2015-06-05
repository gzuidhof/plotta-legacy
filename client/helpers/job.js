Template.registerHelper('allJobs', function() {
  return Jobs.find({},{sort:{startTime:-1}});
});

Template.registerHelper('streamsForJobId', function(id) {
  return Streams.find({job_id: id});
});
