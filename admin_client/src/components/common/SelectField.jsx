import React from 'react';
import { FormGroup, ControlLabel, FormControl, Col } from 'react-bootstrap';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const SelectField = ({
  name,
  label,
  input,
  options,
  meta,
  horizontal,
  ...props
}) => (
  <FormGroup
    controlId={name}
    validationState={meta.invalid && meta.touched ? 'error' : null}
  >
    {horizontal ? (
      <Col componentClass={ControlLabel} sm={3}>
        {label}
      </Col>
    ) : (
      <ControlLabel>{label}</ControlLabel>
    )}
    {horizontal ? (
      <Col sm={9}>
        <FormControl componentClass="select" {...input} {...props}>
          <option />
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormControl>
      </Col>
    ) : (
      <FormControl componentClass="select" {...input} {...props}>
        <option />
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormControl>
    )}

    {meta.invalid &&
      meta.touched &&
      meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
);

export default SelectField;
