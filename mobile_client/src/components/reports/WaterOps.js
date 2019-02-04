import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SectionList,
    ScrollView,
    TouchableHighlight,
    ToastAndroid,
    TextInput,
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

class Parameter extends Component {
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
            dateTime: moment.tz(new Date(Date.now()), moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss'),
            formData: []
        };

        this.getParamLabel = this.getParamLabel.bind(this);
        this.updateState = this.updateState.bind(this);
        this.renderParameter = this.renderParameter.bind(this);
    }

    render() {
        if (this.props.reportType === "waterOps") {
            return (
                !this.props.waterOpConfigs.mapping.length ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size='large' />
                    </View> :
                    <View style={styles.container}>
                        <View style={styles.samplingSiteListContainer}>
                            <ScrollView>
                                <SectionList
                                    contentContainerStyle={styles.samplingSiteList}
                                    scrollEnabled={false}
                                    renderItem={this.renderParameter}
                                    renderSectionHeader={this.renderSamplingSite}
                                    sections={this.props.waterOpConfigs.mapping}
                                    keyExtractor={(item, index) => index}
                                />
                            </ScrollView>
                        </View>

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

    renderParameter({ item, index, section }) {
        // We only get active and manually entered parameters
        // TODO: use Sequelize on the backend
        // We tried a mysql2 solution about getting BIT type columns as booleans
        // but that didn't work out. Here's a tmp solution for this:
        if (!item.active.data[0] || !item.manual.data[0]) {
            return null;
        }

        return (
            <View
                key={index}
                style={styles.paramContainer}
            >
                <Text style={styles.paramLabel}>{this.getParamLabel(item)}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.paramInput}
                        placeholder={item.minimum !== null ? `${item.minimum} - ${item.maximum}` : ''}
                        onChangeText={(text) => this.updateState(index, text)}
                    />
                </View>
            </View>
        );
    }

    getParamLabel(item) {
        if (item.minimum === null && item.unit === null) {
            return `${item.name}:`;
        } else if (item.minimum === null && item.unit !== null) {
            return `${item.name} (${item.unit}):`;
        } else if (item.minimum !== null && item.unit === null) {
            return `${item.name} (${item.minimum} - ${item.maximum}):`;
        }

        return `${item.name} (${item.minimum} - ${item.maximum} ${item.unit}):`;
    }

    updateState(index, text) {
        const formData = [...this.state.formData];
        formData[index] = text;
        this.setState({ formData });
    }

    renderSamplingSite({ section: { name } }) {
        return <Text style={styles.samplingSiteTitle}>{name}</Text>
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
    paramContainer: {
        padding: 15
    },

    inputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        width: 450,
		borderColor: "#2858a7",
        backgroundColor: 'white',
    },

    paramLabel: {
        color: '#111',
        marginBottom: 5
    },

    paramInput: {
		alignSelf: 'center',
        width: 450
    },

    samplingSiteTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },

    samplingSiteListContainer: {
        flex: 1
    },

    samplingSiteList: {
        padding: 15
    },

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