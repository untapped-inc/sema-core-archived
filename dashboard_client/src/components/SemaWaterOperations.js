import React, { Component } from 'react';
import 'App.css';
import SemaSummaryPanel1 from "./WaterQuality/SemaSummaryPanel1";
import SeamaWaterProductionChart from "./WaterQuality/SeamaWaterProductionChart";
import SeamaWaterChlorineChart from "./WaterQuality/SeamaWaterChlorineChart";
import SeamaWaterTdsChart from "./WaterQuality/SeamaWaterTdsChart";
import 'css/SemaWaterOperations.css';
import SeamaWaterQualityNavigation from "./WaterQuality/SeamaWaterQualityNavigation";
import SeamaServiceError from "./SeamaServiceError";
import SeamaDatabaseError from "./SeamaDatabaseError";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as waterOperationsActions from 'actions/WaterOperationsActions';
import * as healthCheckActions from 'actions/healthCheckActions';
import { withRouter } from 'react-router'
import SemaSummaryPanel2 from "./WaterQuality/SemaSummaryPanel2";

class SemaWaterOperations extends Component {

    render() {
        return this.showContent();
    }
    showContent(props){
		if( this.props.healthCheck.server !== "Ok" ){
			return SeamaServiceError(props);
		}else  if( this.props.healthCheck.database !== "Ok" ){
			return SeamaDatabaseError(props)
		}
        return this.showWaterOperations();

    }

    showWaterOperations( ){
        return (
            <div className="WaterQualityContainer">
                <div className = "WaterOperationsSummaryContainer">
					<div className = "WaterOperationsProduction">
						<div className ="WaterOperationsSummaryItem">
							<SemaSummaryPanel1 title="Total Production" units={"Gallons"}
											   value={this.props.waterOperations.totalProduction.value}
											   valueColor=""
											   date={this.props.waterOperations.totalProduction.date}/>
						</div>
					</div>
					<div className = "WaterOperationsWastage">
						<div className ="WaterOperationsSummaryItem">
							<SemaSummaryPanel1 title="Total Wastage" units={"Gallons"}
											   value={this.calculateWastage()}
											   valueColor="red"
											   date={this.props.waterOperations.fillStation.date}/>
						</div>
					</div>
					<div className = "WaterOperationsPressure">
						<div className = "WaterOperationsSummaryItem2">
							<SemaSummaryPanel2 data={this.props.waterOperations}
											   type="pressure"/>
						</div>
					</div>

					<div className = "WaterOperationsFlow">
						<div className = "WaterOperationsSummaryItem2">
							<SemaSummaryPanel2 data={this.props.waterOperations}
											   type="flowrate"/>
						</div>
					</div>
                </div>
                <div className ="WaterQualityNavigtionItem">
                    <SeamaWaterQualityNavigation/>
                </div>
                <div className = "WaterQualityChartContainer">
                    <div className= "WaterQualityMainChartItem">
                        <SeamaWaterProductionChart chartData={this.props.waterOperations.production}/>
                    </div>
                    <div className= "WaterQualitySecondaryChart1Item">
                        <SeamaWaterChlorineChart chartData={this.props.waterOperations.chlorine}/>
                    </div>
                    <div className= "WaterQualitySecondaryChart2Item">
                        <SeamaWaterTdsChart chartData={this.props.waterOperations.tds}/>
                    </div>
                </div>
            </div>
        );
    }
    calculateWastage(){
    	if( this.props.waterOperations.totalProduction.value === "N/A" ||
			this.props.waterOperations.fillStation.value === "N/A" ){
    		return "N/A";
		}else{
    		return this.props.waterOperations.totalProduction.value - this.props.waterOperations.fillStation.value;
		}
	}
}

function mapStateToProps(state) {
	return {
		waterOperations:state.waterOperations,
		healthCheck: state.healthCheck
	};
}

function mapDispatchToProps(dispatch) {
	return {
		waterOperationsActions: bindActionCreators(waterOperationsActions, dispatch),
		healthCheckActions: bindActionCreators(healthCheckActions, dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SemaWaterOperations));

