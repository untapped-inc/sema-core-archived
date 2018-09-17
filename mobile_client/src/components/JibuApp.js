import React, {Component} from "react";
import {
    StyleSheet,
    View,
	NetInfo,
} from 'react-native';

import Toolbar from './Toolbar';
import {CustomerViews} from './customers/CustomerViews'
import CustomerBar from "./customers/CustomerBar";
import OrderView from "./orders/OrderView"
import Login from './Login';
import CustomerEdit from './customers/CustomerEdit';
import Settings from './Settings';

import {bindActionCreators} from 'redux';

import {connect} from "react-redux";
import * as CustomerActions from '../actions/CustomerActions';
import * as NetworkActions from '../actions/NetworkActions';
import * as SettingsActions from '../actions/SettingsActions';
import * as ProductActions from '../actions/ProductActions';


import PosStorage from "../database/PosStorage";
import Synchronization from "../services/Synchronization";
import SiteReport from "./reports/SiteReport";
import Communications from "../services/Communications";
import Events from "react-native-simple-events";
import * as ToolbarActions from "../actions/ToolBarActions";

console.ignoredYellowBox = ['Warning: isMounted','Setting a timer'];

class JibuApp extends Component {
	constructor(props) {
		super(props);

		this.state = {synchronization: {productsLoaded:false},
					  isConnected: false};
		this.posStorage = PosStorage;
	}
	componentDidMount() {
		console.log("JibuApp - componentDidMount enter");
		this.posStorage.initialize( false ).then( (isInitialized) => {
			console.log("JibuApp - componentDidMount - Storage initialized");

			let settings = this.posStorage.getSettings();
			this.props.settingsActions.setSettings( settings );
			// this.props.settingsActions.setConfiguration(configuration);

			Communications.initialize( settings.semaUrl, settings.site, settings.user, settings.password);
			Communications.setToken( settings.token );
			Communications.setSiteId(settings.siteId);

			// let timeout = 200;
			if (isInitialized ) {
				// Data already configured
				this.props.customerActions.setCustomers(this.posStorage.getCustomers());
				this.props.productActions.setProducts(this.posStorage.getProducts());
			}
			// if (isInitialized && this.posStorage.getCustomers().length > 0) {
			// 	// Data already configured
			// 	timeout = 20000;	// First sync after a bit
			// }

			Synchronization.initialize(
				PosStorage.getLastCustomerSync(),
				PosStorage.getLastProductSync(),
				PosStorage.getLastSalesSync());
			Synchronization.setConnected(this.props.network.isNWConnected );

			// Determine the startup screen as follows:
			// If the settings contain url, site, username, password, token and customerTypes, proceed to main screen
			// If the settings contain url, site, username, password, customerTypes but NOT token, proceed to login screen, (No token => user has logged out)
			// Otherwise proceed to the settings screen.
			// Note: Without customerTypes. Customers can't be created since Customer creation requires both salesChannelIds AND customerTypes
			if( this.isLoginComplete() ){
				console.log("JibuApp - Auto login - All settings exist");
				this.props.toolbarActions.SetLoggedIn(true);
				this.props.toolbarActions.ShowScreen("main");
				console.log("JibuApp - starting synchronization");
				Synchronization.scheduleSync( );
			}else if( this.isSettingsComplete() ){
				console.log("JibuApp - login required - No Token");
				this.props.toolbarActions.SetLoggedIn(false);
			}else{
				console.log("JibuApp - Settings not complete");
				this.props.toolbarActions.SetLoggedIn(true);	// So that the login screen doesn't show
				this.props.toolbarActions.ShowScreen("settings");

			}

		});
		NetInfo.isConnected.fetch().then(isConnected => {
			console.log('Network is ' + (isConnected ? 'online' : 'offline'));
			this.props.networkActions.NetworkConnection(isConnected);
			Synchronization.setConnected( isConnected );
		});
		NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
		Events.on('CustomersUpdated', 'customerUpdate1', this.onCustomersUpdated.bind(this) );
		Events.on('ProductsUpdated', 'productUpdate1', this.onProductsUpdated.bind(this) );

		console.log("JibuApp = Mounted-Done");

	}
	componentWillUnmount(){
		Events.rm('CustomersUpdated', 'customerUpdate1') ;
		Events.rm('ProductsUpdated', 'productUpdate1') ;
		NetInfo.isConnected.removeEventListener( 'connectionChange',this.handleConnectivityChange );
	}

	onCustomersUpdated = () =>{
		this.props.customerActions.setCustomers(this.posStorage.getCustomers());
	};

	onProductsUpdated = () =>{
		this.props.productActions.setProducts(this.posStorage.getProducts());
	};

	handleConnectivityChange = isConnected => {
		console.log("handleConnectivityChange: " + isConnected);
		this.props.networkActions.NetworkConnection(isConnected);
		Synchronization.setConnected( isConnected );
	};

	render() {
        return (this.getLoginOrHomeScreen());
    }



	getLoginOrHomeScreen(){
		console.log("getLoginOrHomeScreen - isLoggedIn: " +this.props.showScreen.isLoggedIn);
		if( this.props.showScreen.isLoggedIn ) {
			return (
				<View style={{flex: 1}}>
					<Toolbar/>
					<ScreenSwitcher currentScreen={this.props.showScreen} Jibu={this}/>
				</View>

			);
		}else{
			return(
				<Login/>
			);
		}
	}

	isLoginComplete(){
		let settings = this.posStorage.getSettings();
		console.log("isLoginComplete " + JSON.stringify(settings));
		if( settings.semaUrl.length > 0 &&
			settings.site.length > 0 &&
			settings.user.length > 0 &&
			settings.password.length > 0 &&
			settings.token.length > 0 &&
			this.posStorage.getCustomerTypes().length > 0){
			console.log("All settings valid - Proceed to main screen");
			return true;
		}
		return false;
	}
	isSettingsComplete(){
		let settings = this.posStorage.getSettings();
		if( settings.semaUrl.length > 0 &&
			settings.site.length > 0 &&
			settings.user.length > 0 &&
			settings.password.length > 0 &&
			settings.token.length == 0 &&
			this.posStorage.getCustomerTypes().length > 0){
			return true;
		}
		return false;
	}

}
class ScreenSwitcher extends Component {

	render() {
		if (this.props.currentScreen.screenToShow === "main") {
			return (
				<View style={{ flex: 1 }}>
					<CustomerBar/>
					<ViewSwitcher Jibu={this.props.Jibu}/>
				</View>

			);
		} else if (this.props.currentScreen.screenToShow === "report") {
			return (<View style={{flex:1}}>
				<SiteReport/>
			</View>);
		} else if (this.props.currentScreen.screenToShow === "newCustomer") {
			return (<CustomerEdit isEdit = {false}/>);
		} else if (this.props.currentScreen.screenToShow === "editCustomer") {
			return (<CustomerEdit isEdit = {true}/>);
		} else if (this.props.currentScreen.screenToShow === "settings") {
			return (<Settings/>);
		}
	}
}

class ViewSwitcher extends Component {

	render() {
		if (this.props.Jibu.props.showView.showNewOrder ) {
			return (<OrderView/>)
		} else {
			return (<CustomerViews screenProps={{parent: this.props.Jibu}}/>)
		}
	}
}

function mapStateToProps(state, props) {
	return {
		selectedCustomer: state.customerReducer.selectedCustomer,
		customers: state.customerReducer.customers,
		network: state.networkReducer.network,
		showView: state.customerBarReducer.showView,
		showScreen: state.toolBarReducer.showScreen,
		settings:state.settingsReducer.settings

	};
}

function mapDispatchToProps(dispatch) {
	return {
		customerActions:bindActionCreators(CustomerActions, dispatch),
		productActions:bindActionCreators(ProductActions, dispatch),
		networkActions:bindActionCreators(NetworkActions, dispatch),
		toolbarActions:bindActionCreators(ToolbarActions, dispatch),
		settingsActions:bindActionCreators(SettingsActions, dispatch)};
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(JibuApp);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
