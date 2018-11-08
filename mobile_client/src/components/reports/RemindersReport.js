import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as reportActions from "../../actions/ReportActions";
import DateFilter from './DateFilter'

class RemindersReport extends Component {
    render() {
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
			 reportType: state.reportReducer.reportType
	};
}

function mapDispatchToProps(dispatch) {
	return {reportActions:bindActionCreators(reportActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(RemindersReport);

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
