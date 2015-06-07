Template.plot.helpers({
  updatePlot: function() {

    if (Template.instance().updatePlot) {
      Template.instance().updatePlot(this.values);
    }

    return 'Last update '+new Date();

  }
});


Template.plot.onRendered (function() {

  var stream = this.data;

  if (!stream) {
    return;
  }

  var values = stream ? stream.values: [];

  if (!stream.plotElement) {
    stream.plotElement = this.find('.plot');
  };
  var plotElement = stream.plotElement;

  //console.log('awrooo');
  var title = stream.title;

/*
  //Mock data
  values = _.map(_.range(150), function(i) {
    return {x:i,y:+Math.sin(0.2*i)};
  });
*/
  var plotData = {key: title, values: values};
  var xAxisName = stream.xAxis;
  var yAxisName = stream.yAxis;

  var createGraph = function(plotData) {
    var chart = nv.models.lineWithFocusChart();
    chart.xAxis
        .tickFormat(d3.format(',f'))
        .axisLabel(xAxisName);

    chart.yAxis
        .tickFormat(d3.format(',.2f'))
        .axisLabel(yAxisName);

    chart.y2Axis
        .tickFormat(d3.format(',.2f'));

    d3.select(plotElement)
        .datum([plotData])
        .transition().duration(100)
        .call(chart);

    nv.utils.windowResize(chart.update);
    chart.update();
    return chart;
  }

  nv.addGraph(function(){createGraph(plotData)});

  var update = function(values) {
  //  console.log("updated!" + values.length);

    var plotData = {key: title, values: values};
    nv.addGraph(function(){createGraph(plotData)});
    return title;
  }

  this.updatePlot = update;


});
