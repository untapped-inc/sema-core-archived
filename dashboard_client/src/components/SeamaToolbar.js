import React, { Component } from 'react';
import { Navbar, Label, Nav,NavDropdown,MenuItem } from 'react-bootstrap';
import 'App.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
	kioskActions,
	waterOperationsActions,
	salesActions,
	authActions,
	healthCheckActions
} from 'actions';
import { withRouter } from 'react-router'

const menuStyle = {};

const ImageStyle = {
	resize:"both",
	width:"180px",
	height:"60px",
};

const LabelStyleLeft = {
	float:"left",
	background:"none",
	marginTop:"15px",
	fontSize:"14px",
	fontWeight: "normal"
};
const LabelStyleRight = {
	float:"right",
	background:"none",
	marginTop:"15px",
	fontSize:"14px",
	fontWeight: "normal"
};

class SeamaToolbar extends Component {
	constructor(props, context) {
		super(props, context);
		console.log("SeamaToolbar-constructor");
		this.handleSelect = this.handleSelect.bind(this);
		this.buildMenuItems = this.buildMenuItems.bind(this);
		this.logOut = this.logOut.bind(this);

		this.state = {
			title: "--Kiosks--"
		};
	}

	handleSelect(eventKey){
		console.log(eventKey, this.props.kiosk.kiosks[eventKey].name);

		this.setState({title: this.props.kiosk.kiosks[eventKey].name});

		let kioskParams = {kioskID:this.props.kiosk.kiosks[eventKey].id};
		const previousKioskID = this.props.kiosk.selectedKiosk ?
			this.props.kiosk.selectedKiosk.kioskID :
			null;

		if(kioskParams.kioskID !== previousKioskID) {
			kioskParams.groupby = "month";	// TODO - Should be derived from toolbar time/date filter UI
			this.props.kioskActions.selectKiosk(kioskParams);
			this.props.waterOperations.loaded = false;
			this.props.sales.loaded = false;
			switch (this.props.location.pathname) {
				case "/":
					this.props.waterOperationsActions.fetchWaterOperations(kioskParams);
					break;
				case "/Sales":
					this.props.salesActions.fetchSales(kioskParams);
					break;
				default:
					console.log("Not implemented:", this.props.location.pathname);
			}
		}
	};

	buildMenuItems(){
		let menuItems = [];
		if( this.props.kiosk.kiosks){
			let keys = Object.keys(this.props.kiosk.kiosks);
			for( let i = 0; i < keys.length; i++ ){
				let kiosk = this.props.kiosk.kiosks[keys[i]];
				 menuItems.push(<MenuItem eventKey={keys[i]} key={keys[i]} style={menuStyle}>{kiosk.name}</MenuItem>);
			}
		}
		return menuItems;
	}
	logOut (){
		console.log("logout");
		this.props.authActions.logout();
	}

	render() {
		return (
			<div className="SeamaNavToolbar" >
				<Navbar bsStyle="inverse" style={{marginBottom:"0px",
					borderRadius: 0}}>
					<Navbar.Header >
						<Navbar.Brand>
							{<img src={require('images/dlo_image.png')} alt="logo" style={ImageStyle} />}
						</Navbar.Brand>
					</Navbar.Header>
					<Label style={LabelStyleLeft}>
						Version {this.props.Version}
					</Label>
					<Label style={LabelStyleLeft}>
						Kiosk
					</Label>
					<Nav >
						<NavDropdown title={this.state.title} onSelect={this.handleSelect} id="basic-nav-dropdown" >
							{this.buildMenuItems()}
						</NavDropdown>
					</Nav>
					<Label style={LabelStyleRight}> Server: {this.showServer()}</Label>
					<Label onClick={this.logOut} href="#" style={LabelStyleRight}>
						<a href="/">Logout</a>
					</Label>
					<Label style={LabelStyleRight}>
						{ `${this.props.currentUser.first_name}
						${this.props.currentUser.last_name}`}
					</Label>
				</Navbar>
			</div>
		);
	}
	showServer () {
		if (this.props.healthCheck.server === "Ok") {
			return this.props.healthCheck.version;
		}
		return this.props.healthCheck.server;
	}
}

function mapStateToProps(state) {
	return {
		logState: state.auth.LogState,
		currentUser: state.auth.currentUser,
		healthCheck: state.healthCheck,
		kiosk:state.kiosk,
		waterOperations:state.waterOperations,
		sales:state.sales
	};
}

function mapDispatchToProps(dispatch) {
	return {
		authActions: bindActionCreators(authActions, dispatch),
		healthCheckActions: bindActionCreators(healthCheckActions, dispatch),
		kioskActions: bindActionCreators(kioskActions, dispatch),
		waterOperationsActions: bindActionCreators(waterOperationsActions, dispatch),
		salesActions: bindActionCreators(salesActions, dispatch)
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SeamaToolbar));

