import React, { Component } from "react";
import {
    StyleSheet,
    ScrollView,
    TextInput,
    Text
} from 'react-native';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ToolBarActions from "../../actions/ToolBarActions";
import { Table, Row } from 'react-native-table-component';

import i18n from '../../app/i18n';

class WaterTreatmentUnitParameters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 0 }}>
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>PRE-FILTER PRESSURE IN</Text>,
                            <TextInput
                                ref={ref => {
                                    this.preFilterPressureIn = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='0 - 100'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>PSI</Text>
                        ]}
                        style={[styles.table_row, { backgroundColor: '#F0F8FF' }]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>PRE-FILTER PRESSURE OUT</Text>,
                            <TextInput
                                ref={ref => {
                                    this.preFilterPressureOut = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='0 - 100'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>PSI</Text>
                        ]}
                        style={[styles.table_row]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>MEMBRANE FEED PRESSURE</Text>,
                            <TextInput
                                ref={ref => {
                                    this.membraneFeedPressure = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='0 - 300'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>PSI</Text>
                        ]}
                        style={[styles.table_row, { backgroundColor: '#F0F8FF' }]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>Flow Rate</Text>,
                            <TextInput
                                ref={ref => {
                                    this.flowRate = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>lpm</Text>
                        ]}
                        style={[styles.table_row]}
                        textStyle={styles.table_row_text}
                    />
                </Table>
            </ScrollView>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        waterOpConfigs: state.waterOpsReducer.configs
    };
}


function mapDispatchToProps(dispatch) {
    return {
        toolbarActions: bindActionCreators(ToolBarActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WaterTreatmentUnitParameters);

const styles = StyleSheet.create({
    parameter_name: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    parameter_unit: {
        alignSelf: 'center'
    },

    table_input: {
        borderBottomWidth: 1,
        borderBottomColor: '#2858a7'
    },

    table_row: {
        height: 70
    },

    table_row_text: {
        marginLeft: 15
    }
});
