import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import CustomerList from "./CustomerList";


class AllScreen extends React.Component {
	render() {
		return (
			<CustomerList filter='all' customerInfo={this.props.screenProps}/>
		);
	}
}

class WalkupScreen extends React.Component {
	render() {
		return (
			<CustomerList filter='walkup' customerInfo={this.props.screenProps}/>
		);
	}
}

class ResellerScreen extends React.Component {
	render() {
		return (
			<CustomerList filter='reseller' customerInfo={this.props.screenProps}/>
		);
	}
}
class CreditScreen extends React.Component {
	render(){
		return (
			<CustomerList filter='credit' customerInfo={this.props.screenProps} />
		);
	}
}

export const CustomerViews = createBottomTabNavigator({
	All: {
		screen: AllScreen,
		navigationOptions: {
			tabBarLabel: 'All',
			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "All-Tab " + scene.navigation.state.routeName;
				console.log(output);
			},
		},
	},
	Walkup: {
		screen: WalkupScreen,
		navigationOptions: {
			tabBarLabel: 'Walkup',
			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "Walkup-Tab " + scene.navigation.state.routeName;
				console.log(output);
			},
		},

	},

	Reseller: {
		screen: ResellerScreen,
		navigationOptions: {
			tabBarLabel: 'Reseller',
			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "Reseller-Tab " + scene.navigation.state.routeName;
				console.log(output);
			},
		},

	},
	Credit: {
		screen: CreditScreen,
		navigationOptions: {
			tabBarLabel: 'Credit',
			activeTintColor: '#80ff80',
			inactiveTintColor: '#008000',
			inactiveBackgroundColor: 'white',

			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "Credit-Tab " + scene.navigation.state.routeName;
				console.log(output);
			},
		},

	},

},{
	swipeEnabled: true,
	tabBarOptions: {
		activeTintColor: '#F0F0F0',
		activeBackgroundColor: "#18376A",
		inactiveTintColor: '#000000',
		inactiveBackgroundColor: 'white',
		style: { borderTopColor:'black', borderTopWidth:3},
		// style: {padding:0, margin:0, borderColor:'red', borderWidth:5, justifyContent: 'center', alignItems: 'center' },
		labelStyle: {
			fontSize: 18,
			padding: 12
		},
		tabStyle: {justifyContent: 'center', alignItems: 'center'},
		// tabStyle: {
		// 	borderBottomColor: '#ebcccc',
		// 	width: 100,
		// 	height:600,
		// 	// backgroundColor:"yellow"
		// }
	}
});




