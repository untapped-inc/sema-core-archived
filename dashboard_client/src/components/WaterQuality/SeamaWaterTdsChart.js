import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

class SeamaWaterTdsChart extends Component {

    render() {
        return (<div className = "chart">
                <Line
                    data={this.props.chartData}
                    height={300}
                    width={200}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true,
                                    max:210,
									stepSize: 30,
                                }
                            }],
                            xAxes: [{
                                displayFormats: {
                                    day: 'MMM D'
                                }
                            }]

                        },
                        title: {
                            display: true,
                            text: 'Total Disolved Solids Level',
                            position:"bottom"
                        }

                    }}
                />
            </div>
        );
    }
}
export default SeamaWaterTdsChart;
