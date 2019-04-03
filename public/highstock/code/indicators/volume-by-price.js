/*
  Highcharts JS v7.1.0 (2019-04-01)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Dalek

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/indicators/volume-by-price",["highcharts","highcharts/modules/stock"],function(p){f(p);f.Highcharts=p;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function p(g,f,p,u){g.hasOwnProperty(f)||(g[f]=u.apply(null,p))}f=f?f._modules:{};p(f,"indicators/volume-by-price.src.js",[f["parts/Globals.js"]],function(g){var f=Math.abs,p=
g.noop,u=g.addEvent,w=g.correctFloat,A=g.seriesType,v=g.seriesTypes.column.prototype;A("vbp","sma",{params:{ranges:12,volumeSeriesID:"volume"},zoneLines:{enabled:!0,styles:{color:"#0A9AC9",dashStyle:"LongDash",lineWidth:1}},volumeDivision:{enabled:!0,styles:{positiveColor:"rgba(144, 237, 125, 0.8)",negativeColor:"rgba(244, 91, 91, 0.8)"}},animationLimit:1E3,enableMouseTracking:!1,pointPadding:0,zIndex:-1,crisp:!0,dataGrouping:{enabled:!1},dataLabels:{allowOverlap:!0,enabled:!0,format:"P: {point.volumePos:.2f} | N: {point.volumeNeg:.2f}",
padding:0,style:{fontSize:"7px"},verticalAlign:"top"}},{nameBase:"Volume by Price",bindTo:{series:!1,eventName:"afterSetExtremes"},calculateOn:"render",markerAttribs:p,drawGraph:p,getColumnMetrics:v.getColumnMetrics,crispCol:v.crispCol,init:function(b){var a,c;g.seriesTypes.sma.prototype.init.apply(this,arguments);a=this.options.params;c=this.linkedParent;a=b.get(a.volumeSeriesID);this.addCustomEvents(c,a);return this},addCustomEvents:function(b,a){function c(){e.chart.redraw();e.setData([]);e.zoneStarts=
[];e.zoneLinesSVG&&(e.zoneLinesSVG.destroy(),delete e.zoneLinesSVG)}var e=this;e.dataEventsToUnbind.push(u(b,"remove",function(){c()}));a&&e.dataEventsToUnbind.push(u(a,"remove",function(){c()}));return e},animate:function(b){var a=this,c={};g.svg&&!b&&(c.translateX=a.yAxis.pos,a.group.animate(c,g.extend(g.animObject(a.options.animation),{step:function(b,c){a.group.attr({scaleX:Math.max(.001,c.pos)})}})),a.animate=null)},drawPoints:function(){this.options.volumeDivision.enabled&&(this.posNegVolume(!0,
!0),v.drawPoints.apply(this,arguments),this.posNegVolume(!1,!1));v.drawPoints.apply(this,arguments)},posNegVolume:function(b,a){var c=a?["positive","negative"]:["negative","positive"],e=this.options.volumeDivision,f=this.points.length,n=[],d=[],h=0,m,k,g,l;b?(this.posWidths=n,this.negWidths=d):(n=this.posWidths,d=this.negWidths);for(;h<f;h++)l=this.points[h],l[c[0]+"Graphic"]=l.graphic,l.graphic=l[c[1]+"Graphic"],b&&(m=l.shapeArgs.width,k=this.priceZones[h],(g=k.wholeVolumeData)?(n.push(m/g*k.positiveVolumeData),
d.push(m/g*k.negativeVolumeData)):(n.push(0),d.push(0))),l.color=a?e.styles.positiveColor:e.styles.negativeColor,l.shapeArgs.width=a?this.posWidths[h]:this.negWidths[h],l.shapeArgs.x=a?l.shapeArgs.x:this.posWidths[h]},translate:function(){var b=this,a=b.options,c=b.chart,e=b.yAxis,q=e.min,n=b.options.zoneLines,d=b.priceZones,h=0,m,k,x,l,p,t,r,y,u,z;v.translate.apply(b);m=b.points;m.length&&(r=.5>a.pointPadding?a.pointPadding:.1,a=b.volumeDataArray,k=g.arrayMax(a),x=c.plotWidth/2,y=c.plotTop,l=f(e.toPixels(q)-
e.toPixels(q+b.rangeStep)),p=f(e.toPixels(q)-e.toPixels(q+b.rangeStep)),r&&(q=f(l*(1-2*r)),h=f((l-q)/2),l=f(q)),m.forEach(function(a,c){u=a.barX=a.plotX=0;z=a.plotY=e.toPixels(d[c].start)-y-(e.reversed?l-p:l)-h;t=w(x*d[c].wholeVolumeData/k);a.pointWidth=t;a.shapeArgs=b.crispCol.apply(b,[u,z,t,l]);a.volumeNeg=d[c].negativeVolumeData;a.volumePos=d[c].positiveVolumeData;a.volumeAll=d[c].wholeVolumeData}),n.enabled&&b.drawZones(c,e,b.zoneStarts,n.styles))},getValues:function(b,a){var c=b.processedXData,
e=b.processedYData,f=this.chart,n=a.ranges,d=[],h=[],m=[],k;if(!b.chart)return g.error("Base series not found! In case it has been removed, add a new one.",!0,f);if(!(k=f.get(a.volumeSeriesID)))return g.error("Series "+a.volumeSeriesID+" not found! Check `volumeSeriesID`.",!0,f);if((a=g.isArray(e[0]))&&4!==e[0].length)return g.error("Type of "+b.name+" series is different than line, OHLC or candlestick.",!0,f);(this.priceZones=this.specifyZones(a,c,e,n,k)).forEach(function(a,b){d.push([a.x,a.end]);
h.push(d[b][0]);m.push(d[b][1])});return{values:d,xData:h,yData:m}},specifyZones:function(b,a,c,e,f){var n;if(b){n=c.length;for(var d=c[0][3],h=d,m=1,k;m<n;m++)k=c[m][3],k<d&&(d=k),k>h&&(h=k);n={min:d,max:h}}else n=!1;n=(d=n)?d.min:g.arrayMin(c);k=d?d.max:g.arrayMax(c);var d=this.zoneStarts=[],h=[],q=0,m=1,l;if(!n||!k)return this.points.length&&(this.setData([]),this.zoneStarts=[],this.zoneLinesSVG.destroy()),[];l=this.rangeStep=w(k-n)/e;for(d.push(n);q<e-1;q++)d.push(w(d[q]+l));d.push(k);for(e=d.length;m<
e;m++)h.push({index:m-1,x:a[0],start:d[m-1],end:d[m]});return this.volumePerZone(b,h,f,a,c)},volumePerZone:function(b,a,c,e,g){var n=this,d=c.processedXData,h=c.processedYData,m=a.length-1,k=g.length;c=h.length;var p,l,q,t,r;f(k-c)&&(e[0]!==d[0]&&h.unshift(0),e[k-1]!==d[c-1]&&h.push(0));n.volumeDataArray=[];a.forEach(function(a){a.wholeVolumeData=0;a.positiveVolumeData=0;for(r=a.negativeVolumeData=0;r<k;r++)q=l=!1,t=b?g[r][3]:g[r],p=r?b?g[r-1][3]:g[r-1]:t,t<=a.start&&0===a.index&&(l=!0),t>=a.end&&
a.index===m&&(q=!0),(t>a.start||l)&&(t<a.end||q)&&(a.wholeVolumeData+=h[r],p>t?a.negativeVolumeData+=h[r]:a.positiveVolumeData+=h[r]);n.volumeDataArray.push(a.wholeVolumeData)});return a},drawZones:function(b,a,c,e){var f=b.renderer,g=this.zoneLinesSVG,d=[],h=b.plotWidth,m=b.plotTop,k;c.forEach(function(c){k=a.toPixels(c)-m;d=d.concat(b.renderer.crispLine(["M",0,k,"L",h,k],e.lineWidth))});g?g.animate({d:d}):g=this.zoneLinesSVG=f.path(d).attr({"stroke-width":e.lineWidth,stroke:e.color,dashstyle:e.dashStyle,
zIndex:this.group.zIndex+.1}).add(this.group)}},{destroy:function(){this.negativeGraphic&&(this.negativeGraphic=this.negativeGraphic.destroy());return g.Point.prototype.destroy.apply(this,arguments)}})});p(f,"masters/indicators/volume-by-price.src.js",[],function(){})});
//# sourceMappingURL=volume-by-price.js.map
