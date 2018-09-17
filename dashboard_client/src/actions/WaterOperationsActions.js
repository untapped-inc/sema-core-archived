import * as allActions from './ActionTypes';
import moment from "moment/moment";
import { axiosService } from 'services';

function receiveWaterOperations(data) {
	console.log("receiveWaterOperations - ", data.toString());
	data = updateWaterQualityState(data);
	return {type: allActions.RECEIVE_WATER_OPERATIONS, data};
}

function initializeWaterOperations() {
	return {
		loaded:false,
		totalProduction: {value:"N/A", date:"N/A"},
		fillStation: {value:"N/A", date:"N/A"},
		sitePressureIn: {value:"N/A", date:"N/A"},
		sitePressureOut: {value:"N/A", date:"N/A"},
		sitePressureMembrane: {value:"N/A", date:"N/A"},
		flowRateFeed:{value:"N/A", date:"N/A"},
		flowRateProduct:{value:"N/A", date:"N/A"},
		production: createBlankChart(),
		chlorine: createBlankChart(),
		tds: createBlankChart()
	}
}

function fetchWaterOperations( params ) {
	return (dispatch) => {
		return axiosService
			.get('/untapped/water-operations', { params })
			.then(response => {
				if(response.status === 200){
					dispatch(receiveWaterOperations(response.data))
				}else{
					dispatch(receiveWaterOperations(initializeWaterOperations()))

				}
			})
			.catch(function(){
				// This means the service isn't running.
				dispatch(receiveWaterOperations(initializeWaterOperations()))
			});
	};
}


const updateWaterQualityState = waterQuality => {

	console.log("updateWaterQualityState");
	let newWaterQuality = {};
	newWaterQuality.loaded =true;

	newWaterQuality.totalProduction = waterQuality.totalProduction;
	newWaterQuality.fillStation = waterQuality.fillStation;
	newWaterQuality.sitePressureIn = waterQuality.sitePressureIn;
	newWaterQuality.sitePressureOut = waterQuality.sitePressureOut;
	newWaterQuality.sitePressureMembrane = waterQuality.sitePressureMembrane;
	newWaterQuality.flowRateFeed = waterQuality.flowRateFeed;
	newWaterQuality.flowRateProduct = waterQuality.flowRateProduct;

	if( waterQuality.production.datasets.length === 0 ){
		newWaterQuality.production = createBlankChart();
	}else{
		newWaterQuality.production = {
			labels:waterQuality.production.x_axis,
			datasets: waterQuality.production.datasets
		};
		newWaterQuality.production.datasets[0].backgroundColor = 'rgb(53, 91, 183)';
		newWaterQuality.production.labels = newWaterQuality.production.labels.map(function(time)
		{return moment(time ).format("MMM Do YY")});

		// Create the line series. This needs to be a trend line, dummy for now
		let lineSet = {
			label: "Forecast",
			data: newWaterQuality.production.datasets[0].data.map(function (value) {
				return (value * .8)
			}),
			type: "line",
			borderColor:'rgb(231, 113, 50)',
			backgroundColor:'rgb(231, 113, 50)',
			fill:false,
			pointRadius:0,
			borderWidth:5
		};
		newWaterQuality.production.datasets.unshift(lineSet )
	}
	if( waterQuality.chlorine.datasets.length === 0){
		newWaterQuality.chlorine = createBlankChart();
	}else{
		newWaterQuality.chlorine = {
			labels:waterQuality.chlorine.x_axis,
			datasets: waterQuality.chlorine.datasets
		};
		newWaterQuality.chlorine.datasets[0].backgroundColor='rgb(53, 91, 183)';
		newWaterQuality.chlorine.datasets[0].fill=false;
		newWaterQuality.chlorine.datasets[0].pointRadius=0;
		newWaterQuality.chlorine.datasets[0].borderColor='rgb(53, 91, 183)';
		newWaterQuality.chlorine.labels = newWaterQuality.chlorine.labels.map(function(time)
		{return moment(time ).format("MMM Do YY")});
		createGuide(newWaterQuality.chlorine.datasets, 0.9, "red", "High");
		createGuide(newWaterQuality.chlorine.datasets, 0.4, "yellow", "Low");
		createGuide(newWaterQuality.chlorine.datasets, 0.6, "green", "ideal");
	}
	if( waterQuality.tds.datasets.length === 0){
		newWaterQuality.tds = createBlankChart();
	}else{
		newWaterQuality.tds = {
			labels:waterQuality.tds.x_axis,
			datasets: waterQuality.tds.datasets
		};
		newWaterQuality.tds.datasets[0].backgroundColor='rgb(53, 91, 183)';
		newWaterQuality.tds.datasets[0].fill=false;
		newWaterQuality.tds.datasets[0].pointRadius=0;
		newWaterQuality.tds.datasets[0].borderColor='rgb(53, 91, 183)';
		newWaterQuality.tds.labels = newWaterQuality.tds.labels.map(function(time)
		{return moment(time ).format("MMM Do YY")});
		createGuide(newWaterQuality.tds.datasets, 150, "red", "Shutdown");
		createGuide(newWaterQuality.tds.datasets, 70, "yellow", "Risk");
		createGuide(newWaterQuality.tds.datasets, 110, "rgb(198,209,232", "Fair");
		createGuide(newWaterQuality.tds.datasets, 30, "green", "Good");
	}

	return newWaterQuality;
};


const createGuide = ( datasets, yValue, color, label) =>{
	let guideData = new Array(datasets[0].data.length);
	guideData.fill( yValue);
	let guide = {
		label: label,
		data: guideData,
		type: "line",
		borderColor:color,
		backgroundColor:color,
		fill:false,
		pointRadius:0,
		borderWidth:2
	};
	datasets.push(guide )

};
const createBlankChart = () => {
	return { x_axis: [], datasets: []}
};

export const waterOperationsActions = {
	receiveWaterOperations,
	initializeWaterOperations,
	fetchWaterOperations
};
