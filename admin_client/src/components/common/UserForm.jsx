import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import get from 'lodash/get';
import TextField from './TextField';
import CheckboxGroup from './CheckboxGroup';
import roles from '../constants/roles';

import { validateUserForm } from './validate';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired
};

const defaultProps = {
  handleSubmit: () => {},
  roles
};

const UserForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name="firstName" component={TextField} label="First Name" />
    <Field name="lastName" component={TextField} label="Last Name" />
    <Field name="email" component={TextField} label="Email" />
    <Field name="username" component={TextField} label="Username" />
    <Field
      name="password"
      component={TextField}
      label="Password"
      type="password"
    />
    <Field name="role" component={CheckboxGroup} label="Role" options={roles} />
  </form>
);

UserForm.propTypes = propTypes;
UserForm.defaultProps = defaultProps;

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    id: get(ownProps, 'user[0].id', ''),
    firstName: get(ownProps, 'user[0].firstName', ''),
    lastName: get(ownProps, 'user[0].lastName', ''),
    email: get(ownProps, 'user[0].email', ''),
    username: get(ownProps, 'user[0].username', ''),
    role: get(ownProps, 'user[0].role', []).map(r => r.code)
  }
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'userForm',
    validate: validateUserForm
  })(UserForm)
);
