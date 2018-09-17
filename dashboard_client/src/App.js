import React, { Component } from 'react';
import './App.css';
import './css/SeamaNav.css'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
	authActions,
	kioskActions,
	waterOperationsActions,
	salesActions
} from 'actions';
import { history } from './utils';
import {
	Router
} from 'react-router-dom';
import {
	SemaContainer,
	SemaLogin
} from 'components';

class App extends Component {
	componentWillMount() {
		let self = this;

		this.unlisten = history.listen((location, action) => {
			console.log("on route change", self);
			switch( location.pathname ){
				case "/":
					if( ! this.props.waterOperations.loaded && this.props.kiosk.selectedKiosk && this.props.kiosk.selectedKiosk.kioskID  ){
						this.props.waterOperationsActions.fetchWaterOperations(this.props.kiosk.selectedKiosk);
					}
					break;
				case "/Sales":
					// Hack to force the google map to update.
					let self = this;

					setTimeout(()=> {
						self.props.salesActions.forceUpdate();
					}, 100);

					if( ! this.props.sales.loaded && this.props.kiosk.selectedKiosk && this.props.kiosk.selectedKiosk.kioskID ) {
						this.props.kiosk.selectedKiosk.groupby = "month";	// // TODO - Should be derived from toolbar time/date filter UI
						this.props.salesActions.fetchSales(this.props.kiosk.selectedKiosk);
					}
					break;
				default:
					break;
			}
		});
	}

	componentWillUnmount() {
		this.unlisten();
	}

	render() {
		return (
			<Router history={ history }>
				{this.props.auth.currentUser ?
					<SemaContainer /> :
					<SemaLogin />
				}
			</Router>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		authActions: bindActionCreators(authActions, dispatch),
		kioskActions: bindActionCreators(kioskActions, dispatch),
		waterOperationsActions: bindActionCreators(waterOperationsActions, dispatch),
		salesActions: bindActionCreators(salesActions, dispatch)
	};
}

function mapStateToProps(state) {
	return {
		kiosk: state.kiosk,
		waterOperations: state.waterOperations,
		sales: state.sales,
		auth: state.auth
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
