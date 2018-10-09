import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

const TextField = ({ id, label, input, meta, ...props }) => (
  <FormGroup
    controlId={id}
    validationState={meta.invalid && meta.touched ? 'error' : null}
  >
    <ControlLabel>{label}</ControlLabel>
    <FormControl {...input} {...props} />
    {meta.invalid &&
        meta.touched &&
        meta.error && <HelpBlock>{meta.error}</HelpBlock>}
  </FormGroup>
  );

export default TextField;
