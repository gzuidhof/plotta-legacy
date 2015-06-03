/*
  _id
  name: string
  node: string
  status: in [0,1] (0 for not done, 1 for done)
  startTime: number
  endTime: number
*/

Jobs = new Mongo.Collection('jobs')
