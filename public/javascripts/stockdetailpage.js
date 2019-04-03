function drawChart(symbol = 'GOOG', records_num = 100) {
    obtain_data(symbol, 0, 100, function(result) {
        // split the data set into ohlc and volume
        var ohlc = [],
            dataLength = result.length,
            i = 0;
        for (i; i < dataLength; i += 1) {
            item = result[i];
            ohlc.push([
                result[i].timestamp, // the date
                result[i].open, // open
                result[i].high, // high
                result[i].low, // low
                result[i].close // close
            ]);
        }
        Highcharts.stockChart('curve_chart', {
            title: {
                text: symbol + ' Stock Price'
            },
            yAxis: [{
                labels: {
                    align: 'left'
                },
                height: '60%',
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'left'
                },
                top: '60%',
                height: '40%',
                offset: 0
            }],
            tooltip: {
                shape: 'square',
                headerShape: 'callout',
                borderWidth: 0,
                shadow: false,
                positioner: function(width, height, point) {
                    var chart = this.chart,
                        position;
                    if (point.isHeader) {
                        position = {
                            x: Math.max(
                                // Left side limit
                                chart.plotLeft, Math.min(point.plotX + chart.plotLeft - width / 2,
                                    // Right side limit
                                    chart.chartWidth - width - chart.marginRight)),
                            y: point.plotY
                        };
                    } else {
                        position = {
                            x: point.series.chart.plotLeft,
                            y: point.series.yAxis.top - chart.plotTop
                        };
                    }
                    return position;
                }
            },
            series: [{
                type: 'candlestick',
                id: symbol + '-candle',
                name: symbol + ' Stock Price',
                data: ohlc
            }, {
                type: 'macd',
                linkedTo: symbol + '-candle',
                yAxis: 1
            }],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 800
                    },
                    chartOptions: {
                        rangeSelector: {
                            inputEnabled: false
                        }
                    }
                }]
            }
        });
    });
};
