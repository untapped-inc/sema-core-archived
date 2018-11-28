import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Col
} from 'react-bootstrap';

const TextField = ({
  name,
  label,
  input,
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
        <FormControl {...input} {...props} />
      </Col>
    ) : (
      <Col sm={12}>
        <FormControl {...input} {...props} />
      </Col>
    )}

    {meta.invalid &&
      meta.touched &&
      meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
);

export default TextField;
