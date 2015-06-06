
Template.plot.onRendered (function(a) {

  var values = (this.data ? this.data.values: []) ? this.data.values: [];

  if (!this.plotElement) {
         this.plotElement = this.find('.plot');
  };
  var plotElement = this.plotElement;

  var title = this.data.title;

/*
  //Mock data
  values = _.map(_.range(150), function(i) {
    return {x:i,y:+Math.sin(0.2*i)};
  });
*/
  console.log(values)
  var plotData = {key: title, values: values};
  var xAxisName = this.data.xAxis;
  var yAxisName = this.data.yAxis;

  nv.addGraph(function() {
    var chart = nv.models.lineChart();

    chart.xAxis
        .tickFormat(d3.format(',f'))
        .axisLabel(xAxisName);

    chart.yAxis
        .tickFormat(d3.format(',.2f'))
        .axisLabel(yAxisName);


    d3.select(plotElement)
        .datum([plotData])
        .transition().duration(100)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
});
