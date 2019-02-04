import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SectionList,
    Image,
    TouchableHighlight,
    Alert,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as reportActions from "../../actions/ReportActions";
import * as receiptActions from "../../actions/ReceiptActions";

import i18n from '../../app/i18n';
import moment from 'moment-timezone';
import PosStorage from '../../database/PosStorage';
import Events from 'react-native-simple-events';

import DatePicker from 'react-native-datepicker';
import { Button } from 'react-native-elements';

class SamplingSite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: false
        };
    }

    render() {
        <View>
            <FlatList
                data={this.prepareData()}
                renderItem={this.renderSamplingSite.bind(this)}
                keyExtractor={(item, index) => item.id}
                ItemSeparatorComponent={this.renderSeparator}
                extraData={this.state.refresh}
            />
        </View>
    }

    prepareData() {

    }

    renderSeparator() {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: '#ddd',
                    width: '100%'
                }}
            >
            </View>
        )
    }
}

class WaterOps extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateTime: moment.tz(new Date(Date.now()), moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
        }
    }

    render() {
        if (this.props.reportType === "waterOps") {
            return (
                !this.props.waterOpConfigs.mapping.length ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View> :
                    <View style={styles.container}>
                        <DatePicker
                            style={styles.date_picker}
                            date={this.state.dateTime}
                            mode="datetime"
                            placeholder="select date"
                            format="YYYY-MM-DD HH:mm:ss"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            iconSource={require('../../images/calendar-icon.png')}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(dateTime) => { this.setState({ dateTime }) }}
                        />

                        <SectionList
                            renderItem={({ item }) => {
                                console.log(item);
                                // We only get active and manually entered parameters
                                // TODO: use Sequelize on the backend
                                // We tried a mysql2 solution about getting BIT type columns as booleans
                                // but that didn't work out. Here's a tmp solution for this:
                                if (!item.active.data[0] || !item.manual.data[0]) {
                                    return null;
                                }
                                return <Text key={item.id}>{item.name}</Text>
                            }}
                            renderSectionHeader={({ section: { name } }) => (
                                <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                            )}
                            sections={this.props.waterOpConfigs.mapping}
                            keyExtractor={(item, index) => item.id}
                        />

                        <View style={styles.submitButtonBar}>
                            <TouchableHighlight
                                style={styles.submitButton}
                                onPress={this.onSubmit}
                                underlayColor="lime"
                                >
                                <Text style={styles.submitButtonText}>{'Submit'.toUpperCase()}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
            );
        }

        return null;
    }

    onSubmit() {
        console.log('Submitted');
    }

}

function mapStateToProps(state, props) {
    return {
        reportType: state.reportReducer.reportType,
        localReceipts: state.receiptReducer.localReceipts,
        remoteReceipts: state.receiptReducer.remoteReceipts,
        customers: state.customerReducer.customers,
        products: state.productReducer.products,
        waterOpConfigs: state.waterOpsReducer.configs
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reportActions: bindActionCreators(reportActions, dispatch),
        receiptActions: bindActionCreators(receiptActions, dispatch)
    };
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(WaterOps);

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
    },

    submitButtonBar: {
        backgroundColor: '#18376A',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: 10
    },

    submitButton: {
        height: 40,
        padding: 15,
        borderRadius: 2,
        backgroundColor: "green",
        justifyContent: 'center',
        alignItems: 'center'
    },

    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});