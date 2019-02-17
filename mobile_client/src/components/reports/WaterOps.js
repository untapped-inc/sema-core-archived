import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";

import SamplingSitesForm from '../forms/SamplingSitesForm';

class WaterOps extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.reportType === "waterOps") {
            return (
                !this.props.waterOpConfigs.mapping.length ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View> :
                    <View style={styles.container}>
                        <SamplingSitesForm/>
                    </View>
            );
        }

        return null;
    }
}

function mapStateToProps(state, props) {
    return {
        reportType: state.reportReducer.reportType,
        waterOpConfigs: state.waterOpsReducer.configs
    };
}

//Connect everything
export default connect(mapStateToProps)(WaterOps);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    }
});