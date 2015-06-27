Template.plot.helpers({
  updatePlot: function() {

    if (Template.instance().updatePlot) {
      Template.instance().updatePlot(this.values);
    }

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

  var title = stream.title;
  var plotData = {key: title, values: values};
  var xAxisName = stream.xAxis;
  var yAxisName = stream.yAxis;

  var chart = nv.models.lineWithFocusChart();

  nv.addGraph(function() {
    chart.xAxis
        .tickFormat(d3.format(',f'))
        .axisLabel(xAxisName);

    chart.yAxis
        .tickFormat(d3.format(',.3f'))
        .axisLabel(yAxisName);

    chart.y2Axis
        .tickFormat(d3.format(',.3f'));

    d3.select(plotElement)
        .datum([plotData])
        .call(chart);

    nv.utils.windowResize(chart.update);
    return chart;
  });

  var update = function(values) {

    var plotData = {key: title, values: values};

    d3.select(plotElement)
        .datum([plotData])
        .call(chart);

    return title;
  }

  this.updatePlot = update;


});
