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
  size,
  required,
  ...props
}) => (
  <FormGroup
    controlId={name}
    validationState={meta.invalid && meta.touched ? 'error' : null}
    bsSize={size}
  >
    {horizontal ? (
      label && (
        <Col componentClass={ControlLabel} sm={3}>
          {label}
          {required ? ' *' : ''}
        </Col>
      )
    ) : (
      <Col componentClass={ControlLabel} sm={12}>
        {label}
        {required ? ' *' : ''}
      </Col>
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
      <Col sm={12}>
        <FormControl componentClass="select" {...input} {...props}>
          <option />
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </FormControl>
      </Col>
    )}

    {meta.invalid &&
      meta.touched &&
      meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
);

export default SelectField;
