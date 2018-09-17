import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class SeamaWaterProductionChart extends Component {
    render() {
        return (<div className = "chart">
                <Bar
                    data={this.props.chartData}
                    height={410}
                    width={200}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
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
                            text: 'Production (Gallons)',
                            position:"bottom"
                        }

                    }}
                />
            </div>
        );
    }
}
export default SeamaWaterProductionChart;
