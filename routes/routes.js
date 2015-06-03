Router.route('/', function () {
  this.render('home');
});


/* REST API */

Router.route('/api/job/new', {where: 'server'})
  .post(function () {
    var query = this.params.query;
    var name = query.name;
    var id = query.id;
    var node = query.node;

    if(!id || !name) {
      console.error("No id or name specified!");
      return;
    }

    Jobs.insert({_id: id, name:name,node:node,status:0, startTime: Date.now()});
    console.log("Job " + id + " started.");
  });

Router.route('/api/job/stop', { where: 'server' })
  .post(function () {
    var query = this.params.query;
    var id = query.id;


    if(!id) {
      console.error("No id specified!");
      return;
    }

    Jobs.update({_id: id}, {$set: {status: 1, endTime: Date.now()}});
    console.log("Job " + id + " marked as stopped.");
  });


Router.route('/api/stream/new', { where: 'server' })
  .post(function () {
    var query = this.params.query;
    var id = query.id;
    var job_id = query.job_id;
    var title = query.title;
    var xName = query.xName;
    var yName = query.yName;

    if(!id || !job_id) {
      console.error("No id or job_id specified!");
      return;
    }

    Streams.insert({
        _id: id,
        job_id: job_id,
        title:title,
        xName:xName,
        yName:yName,
        values: []
      });

  });

Router.route('/api/stream/append', { where: 'server' })
  .post(function () {
    var query = this.params.query;
    var id = query.id;
    var job_id = query.job_id;
    var x = query.x;
    var y = query.y;

    var writeResult = Streams.update({_id: id,job_id:job_id},
      {$push:{values: {x:x,y:y,ts:Date.now()}}});

    if (writeResult.nMatched === 0) {
      console.error("Data append attempt, " +
        "but no plot found for id " + id);
    }
  });
