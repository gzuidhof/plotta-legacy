Template.graph.helpers({
  updateGraph: function() {

    if (Template.instance().updateGraph) {
      Template.instance().updateGraph(this.values);
    }

  }
});




Template.graph.onRendered (function() {

  var stream = this.data;

  if (!stream) {
    return;
  }

  var values = stream ? stream.values: [];

  if (!stream.graphElement) {
    stream.graphElement = this.find('.graph');
  };
  var graphElement = stream.graphElement;



  var title = stream.title || '';
  var xAxisName = stream.xAxis || '';
  var yAxisName = stream.yAxis || '';

  var chart = echarts.init(graphElement, 'macarons')

  chart.showLoading({
    text: 'Loading... please wait! ', //loading text
  });


  var ySeries = _.map(values, function(value) {
    return value.y;
  });
  var xSeries = _.map(values, function(value) {
    return value.x;
  })

  var opts = {
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
        show : true,
        feature : {
            dataZoom : {
              show: true,
              title: {
                dataZoom: "zoom selection",
                dataZoomReset: "zoom out"
              }
            },
            magicType : {
              show: true,
              type: ['line', 'bar'],
              title: {
                line: 'line plot',
                bar: 'bar plot'
              }
            },
            restore : {show: true, title: 'reset'},
            saveAsImage : {show: true, title: 'save as image'}
        }
    },
    dataZoom : {
        show : true,
        realtime: true,
        //start : 50,
        //end : 100
    },
    legend: {
      data: [title]
    },
    xAxis: [
      {
        name: xAxisName,
        type: 'category',
        data: xSeries,
        boundaryGap : false,
      }
    ],
    yAxis: [
      {
        name: yAxisName,
        type: 'value',
      }
    ],

  }


  var update = function(values) {

    var ySeries = _.map(values, function(value) {
      return value.y;
    });
    var xSeries = _.map(values, function(value) {
      return value.x;
    })

    var series = [{
      name: title,
      type: 'line',
      data: ySeries
    }];

    opts.series = series;
    opts.xAxis[0].data = xSeries;

    chart.setOption(opts);
    chart.hideLoading();
  }

  this.updateGraph = update;
  update(values);
});
