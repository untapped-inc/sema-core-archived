import React, {Component}  from "react";
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from "react-native";
import ProductList from "./ProductList";
import {createBottomTabNavigator} from "react-navigation";
import {bindActionCreators} from "redux";
import * as OrderActions from "../../actions/OrderActions";
import {connect} from "react-redux";
import OrderResellerScreen from './OrderResellerScreen';
import OrderWalkupScreen from './OrderWalkupScreen';





export const OrderProductScreen = createBottomTabNavigator({
	Walkup: {
		screen: OrderWalkupScreen,
		navigationOptions: {
			tabBarLabel: 'Walkup',
			tabBarVisible: false,
			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "Walkup-Tab " + scene.navigation.state.routeName;
				console.log(output);
			},
		},

	},

	Reseller: {
		screen: OrderResellerScreen,
		navigationOptions: {
			tabBarLabel: 'Reseller',
			tabBarVisible: false,
			tabBarOnPress: (scene, jumpToIndex) => {
				let output = "Reseller-Tab " + scene.navigation.state.routeName;
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
	}
});

