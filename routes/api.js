

/* REST API */

Router.err = function(response, reason) {
  if (!reason) {

    reason = "No reason specified";
  }
  console.error(reason);
  response.writeHead('400','');
  response.end(reason);
}

Router.route('/api/job/new', {where: 'server'})
  .post(function () {
    var query = this.request.body
    var name = query.name;
    var id = query.id;
    var node = query.node;

    if(!id || !name) {
      Router.err(this.response,"No id or name specified!");
      return;
    }

    if(Jobs.findOne({_id:id})) {
      Router.err(this.response,'Job with this ID already exists!');
      return;
    }


    Jobs.insert({_id: id, name:name,node:node,status:0, startTime: Date.now()});
    console.log("Job " + id + " started.");
    this.response.end('');
  });

Router.route('/api/job/stop', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var id = query.id;


    if(!id) {
      Router.err(this.response,"No id specified!");
      return;
    }

    Jobs.update({_id: id}, {$set: {status: 1, endTime: Date.now()}});
    console.log("Job " + id + " marked as stopped.");
    this.response.end('');
  });


Router.route('/api/stream/new', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var id = query.id;
    var job_id = query.job_id;
    var title = query.title;
    var xName = query.xName;
    var yName = query.yName;

    if(!id || !job_id) {
      Router.err(this.response,"No id or job_id specified!");
      return
    }

    else if(Streams.findOne({stream_id:id, job_id: job_id})) {
      Router.err(this.response,'Job with this id and job_id already exists!');
      return;
    }

    Streams.insert({
        stream_id: id,
        job_id: job_id,
        title:title,
        xName:xName,
        yName:yName,
        values: []
      });

      console.log("Stream " + id + " for job " + job_id + " created.");
      this.response.end('');
  });

Router.route('/api/stream/append', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var id = query.id;
    var job_id = query.job_id;
    var x = query.x;
    var y = query.y;

    var writeResult = Streams.update({stream_id: id,job_id:job_id},
      {$push:{values: {x:x,y:y,ts:Date.now()}}});

    if (writeResult.nMatched === 0) {
        Router.err(this.response,"Data append attempt, " +
          "but no plot found for id " + id);
        return;
    }
    this.response.end('');
  });
