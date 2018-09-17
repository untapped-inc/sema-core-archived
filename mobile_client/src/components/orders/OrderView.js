import React from "react";
import { View, Button, StyleSheet} from 'react-native';
import {OrderProductScreen} from "./OrderProductScreen";
import OrderPaymentScreen from "./OrderPaymentScreen";
import OrderSummaryScreen from "./OrderSummaryScreen";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as OrderActions from "../../actions/OrderActions";

class OrderView extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return this.displayView();
	}
	displayView (){
		return (
			<View style = { styles.orderView}>
				{this.getProductScreen()}
				{this.getPaymentScreen()}
				<OrderSummaryScreen/>
			</View>
		);
	}
	getProductScreen(){
		return this.props.flow.page === 'products' ? <OrderProductScreen/> : null;
	}
	getPaymentScreen(){
		return this.props.flow.page === 'payment' ? <OrderPaymentScreen/> : null;
	}

}
function mapStateToProps(state, props) {
	return { flow: state.orderReducer.flow};
}
function mapDispatchToProps(dispatch) {
	return {orderActions: bindActionCreators(OrderActions,dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderView);

const styles = StyleSheet.create({
	orderView: {
		flex:1,
		backgroundColor:"#ABC1DE",
		flexDirection:'row'}
});
