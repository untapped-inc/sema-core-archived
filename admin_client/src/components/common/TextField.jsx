import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Col from 'react-bootstrap/lib/Col';

const TextField = ({
  name,
  label,
  input,
  meta,
  horizontal,
  size,
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
        </Col>
      )
    ) : (
      <Col componentClass={ControlLabel} sm={12}>
        {label}
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
