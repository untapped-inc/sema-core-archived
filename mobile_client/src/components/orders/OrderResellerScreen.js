import React, {Component}  from "react";
import { View, Dimensions, Animated } from "react-native";
import ProductList from "./ProductList";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as OrderActions from "../../actions/OrderActions";

class OrderResellerScreen extends Component {
	constructor(props) {
		super(props);
		let {height, width} = Dimensions.get('window');
		console.log("OrderResellerScreen Constructor: Width-" +width);
		// Empirically we know that this view has flex of 1 and the view beside it,
		// (OrderSummaryScreen has a flex of .6 This makes the width of this view 1/1.6 * screen width
		// Since there is no way to dynamilcally determine view width until the layout is complete, use
		// this to set width. (Note this will break if view layout changes
		this.viewWidth = 1/1.6 * width;
		this.state =  {
			fadeAnim: new Animated.Value(-this.viewWidth),  // Initial value for sliding in from left
		}
	}

	componentDidMount() {
		this.props.navigation.addListener('didFocus', () => {
			console.log("OrderWalkupScreen-Focused");
			this.props.orderActions.SetOrderChannel("reseller");
		});
		Animated.timing(                  // Animate over time
			this.state.fadeAnim,            // The animated value to drive
			{
				toValue: 0,                   // Animate to opacity: 1 (opaque)
				duration: 250,
				useNativeDriver: true,
			}
		).start();
	}
	render() {
		let { fadeAnim } = this.state;
		return (
			<Animated.View style = {{flex:1, backgroundColor:'#ABC1DE', transform:[{translateX:fadeAnim}]}}>
				<ProductList filter='reseller' viewWidth ={this.viewWidth} />
			</Animated.View>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		products: state.orderReducer.products,
		channel: state.orderReducer.channel};
}
function mapDispatchToProps(dispatch) {
	return {orderActions: bindActionCreators(OrderActions,dispatch)};
}

export default  connect(mapStateToProps, mapDispatchToProps)(OrderResellerScreen);
