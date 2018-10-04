import React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap/lib/";

const SelectField = ({ id, label, input, options, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...input} {...props}>
      <option />
      {options.map(option => (
        <option key={option.key} value={option.key}>
          {option.value}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

export default SelectField;
