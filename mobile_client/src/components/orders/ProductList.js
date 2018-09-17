import React, {Component}  from "react";
import { View, Text, FlatList, TouchableHighlight, StyleSheet, Image, TouchableOpacity } from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import * as ProductActions from '../../actions/ProductActions';
import * as OrderActions from "../../actions/OrderActions";
import PosStorage from "../../database/PosStorage";

class ProductList extends Component {
	constructor(props) {
		super(props);
		// this.state = {columnWidth :1, refresh:false};
	}
	componentDidMount() {
		console.log("ProductList = Mounted");
		// this.props.productActions.LoadProducts();
	}

	render() {
		return (
			<View  style={styles.container} >
				<FlatList
					data={this.prepareData()}
					// extraData={this.state.refresh}
					renderItem={({item, index, separators}) => (
						<TouchableOpacity
							onPress={() => this.onPressItem(item)}
							onShowUnderlay={separators.highlight}
							onHideUnderlay={separators.unhighlight}>
							{this.getItem(item, index, separators)}

						</TouchableOpacity>
					)}
					keyExtractor={item => item.productId}
					numColumns={4}
					horizontal={false}
				/>
			</View>
		);
	}

	// find_dimesions = (layout) =>{
	// 	const {x, y, width, height} = layout;
	// 	// setTimeout( () => {
	// 	// 	this.setState({columnWidth: width/3});
	// 	// 	this.setState({refresh: !this.state.refresh});
	// 	// 	console.log( "find_dimesions -state.columnWidth " + this.state.columnWidth + " width: " + width);
	// 	// }, 5);
    //
	// };

	getItem = (item, index, separators) =>{
		// console.log( "getItem -Product cell width" + this.state.columnWidth)
		return (
			<View style={[this.getItemBackground(index ), {flex:1, height:this.props.viewWidth/4, width:this.props.viewWidth/4}]}>
				<Image
					source={{uri: this.getImage(item) }}
					// resizeMode='center'
					resizeMethod ='scale'
					style={{flex:1}}>
				</Image>
				<Text style={[styles.imageLabel,this.getLabelBackground()]}>{item.description}{'\n'}{this.getItemPrice(item)} ush</Text>
			</View>
		);
	};

	prepareData = () =>{
		return this.props.products;
		// return [{id:1, data:"one"}, {id:2, data:"two"}, {id:3, data:"three"}, {id:4, data:"four"}, {id:5, data:"five"}];
	};
	getImage = (item)=>{
		if( item.base64encodedImage.startsWith('data:image')){
			return item.base64encodedImage;
		}else {
			return 'data:image/png;base64,' + item.base64encoded_image
		}
	};

	onPressItem = (item) =>{
		console.log("onPressItem");
		this.props.orderActions.AddProductToOrder(item, 1);
	};
	getItemBackground = (index ) =>{
		return ((index % 2) === 0) ? styles.lightBackground : styles.darkBackground;
	};

	getLabelBackground = () =>{
		if( this.props.filter === "walkup") {
			return styles.imageLabelBackgroundWalkup;
		}else{
			return styles.imageLabelBackgroundReseller;
		}
	};
	getItemPrice = (item) =>{
		let salesChannel = PosStorage.getSalesChannelFromName(this.props.filter);
		if( salesChannel ){
			let productMrp = PosStorage.getProductMrps()[PosStorage.getProductMrpKeyFromIds(item.productId, salesChannel.id)];
			if( productMrp ){
				return productMrp.priceAmount;
			}
		}
		return item.priceAmount;	// Just use product price
	};

}

function mapStateToProps(state, props) {
	return {
		products: state.productReducer.products

	};
}

function mapDispatchToProps(dispatch) {
	return { productActions: bindActionCreators(ProductActions, dispatch),
			orderActions: bindActionCreators(OrderActions,dispatch)};
}



export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

const styles = StyleSheet.create({
	container:{
		flex:1,
		borderColor:'#ABC1DE',
		borderTopWidth:5
	},

	imageLabel:{
		fontWeight:'bold',
		paddingTop:5,
		paddingBottom:5,
		textAlign: 'center',
		color:'white',
		// backgroundColor: '#2858a7'

	},
	imageLabelBackgroundWalkup: {
		backgroundColor: '#2858a7'
	},
	imageLabelBackgroundReseller: {
		backgroundColor: '#812629'
	},

	lightBackground:{
		backgroundColor:'#ABC1DE'
	},
	darkBackground:{
		backgroundColor:'#ABC1DE'
	},

});
