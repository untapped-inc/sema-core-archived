import React, { Component } from 'react';
import 'App.css';
import 'css/SemaSales.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as healthCheckActions from 'actions/healthCheckActions';
import { withRouter } from 'react-router'
import SeamaServiceError from "./SeamaServiceError";
import SeamaDatabaseError from "./SeamaDatabaseError";
import SalesSummaryPanel1 from "./Sales/SalesSummaryPanel1";
import SalesSummaryPanel2 from "./Sales/SalesSummaryPanel2";
import SalesMapContainer from './Sales/SalesMapContainer';
import SalesRetailerList from './Sales/SalesRetailerList';
import * as salesActions from 'actions/SalesActions';
import SalesByChannelChart from "./Sales/SalesByChannelChart";
let dateFormat = require('dateformat');

class SemaSales extends Component {
	constructor(props, context) {
		super(props, context);
		console.log("SeamaSales - Constructor");
	}

	render() {
		return this.showContent();
	}
	showContent(props){
		if( this.props.healthCheck.server !== "Ok" ){
			return SeamaServiceError(props);
		}else  if( this.props.healthCheck.database !== "Ok" ){
			return SeamaDatabaseError(props)
		}
		return this.showSales();

	}

	showSales(){
		return (
			<div className="SalesContainer">
				<div className = "SalesSummaryContainer">
					<div className ="SalesSummaryItem">
						<SalesSummaryPanel1 title="New Customers" date={this.props.sales.newCustomers.periods[1].beginDate}
											value={this.props.sales.newCustomers.periods[0].periodValue}
											delta = {calcChange(this.props.sales.newCustomers.periods[1].periodValue, this.props.sales.newCustomers.periods[2].periodValue)}
											valueColor = {calcColor(this.props.sales.newCustomers.periods[1].periodValue, this.props.sales.newCustomers.periods[2].periodValue)} />
					</div>
					<div className ="SalesSummaryItem">
						<SalesSummaryPanel1 title="Total Revenue" date={this.props.sales.totalRevenue.periods[1].beginDate}
											value={formatDollar(this.props.sales.totalRevenue.total)}
											delta = {calcChange(this.props.sales.totalRevenue.periods[1].periodValue, this.props.sales.totalRevenue.periods[2].periodValue)}
											valueColor = {calcColor(this.props.sales.totalRevenue.periods[1].periodValue, this.props.sales.totalRevenue.periods[2].periodValue)} />
					</div>
					<div className ="SalesSummaryItem">
						<SalesSummaryPanel1 title="Net Income" date={this.props.sales.netIncome.periods[1].beginDate}
											value={this.props.sales.netIncome.total}
											delta = {calcChange(this.props.sales.netIncome.periods[1].periodValue, this.props.sales.netIncome.periods[2].periodValue)}
											valueColor = {calcColor(this.props.sales.netIncome.periods[1].periodValue, this.props.sales.netIncome.periods[2].periodValue)} />
					</div>
				</div>
				<div className = "SalesContentContainer">
					<div className= "SalesMapItem" id="salesMapId">
						<SalesMapContainer google={this.props.google} retailers={this.props.sales.retailSales} />
					</div>
					<div className= "SalesListItem">
						<div><p style={{textAlign:"center"}}>{formatRetailSalesHeader(this.props.sales.retailSales)}</p></div>
						<SalesRetailerList retailers={this.props.sales.retailSales}/>
					</div>
					<div className= "SalesBottomContainer">
						<div className= "SalesBottomLeftTop">
							<SalesSummaryPanel2 title="Total Customers"
												value={ formatTotalCustomers(this.props.sales.totalCustomers)}
												valueColor = "rgb(24, 55, 106)"
												title2 = "All Channels" />
						</div>
						<div className= "SalesBottomLeftMiddle">
							<SalesSummaryPanel2 title="Liters/Customer"
												value={formatLitersPerCustomer(this.props.sales.gallonsPerCustomer)}
												valueColor = "green"
												title2 = {formatLitersPerPeriod(this.props.sales.gallonsPerCustomer)} />
						</div>
						<div className= "SalesBottomLeftBottom">
							<SalesSummaryPanel2 title="Customer Growth"
												value={formatCustomerGrowth(this.props.sales.newCustomers)}
												valueColor = "red"
												title2 = "Expected: 2.5%" />
						</div>
						<div className= "SalesBottomRight">
							<SalesByChannelChart chartData={this.props.sales.salesByChannel}/>
							{/*<SalesByChannelChart chartData={foobar(this.props)}/>*/}
						</div>
					</div>
					{/*<div className= "SalesBottonRightItem">*/}
						{/*<p>Bottom Right</p>*/}
					{/*</div>*/}
				</div>

			</div>
		);
	}
}
// const foobar = (p)=>{
//	return p.sales.salesByChannel;
// }

const formatRetailSalesHeader = (retailSales) =>{
	if( retailSales.length > 0 ){
		return "Data to " + dateFormat((new Date(Date.parse(retailSales[0].periods[0].endDate))), "dddd mmm, d, yyyy");
		//return retailSales[0].
	}
	return "No data available";
};



const formatDollar = amount =>{
	let suffix = "";
	if( typeof amount === "string") return amount;
	if( amount > 1000){
		amount = amount/1000;
		suffix = "k";
	}
	let formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'HTG',
		minimumFractionDigits: 2,
		// the default value for minimumFractionDigits depends on the currency
		// and is usually already 2
	});
	return formatter.format(amount) + suffix;
};

const formatTotalCustomers = total =>{
	if( typeof total === "string"){
		return total;
	}else{
		return String(parseFloat(total.toFixed(0)));
	}
};
const formatLitersPerCustomer = litersPerCustomer =>{
	if( typeof litersPerCustomer.value === "string"){
		return litersPerCustomer.value;
	}else{
		return String(parseFloat(litersPerCustomer.value.toFixed(0)));
	}
};
const formatLitersPerPeriod = litersPerCustomer =>{
	if( litersPerCustomer.period.toLowerCase() === "n/a"){
		return "N/A";
	}else{
		return "Liters/" + litersPerCustomer.period;
	}
};

const formatCustomerGrowth = newCustomers =>{
	if( typeof newCustomers.periods[1].periodValue === "string" ||
		typeof newCustomers.periods[2].periodValue === "string"){
		return "N/A";
	}else{
		return ((newCustomers.periods[1].periodValue/newCustomers.periods[2].periodValue *100) -100).toFixed(2) + "%"
	}
};


const calcChange = (now, last) => {
	if( typeof now === "string" ||
		typeof last === "string" ||
		!now || !last ){
		return "N/A"
	}else{
		return ((now/last)*100 -100).toFixed(2) + "%";
	}

};
const calcColor = (now, last) => {
	if( typeof now === "string" || typeof last === "string"){
		return "gray"
	}else{
		if(now > last ) return "green";
		else if(now < last ) return "red";
	}
	return "gray"
};

function mapStateToProps(state) {
	return {
		sales:state.sales,
		healthCheck: state.healthCheck
	};
}

function mapDispatchToProps(dispatch) {
	return {
		salesActions: bindActionCreators(salesActions, dispatch),
		healthCheckActions: bindActionCreators(healthCheckActions, dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SemaSales));

