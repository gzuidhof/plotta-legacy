# plotta
Webserver for live plots of distributed tasks


###Preliminary REST API
All requests below are POST requests.

####Create new job
```
path:
/api/job/new

params:
  id: string|int //unique identifier of job
  name: string //Name of job
  node: string //Node name

example:
/api/job/new?id=myJobId&name=AwrooModel&node=zeta

```
####Mark job as done
```
path:
/api/job/stop

Params:
  id: string|int //unique identifier of job
```


####Create new data stream
```
path:
/api/stream/new

Params:
  id: string|int //unique identifier of stream
  job_id: string|int //job the stream belongs to
  title: string //Title of plot
  xName: string
  yName: string
```

####Append data point
```
path:
/api/stream/append

Params:
  id: string|int //unique identifier of stream
  job_id: string|int //unique identifier of job
  x: number
  y: number
```
