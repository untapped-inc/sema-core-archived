import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    ToastAndroid
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import ParameterInputs from './inputs/ParameterInputs';
import PosStorage from '../../database/PosStorage';
import i18n from '../../app/i18n';

class SamplingSitesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.booleanInputParamNames = [
            'Odor',
            'Color',
            'Taste'
        ];

        this._getInitialValues = this._getInitialValues.bind(this);
    }

    _getValidationSchema() {
        const limitlessParamNames = [
            'Volume',
            'Flow Rate',
            'Color',
            'Odor',
            'Taste'
        ];

        return this.props.waterOpConfigs.mapping.reduce((finalObject, samplingSite) => {
            samplingSite.data
                .filter(param => param.manual.data[0]) // only manually entered parameters
                .forEach(parameter => {
                if (limitlessParamNames.includes(parameter.name)) {
                    if (this.booleanInputParamNames.includes(parameter.name)) {
                        finalObject[`${samplingSite.id}-${parameter.id}`] = Yup.boolean();
                    } else {
                        finalObject[`${samplingSite.id}-${parameter.id}`] = Yup.number()
                            .typeError(i18n.t('must-be-a-number', {what: parameter.name}))
                            .required(i18n.t('is-a-required-parameter', {what: parameter.name}))
                    }
                } else {
                    finalObject[`${samplingSite.id}-${parameter.id}`] = Yup.number()
                        .typeError(i18n.t('must-be-a-number', {what: parameter.name}))
                        .required(i18n.t('is-a-required-parameter', {what: parameter.name}));
                        // We added those initially, thinking it was a good idea to enforce the minimum and maximum
                        // values of the parameters, but it doesn't make sense to do so because it's about logging
                        // the data, not about entering the RIGHT data
                        // .lessThan(parameter.maximum + 1, `${parameter.name} must be less than ${parameter.maximum + 1}`)
                        // .moreThan(parameter.minimum - 1, `${parameter.name} must be greater than ${parameter.minimum - 1}`)
                }
            });
            return finalObject;
        }, {});
    }

    _getInitialValues() {
        return this.props.waterOpConfigs.mapping.reduce((finalObject, samplingSite) => {
            samplingSite.data
                .filter(param => param.manual.data[0])
                .forEach(parameter => {
                if (this.booleanInputParamNames.includes(parameter.name)) {
                    finalObject[`${samplingSite.id}-${parameter.id}`] = false;
                } else {
                    finalObject[`${samplingSite.id}-${parameter.id}`] = '';
                }
            });
            return finalObject;
        }, {});
    }

    _getSamplingSiteTitle(name) {
        if (name.includes(':')) {
            return name.substr(2);
        }
        return name;
    }

    _handleSubmit(values, actions) {
        PosStorage
            .saveWaterOps(values)
            .then(() => {
              actions.resetForm();
              return ToastAndroid.show(i18n.t('data-saved-successfully'), ToastAndroid.LONG);
            });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Formik
                    initialValues={this._getInitialValues()}
                    validationSchema={Yup.object().shape(this._getValidationSchema())}
                    onSubmit={this._handleSubmit}>
                    {
                        ({ values, handleSubmit, setFieldValue, errors, touched, handleBlur, isValid, isSubmitting }) => (
                            <React.Fragment>
                                <ScrollView contentContainerStyle={styles.samplingSiteListContainer}>
                                    {
                                        this.props.waterOpConfigs.mapping.map((samplingSite, idx) => {
                                            return (
                                                <React.Fragment key={idx}>
                                                    <Text style={styles.samplingSiteTitle}>{this._getSamplingSiteTitle(samplingSite.name)}</Text>
                                                    <ParameterInputs
                                                        parameters={samplingSite.data}
                                                        setFieldValue={setFieldValue}
                                                        handleBlur={handleBlur}
                                                        values={values}
                                                        touched={touched}
                                                        errors={errors}
                                                        samplingSiteId={samplingSite.id}
                                                    />
                                                </React.Fragment>
                                            );
                                        })
                                    }
                                </ScrollView>

                                <View style={styles.submitButtonBar}>
                                    <Button
                                        title={i18n.t('submit').toUpperCase()}
                                        mode="contained"
                                        underlayColor="lime"
                                        buttonStyle={styles.submitButton}
                                        loading={isSubmitting}
                                        disabled={!isValid}
                                        style={styles.submitButton}
                                        disabledTitleStyle={styles.disabledSubmitButtonText}
                                        titleStyle={styles.submitButtonText}
                                        onPress={handleSubmit}
                                    />
                                </View>
                            </React.Fragment>
                        )
                    }
                </Formik>
            </View>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        waterOpConfigs: state.waterOpsReducer.configs
    };
};

//Connect everything
export default connect(mapStateToProps)(SamplingSitesForm);

const styles = StyleSheet.create({
    samplingSiteTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#86939e'
    },

    samplingSiteListContainer: {
        padding: 20
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
    },

    disabledSubmitButtonText: {
    }
});