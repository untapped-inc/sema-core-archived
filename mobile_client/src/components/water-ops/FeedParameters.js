import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    Modal,
    FlatList,
    ScrollView,
    TextInput
} from 'react-native';

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ToolBarActions from "../../actions/ToolBarActions";
import { Table, Row } from 'react-native-table-component';

import i18n from '../../app/i18n';

class FeedParameters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tableHead: ['', 'Value', 'Unit'],
            tableData: null,
            temperature: null
        };

        this.parameterRows = [
            <Text style={styles.parameter_name}>Temperature</Text>,
            <View>
                <TextInput
                    style={styles.table_input}
                    underlineColorAndroid="transparent"
                    placeholder="10 - 30"
                    keyboardType="numeric"
                    value={this.state.temperature}
                    onChangeText={temperature => {this.setState({temperature})}} />
            </View>,
            <Text style={styles.parameter_unit}>0C</Text>
        ];
    }

    render() {
        return (
            <View style={styles.table_container}>
                <Table borderStyle={{ borderWidth: 0 }}>
                    <Row data={this.state.tableHead} style={styles.table_header} textStyle={styles.table_header_text} />
                </Table>
                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 0 }}>
                        {
                            parameterRows.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.table_row, index % 2 && { backgroundColor: '#F0F8FF' }]}
                                    textStyle={styles.table_row_text}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>
            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);

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

    table_container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    table_header: {
        height: 40,
        backgroundColor: '#ABC1DE'
    },

    table_header_text: {
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    table_row: {
        height: 70
    },

    table_row_text: {
        marginLeft: 15
    }
});
