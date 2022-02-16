import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { UserCityMetric, UserDateMetric } from '../../interface';
import DateTimeUtil from '../../utils/DateTimeUtil';
import { City } from '../../utils/ProvinceUtil';



export function UserCityMetricChart({ data }) {
    const [option, setOption] = useState()

    const buildOption = (data: Array<UserCityMetric>) => {
        var series: any = []
        for (var i = 0; i < data.length; i++) {
            var metric = data[i];
            series.push({
                name: City.getName(metric.city),
                y: metric.total
            })
        }

        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Cửa hàng',
                colorByPoint: true,
                data: series
            }]
        }
    }

    useEffect(() => {
        const option: any = buildOption(data)
        setOption(option)
    }, [])

    return (
        <HighchartsReact constructorType={"chart"}
            highcharts={Highcharts} options={option} />
    )
}

export function UserDateMetricChart({ data }) {
    const [option, setOption] = useState()

    const buildOption = (data: Array<UserDateMetric>) => {
        let dataSeries: any = []
        var categories: any = []
        for (var i = data.length - 1; i >= 0; i--) {
            dataSeries.push([data[i].date, data[i].total])
            categories.push(DateTimeUtil.toStringNotYear(DateTimeUtil.parseDate(data[i].date)))
        }
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: categories,
                labels: {
                    format: '{value:%e %b}'
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Số người đăng ký',
                data: dataSeries
            }]
        }
    }

    useEffect(() => {
        const option: any = buildOption(data)
        setOption(option)
    }, [])

    return (
        <HighchartsReact constructorType={"chart"}
            highcharts={Highcharts} options={option} />
    )
}