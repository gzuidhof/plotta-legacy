Router.route('/', function () {
  this.layout('base');
  this.render('home');
});

Router.route('/job/:job_id', function() {
  var job = Jobs.findOne({job_id:this.params.job_id});
  Session.set('jobSelected', job._id);
  this.layout('base');
  this.render('job', {data:job});

});
