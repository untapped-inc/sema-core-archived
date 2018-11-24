import PosStorage from "../database/PosStorage";
import { REMOVE_PRODUCT } from "./OrderActions";

export const SALES_REPORT_FROM_ORDERS = 'SALES_REPORT_FROM_ORDERS';
export const INVENTORY_REPORT = 'INVENTORY_REPORT';
export const REPORT_TYPE = 'REPORT_TYPE';
export const REMINDER_REPORT = 'REMINDER_REPORT'
export const REPORT_FILTER = 'REPORT_FILTER';


export function GetSalesReportData( beginDate, endDate ) {
	console.log("GetSalesReportData - action");

	return (dispatch) => {
		getSalesData(beginDate, endDate)
			.then( salesData =>{
				dispatch({type: SALES_REPORT_FROM_ORDERS, data:{salesData:salesData}})
			})
			.catch((error) => {
				console.log( "GetSalesReportData - Error " + error.message);
				dispatch({type: SALES_REPORT_FROM_ORDERS, data:{salesData:[]}})
			});
		}

}

export function setReportType( reportType ) {
	console.log("setReportType - action");
	return (dispatch) => { dispatch({type: REPORT_TYPE, data:reportType}); }
}

export function setReportFilter( startDate, endDate ){
	console.log("setReportFilter - action");
	return (dispatch) => { dispatch({type: REPORT_FILTER, data:{startDate:startDate, endDate:endDate}}); }
}

const getSalesData = (beginDate, endDate) =>{
	return new Promise((resolve, reject) => {
		let results = new Map();
		let sales = PosStorage.getFilteredSales(beginDate, endDate);
		let resolvedCount = 0;
		if( sales.length === 0 ){
			resolve({totalLiters: 0, totalSales: 0, salesItems:[]});
		}
		for( let index = 0; index < sales.length; index++ ){
			PosStorage.loadSale(sales[index] ).then( (receipt) => {
				resolvedCount++;
				receipt.products.every(product => {
					let mapProduct = results.get(product.sku);
					if (mapProduct) {
						mapProduct.quantity += product.quantity;
						mapProduct.totalSales += product.priceTotal;
						mapProduct.pricePerSku = mapProduct.totalSales/mapProduct.quantity;
						if (mapProduct.litersPerSku != "N/A"){
							mapProduct.totalLiters += mapProduct.litersPerSku * product.quantity;
						}
					}else{
						mapProduct = {
							sku: product.sku,
							description:product.description,
							quantity: product.quantity,
							pricePerSku: product.priceTotal/product.quantity,
							totalSales: product.priceTotal,
							litersPerSku:product.litersPerSku
						};
						if( mapProduct.litersPerSku != "N/A" ) {
							mapProduct.totalLiters = mapProduct.litersPerSku * product.quantity;
						}
						results.set(product.sku, mapProduct);
					}
					return true;
				});
				if( (resolvedCount) === sales.length){
					let salesItems = [];
					let totalLiters = 0;
					let totalSales = 0;
					results.forEach(value => {
						if( value.litersPerSku != "N/A"){
							totalLiters += value.totalLiters;
						}
						totalSales += value.totalSales;
						salesItems.push(value);
					});
					if( totalLiters === 0 ){
						totalLiters = "N/A";
					}
					// salesItems = salesItems.concat(salesItems);
					// salesItems = salesItems.concat(salesItems);
					resolve({totalLiters: totalLiters, totalSales: totalSales, salesItems:salesItems});

				}
			});
		}
	});
};

export function GetInventoryReportData( beginDate, endDate, products ) {
	console.log("GetInventoryReportData - action");

	return (dispatch) => {
		getInventoryData(beginDate, endDate, products)
			.then( inventoryData =>{
				dispatch({type: INVENTORY_REPORT, data:{inventoryData:inventoryData}})
			})
			.catch((error) => {
				console.log( "GetInventoryReportData - Error " + error.message);
				dispatch({type: INVENTORY_REPORT, data:{inventoryData:[]}})
			});
	}

}

const computeReminders = () => {
	return new Promise((resolve,reject) => {
		let reminders = []
		let customers = PosStorage.getCustomers()
		let mostRecentReceipts = PosStorage.getReminderData()
		customers.forEach(customer => {
			let currentReceipt = mostRecentReceipts[customer.customerId]
			let date_diff = Math.floor((new Date() - Date.parse(currentReceipt.createdDate))/86400000)
			if (date_diff > customer.frequency) {
				reminders.push(customer)
			}
		})
		resolve(reminders)
	})
} 

export function getRemindersData() {
	console.log("Get Reminders action")
	return (dispatch) => {
		computeReminders()
			.then( reminders => {
				dispatch({type: REMINDER_REPORT, data:{reminderData:reminders}})
			})
			.catch((error) => {
				console.log( "GetReminderData - Error " + error.message);
				dispatch({type: REMINDER_REPORT, data:{reminderData:[]}})
			});
		}
}

const getInventoryData = (beginDate, endDate, products) =>{
	return new Promise((resolve, reject) => {
		getSalesData(beginDate, endDate)
			.then( salesData =>{
				getInventoryItem(beginDate, products)
					.then(inventorySettings => {
						let inventoryData = createInventory( salesData, inventorySettings, products);
						resolve( inventoryData)
					})
					.catch((error) => {
						reject( error);
					});
			})
			.catch((error) => {
				reject( error);
			});
	});
};
const createInventory = (salesData, inventorySettings, products ) =>{
	let salesAndProducts = {...salesData};
	salesAndProducts.salesItems = salesData.salesItems.slice();
	let emptyProducts = [];
	for( let index = 0; index < products.length; index++ ){
		if( isNotIncluded( products[index], salesAndProducts.salesItems)){
			emptyProducts.push(
				{
					sku: products[index].sku,
					description:products[index].description,
					quantity: 0,
					totalSales: 0,
					totalLiters:0,
					litersPerSku:products[index].unitPerProduct
				});
		}
	}
	salesAndProducts.salesItems = salesAndProducts.salesItems.concat( emptyProducts );
	let inventoryData = {salesAndProducts:salesAndProducts, inventory:inventorySettings};

	return inventoryData;
};

const isNotIncluded = ( product, salesAndProducts) =>{
	for( let index =0; index < salesAndProducts.length; index++){
		if( salesAndProducts[index].sku == product.sku){
			return false;
		}
	}
	return true;
};

const getInventoryItem = (beginDate, products) => {
	return new Promise((resolve ) => {
		const promiseToday = PosStorage.getInventoryItem(beginDate);
		const yesterday = new Date( beginDate.getTime() - 24 * 60 *60 *1000);
		const promiseYesterday = PosStorage.getInventoryItem( yesterday);
		Promise.all([promiseToday, promiseYesterday])
			.then(inventoryResults => {
				if( inventoryResults[0] != null ){
					if( inventoryResults[1]){
						inventoryResults[0].previousProductSkus = inventoryResults[1].currentProductSkus;
						inventoryResults[0].previousMeter = inventoryResults[1].currentMeter;
					}
					resolve(inventoryResults[0])
				}else{
					let newInventory = initializeInventory();
					newInventory.date = beginDate;
					newInventory.currentProductSkus = products.map( product => {return {sku:product.sku, quantity:null }});
					newInventory.previousProductSkus = products.map( product => {return {sku:product.sku, quantity:null }});
					if( inventoryResults[1] ){
						newInventory.previousProductSkus = inventoryResults[1].currentProductSkus;
						newInventory.previousMeter = inventoryResults[1].currentMeter;
					}
					resolve(newInventory);
				}
		});
	});
};
const initializeInventory = () =>{
	return {date:null, currentMeter:null, currentProductSkus:[], previousMeter:null, previousProductSkus:[]}
}
export const initializeSalesData = () => {
	return {totalLiters: null, totalSales: null, salesItems:[]};
};
export const initializeInventoryData = () =>{
	return {salesAndProducts:initializeSalesData(), inventory:initializeInventory()}
};
