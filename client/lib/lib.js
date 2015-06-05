Util = {}

Util.zeroPad = function(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

Constants = {};

Constants.COMA_LINKS =
  _.object(
    _.map(_.range(46),
        function(n){return 'coma'+Util.zeroPad(n,2)+'.science.ru.nl'}),
    _.map((_.union([685,1012],
            _.range(1032,1044),
            _.range(1045,1052),
            _.range(1103,1125),
            _.range(1136,1139))),
        function(id){return 'http://graphs.science.ru.nl/graph_view.php?action=tree&tree_id=15&leaf_id='+id})
);
