

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
    var job_id = query.job_id;
    var node = query.node;

    if(!job_id || !name) {
      Router.err(this.response,"No id or name specified!");
      return;
    }

    if(Jobs.findOne({job_id:job_id})) {
      Router.err(this.response,'Job with this ID already exists!');
      return;
    }


    Jobs.insert({job_id: job_id, name:name,node:node,status:0, startTime: Date.now()});
    console.log("Job " + job_id + " started.");
    this.response.end('');
  });

Router.route('/api/job/stop', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var job_id = query.job_id;


    if(!job_id) {
      Router.err(this.response,"No job_id specified!");
      return;
    }

    Jobs.update({job_id: job_id}, {$set: {status: 1, endTime: Date.now()}});
    console.log("Job " + job_id + " marked as stopped.");
    this.response.end('');
  });


Router.route('/api/stream/new', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var stream_id = query.stream_id;
    var job_id = query.job_id;
    var title = query.title;
    var xName = query.xName;
    var yName = query.yName;

    if(!stream_id || !job_id) {
      Router.err(this.response,"No stream_id or job_id specified!");
      return
    }

    else if(Streams.findOne({stream_id:stream_id, job_id: job_id})) {
      Router.err(this.response,'Stream with this stream_id and job_id already exists!');
      return;
    }

    Streams.insert({
        stream_id: stream_id,
        job_id: job_id,
        title:title,
        xName:xName,
        yName:yName,
        values: []
      });

      console.log("Stream " + stream_id + " for job " + job_id + " created.");
      this.response.end('');
  });

Router.route('/api/stream/append', { where: 'server' })
  .post(function () {
    var query = this.request.body
    var stream_id = query.stream_id;
    var job_id = query.job_id;
    var x = parseFloat(query.x);
    var y = parseFloat(query.y);

    var streamSelector = {stream_id: stream_id, job_id:job_id};

    //var lastX = Streams.findOne(streamSelector, )

    var writeResult = Streams.update(streamSelector,
      {$push:{values: {x:x,y:y,ts:Date.now()}}});

    if (writeResult.nMatched === 0) {
        Router.err(this.response,"Data append attempt, " +
          "but no stream found for id " + stream_id);
        return;
    }
    this.response.end('');
  });
