import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as reportActions from "../../actions/ReportActions";
import DateFilter from "./DateFilter";
import * as Utilities from "../../services/Utilities";

class SalesReport extends Component {
	constructor(props) {
		super(props);
		this.startDate = null;
		this.endDate = null;
	}
	componentDidMount() {
		console.log("SalesReport - componentDidMount");
		// this.props.reportActions.GetSalesReportData( this.startDate, this.endDate);
	}
	render() {
		if( this.props.reportType === "sales") {
			return (
				<View style={{ flex: 1 }}>
					<DateFilter/>
					<View style={{ flex: .7, backgroundColor: 'white', marginLeft: 10, marginRight: 10, marginTop: 10, }}>
						<View style = {styles.titleText}>
							<View style = {styles.leftHeader}>
								<Text style = {styles.titleItem}>Sales </Text>
							</View>
						</View>
						<FlatList
							data={this.getSalesData()}
							ListHeaderComponent={this.showHeader}
							// extraData={this.state.refresh}
							renderItem={({ item, index, separators }) => (
								<View>
									{this.getRow(item, index, separators)}
								</View>
							)}
							keyExtractor={item => item.sku}
							initialNumToRender={50}
						/>
					</View>
					<View style={{
						flex: .3,
						backgroundColor: 'white',
						marginLeft: 10,
						marginRight: 10,
						marginBottom: 10,
					}}>
						<View style={{ flex: 1, flexDirection: 'row' }}>
							<Text style={[styles.totalItem, { flex: 1.5 }]}> </Text>
							<Text style={[styles.totalItem, { flex: .7 }]}>Total Liters </Text>
							<Text style={[styles.totalItem, { flex: .6 }]}>{this.getTotalLiters()}</Text>
							<Text style={[styles.totalItem, { flex: .7 }]}>Total Sales </Text>
							<Text style={[styles.totalItem, { flex: .9 }]}>{Utilities.formatCurrency(this.getTotalSales())}</Text>
						</View>
					</View>

				</View>
			);
		}else{
			return null;
		}
	}
	getSalesData(){
		if( this.props.dateFilter.hasOwnProperty("startDate") && this.props.dateFilter.hasOwnProperty("endDate") ){
			if( this.props.dateFilter.startDate == this.startDate && this.props.dateFilter.endDate == this.endDate){
				return this.props.salesData.salesItems;
			}else{
				// Get new data
				this.startDate = this.props.dateFilter.startDate;
				this.endDate = this.props.dateFilter.endDate;
				this.updateReport();
				return this.props.salesData.salesItems;
			}
		}else{
			return this.props.salesData.salesItems;
		}
	}
	getTotalSales (){
		if( this.props.salesData.totalSales ){
			return this.props.salesData.totalSales;
		}else{
			return 0;
		}
	}

	getTotalLiters(){
		if( this.props.salesData.totalLiters ){
			return this.props.salesData.totalLiters.toFixed(2);
		}else{
			return 0;
		}

	}
	getRow = (item)=>{
		console.log("SalesReport - getRow");
		return (
			<View style={[{flex: 1, flexDirection: 'row',  alignItems:'center'},styles.rowBackground]}>
				<View style={ [{flex: 1}]}>
					<Text numberOfLines={1}  style={[styles.rowItem,styles.leftMargin]}>{item.description}</Text>
				</View>
				<View style={[ {flex: .5, }]}>
					<Text style={[styles.rowItemCenter]}>{item.quantity}</Text>
				</View>
				<View style={[ {flex: .7}]}>
					<Text style={[styles.rowItemCenter]}>{item.litersPerSku} L</Text>
				</View>
				<View style={[{flex: .7}]}>
					<Text style={[styles.rowItemCenter]}>{item.totalLiters.toFixed(2)} L</Text>
				</View>
				<View style={[{flex: .7}]}>
					<Text style={[styles.rowItemCenter]}>{item.pricePerSku.toFixed(2)}</Text>
				</View>
				<View style={ [{flex: .7}]}>
					<Text style={[styles.rowItemCenter]}>{item.totalSales.toFixed(2)}</Text>
				</View>
			</View>
		);
	};
	showHeader = () =>{
		return (
			<View style={[{flex: 1, flexDirection: 'row', height:50, alignItems:'center'},styles.headerBackground]}>
				<View style={ [{flex: 1}]}>
					<Text style={[styles.headerItem,styles.leftMargin]}>SKU</Text>
				</View>
				<View style={[ {flex: .5}]}>
					<Text style={[styles.headerItemCenter]}>Quantity</Text>
				</View>
				<View style={ [ {flex: .7}]}>
					<Text style={[styles.headerItemCenter]}>Liters/SKU</Text>
				</View>
				<View style={ [{flex: .7}]}>
					<Text style={[styles.headerItemCenter]}>Total Liters</Text>
				</View>
				<View style={ [{flex: .7}]}>
					<Text style={[styles.headerItemCenter]}>Price/SKU</Text>
				</View>
				<View style={ [{flex: .7}]}>
					<Text style={[styles.headerItemCenter]}>Total Sales</Text>
				</View>
			</View>
		);
	};

	updateReport(){
		this.props.reportActions.GetSalesReportData( this.startDate, this.endDate);
	}
}

function mapStateToProps(state, props) {
	return { salesData: state.reportReducer.salesData,
			 dateFilter: state.reportReducer.dateFilter,
			 reportType: state.reportReducer.reportType
	};
}

function mapDispatchToProps(dispatch) {
	return {reportActions:bindActionCreators(reportActions, dispatch) };
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SalesReport);

const styles = StyleSheet.create({

	headerItem:{
		fontWeight:"bold",
		fontSize:18,
	},
	headerItemCenter:{
		fontWeight:"bold",
		fontSize:18,
		textAlign:'center'
	},
	rowItem:{
		fontSize:16,
		paddingLeft:10,
		borderLeftWidth:1,
		borderColor:'black',
		borderTopWidth:1,
		borderBottomWidth:1,
		borderRightWidth:1
	},
	rowItemCenter:{
		fontSize:16,
		paddingLeft:10,
		borderLeftWidth:1,
		borderColor:'black',
		borderTopWidth:1,
		borderBottomWidth:1,
		borderRightWidth:1,
		textAlign:'center'
	},

	rowBackground:{
		backgroundColor:'white'
	},

	headerBackground:{
		backgroundColor:'white'
	},
	totalItem:{
		fontWeight:"bold",
		fontSize:18,
		paddingLeft:10,
	},
	titleItem:{
		fontWeight:"bold",
		fontSize:20
	},
	titleText: {
		backgroundColor: 'white',
		height: 36,
		flexDirection:'row',

	},

	leftHeader: {
		flexDirection:'row',
		flex:1,
		alignItems:'center'

	},

});
