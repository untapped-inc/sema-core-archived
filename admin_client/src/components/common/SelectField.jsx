import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap/lib/';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const SelectField = ({ name, label, input, options, meta, ...props }) => (
  <FormGroup
    controlId={name}
    validationState={meta.invalid && meta.touched ? 'error' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl componentClass="select" {...input} {...props}>
      <option />
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </FormControl>
    {meta.invalid &&
      meta.touched &&
      meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
);

export default SelectField;
