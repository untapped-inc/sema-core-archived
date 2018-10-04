import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "./TextField";
import SelectField from "./SelectField";

const UserForm = props => {
  const { handleSubmit } = props;
  return (
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
      <Field
        name="role"
        component={SelectField}
        label="Role"
        options={[{ admin: "admin" }]}
      />
    </form>
  );
};

export default reduxForm({
  form: "userForm" // a unique identifier for this form
})(UserForm);
