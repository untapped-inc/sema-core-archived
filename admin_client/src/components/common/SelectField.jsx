import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib/';

const SelectField = ({ id, label, input, options, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...input} {...props}>
      <option />
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormControl>
  </FormGroup>
);

export default SelectField;
