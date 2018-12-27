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

class FeedParameters extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{ borderWidth: 0 }}>
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>Temperature</Text>,
                            <TextInput
                                ref={ref => {
                                    this.temperature = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='10 - 30'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>°C</Text>
                        ]}
                        style={[styles.table_row, { backgroundColor: '#F0F8FF' }]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>pH</Text>,
                            <TextInput
                                ref={ref => {
                                    this.ph = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='5 - 9'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>-</Text>
                        ]}
                        style={[styles.table_row]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>Total Alkalinity</Text>,
                            <TextInput
                                ref={ref => {
                                    this.totalAlkalinity = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='1 - 800'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>mg/L CaCO3 (ppm)</Text>
                        ]}
                        style={[styles.table_row, { backgroundColor: '#F0F8FF' }]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>Total Hardness</Text>,
                            <TextInput
                                ref={ref => {
                                    this.totalHardness = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='1 - 800'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>mg/L CaCO3 (ppm)</Text>
                        ]}
                        style={[styles.table_row]}
                        textStyle={styles.table_row_text}
                    />
                    <Row
                        data={[
                            <Text style={styles.parameter_name}>Total Dissolved Solids</Text>,
                            <TextInput
                                ref={ref => {
                                    this.totalDissolvedSolids = ref;
                                }}
                                style={styles.table_input}
                                underlineColorAndroid="transparent"
                                placeholder='0 - 1300'
                                keyboardType="numeric"/>,
                            <Text style={styles.parameter_unit}>mg/L (ppm)</Text>
                        ]}
                        style={[styles.table_row, { backgroundColor: '#F0F8FF' }]}
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedParameters);

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
