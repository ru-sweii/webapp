/*
  Highcharts JS v7.1.0 (2019-04-01)

 Indicator series type for Highstock

 (c) 2010-2019 Wojciech Chmiel

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/aroon",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,f,d,e){a.hasOwnProperty(f)||(a[f]=e.apply(null,d))}a=a?a._modules:{};d(a,"mixins/multipe-lines.js",[a["parts/Globals.js"]],function(a){var f=a.each,d=a.merge,e=a.error,c=a.defined,
r=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(k){var a=[];f(this.pointArrayMap,function(b){b!==k&&a.push("plot"+b.charAt(0).toUpperCase()+b.slice(1))});return a},toYData:function(k){var a=[];f(this.pointArrayMap,function(b){a.push(k[b])});return a},translate:function(){var a=this,b=a.pointArrayMap,e=[],c,e=a.getTranslatedLinesNames();r.prototype.translate.apply(a,arguments);f(a.points,function(k){f(b,function(b,
g){c=k[b];null!==c&&(k[e[g]]=a.yAxis.toPixels(c,!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,l=a.points,n=l.length,g=a.options,m=a.graph,h={options:{gapSize:g.gapSize}},q=[],t=a.getTranslatedLinesNames(a.pointValKey),p;f(t,function(a,b){for(q[b]=[];n--;)p=l[n],q[b].push({x:p.x,plotX:p.plotX,plotY:p[a],isNull:!c(p[a])});n=l.length});f(b,function(b,c){q[c]?(a.points=q[c],g[b]?a.options=d(g[b].styles,h):e('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),
a.graph=a["graph"+b],r.prototype.drawGraph.call(a),a["graph"+b]=a.graph):e('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=l;a.options=g;a.graph=m;r.prototype.drawGraph.call(a)}}});d(a,"indicators/aroon.src.js",[a["parts/Globals.js"],a["mixins/multipe-lines.js"]],function(a,f){function d(a,c){var d=a[0],e=0,b;for(b=1;b<a.length;b++)if("max"===c&&a[b]>=d||"min"===c&&a[b]<=d)d=a[b],e=b;return e}a.seriesType("aroon",
"sma",{params:{period:25},marker:{enabled:!1},tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e\x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eAroon Up: {point.y}\x3cbr/\x3eAroon Down: {point.aroonDown}\x3cbr/\x3e'},aroonDown:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}},a.merge(f,{nameBase:"Aroon",pointArrayMap:["y","aroonDown"],pointValKey:"y",linesApiNames:["aroonDown"],getValues:function(e,c){c=c.period;var f=e.xData,k=(e=e.yData)?
e.length:0,b=[],l=[],n=[],g,m,h;for(h=c-1;h<k;h++)g=e.slice(h-c+1,h+2),m=d(g.map(function(b){return a.pick(b[2],b)}),"min"),g=d(g.map(function(b){return a.pick(b[1],b)}),"max"),g=g/c*100,m=m/c*100,f[h+1]&&(b.push([f[h+1],g,m]),l.push(f[h+1]),n.push([g,m]));return{values:b,xData:l,yData:n}}}))});d(a,"masters/indicators/aroon.src.js",[],function(){})});
//# sourceMappingURL=aroon.js.map
