Template.registerHelper('allJobs', function() {
  return Jobs.find({});
});

Template.registerHelper('streamsForJobId', function(id) {
  return Streams.find({job_id: id});
});
