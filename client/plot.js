
Template.plot.onRendered (function(a) {

  var values = (this.data ? this.data.values: []) ? this.data.values: [];
  var plotElement = this.find('.plot');

  var title = this.data.title + '(' + this.data._id + ')';

  var plotData = {key: title, values: values};
  var xAxisName = this.data.xAxis;
  var yAxisName = this.data.yAxis;

  nv.addGraph(function() {
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
        .transition().duration(500)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
});
