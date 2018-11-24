
import { SALES_REPORT_FROM_ORDERS, REPORT_TYPE,REMINDER_REPORT,INVENTORY_REPORT, REPORT_FILTER, initializeSalesData, initializeInventoryData } from "../actions/ReportActions"

let initialState = {salesData:initializeSalesData(),
					reportType:"sales",
					inventoryData:initializeInventoryData(),
					dateFilter:{},
					reminderData: []};

const reportReducer = (state = initialState, action) => {
	console.log("reportReducer: " +action.type);
	let newState;
	switch (action.type) {
		case SALES_REPORT_FROM_ORDERS:
			newState = {...state};
			newState.salesData = action.data.salesData ;
			return newState;

		case INVENTORY_REPORT:
			newState = {...state};
			newState.inventoryData = action.data.inventoryData ;
			return newState;

		case REPORT_FILTER:
			newState = {...state};
			newState.dateFilter = action.data;
			return newState;

		case REPORT_TYPE:
			newState = {...state};
			newState.reportType = action.data ;
			return newState;
		
		case REMINDER_REPORT:
			newState = {...state}
			newState.reminderData = action.data.reminderData;
			return newState

		default:
			return state;
	}
};


export default reportReducer;

