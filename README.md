# plotta
Webserver for live plots of distributed tasks, originally created for viewing progress multiple concurrent runs of deep learning algorithms.

### Screenshot
![Plotta screenshot](https://raw.githubusercontent.com/gzuidhof/plotta/master/screenshot.png)

###Preliminary REST API
All requests below are POST requests.

####Create new job
```
path:
/api/job/new

params:
  job_id: string //identifier for job
  name: string //Name of job
  node: string //Node name

example:
/api/job/new?job_id=myJobId&name=AwrooModel&node=zeta

```
####Mark job as done
```
path:
/api/job/stop

Params:
  job_id: string //identifier for job
```


####Create new data stream
```
path:
/api/stream/new

Params:
  stream_id: string //identifier of stream
  job_id: string //job the stream belongs to
  title: string //Title of plot
  xName: string
  yName: string
```

####Append data point
```
path:
/api/stream/append

Params:
  stream_id: string //identifier of stream
  job_id: string //identifier of job
  x: number
  y: number
```
