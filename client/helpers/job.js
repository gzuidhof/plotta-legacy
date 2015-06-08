Template.registerHelper('allJobs', function() {
  return Jobs.find({},{sort:{startTime:-1}});
});

Template.registerHelper('streamsForJobId', function(id) {
  return Streams.find({job_id: id}, {sort:{title:1}});
});

Template.registerHelper('isFiltered', function(status) {
  var filter = Session.get('jobFilter');
  if (filter) {
    return Session.get('jobFilter').indexOf(status) != -1;
  }
  else return false;
})
