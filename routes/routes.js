Router.route('/', function () {
  this.layout('base');
  this.render('home');
});

Router.route('/job/:job_id', function() {
  var job = Jobs.findOne({_id:this.params.job_id});
  Session.set('jobSelected', this.params.job_id);
  this.layout('base');
  this.render('job', {data:job});

});
