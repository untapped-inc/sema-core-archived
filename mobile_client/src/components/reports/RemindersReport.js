import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, FlatList} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as reportActions from "../../actions/ReportActions";
import * as customerActions from '../../actions/CustomerActions';
import * as customerBarActions from "../../actions/CustomerBarActions";
import * as toolBarActions from "../../actions/ToolBarActions";
import * as orderActions from "../../actions/OrderActions";
import PosStorage from "../../database/PosStorage";
import DateFilter from './DateFilter'

import i18n from '../../app/i18n';

class RemindersReport extends Component {
	getReminders() {
		this.props.reportActions.getRemindersData()
	}

	getRemindersData() {
		this.getReminders()
		return this.props.reminderData
	}

	showHeader = () => {
		return (
			<View style={[{flex: 1, flexDirection: 'row', height:50, alignItems:'center'},styles.headerBackground]}>
				<View style={ [{flex: 2}]}>
					<Text style={[styles.headerItem,styles.leftMargin]}>{i18n.t('account-name')}</Text>
				</View>
				<View style={[ {flex: 1.5}]}>
					<Text style={[styles.headerItem]}>{i18n.t('telephone-number')}</Text>
				</View>
				<View style={ [ {flex: 2}]}>
					<Text style={[styles.headerItem]}>{i18n.t('address')}</Text>
				</View>
				<View style={ [{flex: .75}]}>
					<Text style={[styles.headerItem]}>{i18n.t('balance')}</Text>
				</View>
				<View style={ [{flex: 1}]}>
					<Text style={[styles.headerItem]}>{i18n.t('channel')}</Text>
				</View>
			</View>
		);
	};

	onPressItem = (item) =>{
		console.log("_onPressItem");
		this.props.customerActions.CustomerSelected(item);
		this.props.orderActions.ClearOrder()
		this.props.customerBarActions.ShowHideCustomers(0)
		this.props.toolbarActions.ShowScreen("main")
	};

	getRow = (item, index, separators) =>{
		// console.log("getRow -index: " + index)
		let isSelected = false;
		if( this.props.selectedCustomer && this.props.selectedCustomer.customerId === item.customerId){
			console.log("Selected item is " + item.customerId);
			isSelected = true;
		}
		if( true ) {
			return (
				<View style={[this.getRowBackground(index, isSelected), {flex: 1, flexDirection: 'row', height:50, alignItems:'center'}]}>
					<View style={{flex: 2}}>
						<Text style={[styles.baseItem, styles.leftMargin]}>{item.name}</Text>
					</View>
					<View style={{flex: 1.5}}>
						<Text style={[styles.baseItem]}>{item.phoneNumber}</Text>
					</View>
					<View style={{flex: 2}}>
						<Text style={[styles.baseItem]}>{item.address}</Text>
					</View>
					<View style={{flex: .75}}>
						<Text style={[styles.baseItem]}>{item.dueAmount.toFixed(2)}</Text>
					</View>
					<View style={{flex: 1}}>
						<Text style={[styles.baseItem]}>{this.getCustomerSalesChannel(item)}</Text>
					</View>
				</View>
			);
		}else{
			return (<View/>);
		}
	};

	getRowBackground = (index, isSelected) =>{
		if( isSelected ){
			return styles.selectedBackground;
		}else {
			return ((index % 2) === 0) ? styles.lightBackground : styles.darkBackground;
		}
	};

	getCustomerSalesChannel(item) {
		this.salesChannels = PosStorage.getSalesChannelsForDisplay();
		try {
			for( let i = 0; i < this.salesChannels.length; i++ ) {
				if (this.salesChannels[i].id === item.salesChannelId) {
					return this.salesChannels[i].displayName;
				}
			}
		}catch( error ) {
			return "Walk-up";
		}
	}

    render() {
		console.log("props", this.props)
        if (this.props.reportType === "reminders") {
            return (
                <View style={{ flex: 1 }}>
                    <DateFilter />
                    <View style={{ flex: .7, backgroundColor: 'white', marginLeft: 10, marginRight: 10, marginTop: 10, }}>
						<View style = {styles.titleText}>
							<View style = {styles.leftHeader}>
								<Text style = {styles.titleItem}>Reminders</Text>
							</View>
						</View>
						<FlatList
							ListHeaderComponent = {this.showHeader}
 							data={this.props.reminderData}
							 renderItem={({item, index, separators}) => (
								<TouchableHighlight
									onPress={() => this.onPressItem(item)}
									onShowUnderlay={separators.highlight}
									onHideUnderlay={separators.unhighlight}>
									{this.getRow(item, index, separators)}
								</TouchableHighlight>
							)}
							keyExtractor={item => item.customerId}
						/>
					</View>
                </View>
            ) 
        } else {
            return null
        } 
        
    }
}

function mapStateToProps(state, props) {
	return { 
		dateFilter: state.reportReducer.dateFilter,
		reportType: state.reportReducer.reportType,
		reminderData: state.reportReducer.reminderData,
		selectedCustomer: state.customerReducer.selectedCustomer,

	};
}

function mapDispatchToProps(dispatch) {
	return {
		reportActions:bindActionCreators(reportActions, dispatch),
		customerActions:bindActionCreators(customerActions, dispatch),
		toolbarActions:bindActionCreators(toolBarActions, dispatch),
		customerBarActions:bindActionCreators(customerBarActions, dispatch),
		orderActions:bindActionCreators(orderActions, dispatch)
		};
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersReport);

// const mockReminders = [{
// 	"customerId": "e657e840-ba9e-11e8-8503-2d48aaf8eceb",
// 	"name": "Mock Customer 1",
// 	"customerTypeId":2,
// 	"siteId": 2,
// 	"salesChannelId":2,
// 	"phoneNumber":"4444444444",
// 	"dueAmount":0,
// 	"address":"South africa",
// },
// {
// 	"customerId": "e657e840-ba9e-11e8-8503-2d48aaf8ecef",
// 	"name": "Mock Customer 4",
// 	"customerTypeId":2,
// 	"siteId": 2,
// 	"salesChannelId":2,
// 	"phoneNumber":"4444444444",
// 	"dueAmount":0,
// 	"address":"South kampala",
// },
// {
// 	"customerId": "e657e840-ba9e-11e8-8503-2d48aaf8ecec",
// 	"name": "Mock Customer 2",
// 	"customerTypeId":2,
// 	"siteId": 2,
// 	"salesChannelId":2,
// 	"phoneNumber":"4444444444",
// 	"dueAmount":0,
// 	"address":"South europe",
// },
// {
// 	"customerId": "e657e840-ba9e-11e8-8503-2d48aaf8eced",
// 	"name": "Mock Customer 3",
// 	"customerTypeId":2,
// 	"siteId": 2,
// 	"salesChannelId":2,
// 	"phoneNumber":"4444444444",
// 	"dueAmount":0,
// 	"address":"South asia",
// }]

const styles = StyleSheet.create({
	baseItem:{
		fontSize:18
	},
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
	lightBackground:{
		backgroundColor:'white'
	},
	darkBackground:{
		backgroundColor:'#F0F8FF'
	},
	selectedBackground:{
		backgroundColor:'#9AADC8'
	}
});
