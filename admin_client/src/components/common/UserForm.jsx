import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, submit } from 'redux-form';
import TextField from './TextField';
import SelectField from './SelectField';
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
    <Field name="role" component={SelectField} label="Role" options={roles} />
  </form>
);

UserForm.propTypes = propTypes;
UserForm.defaultProps = defaultProps;

export default reduxForm({
  form: 'userForm', // a unique identifier for this form
  validate: validateUserForm,
  onSubmit: submit
})(UserForm);
