import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import Checkbox from './Checkbox';

const CheckboxGroup = ({
  name,
  input,
  className,
  label,
  meta,
  options,
  ...rest
}) => {
  const { onChange, onBlur } = input;
  const inputValue = input.value;

  const renderOptions = options =>
    options.map((option, index) => (
      <Checkbox
        key={index}
        onChange={handleChange}
        value={option.value}
        label={option.label}
      />
    ));

  const handleChange = event => {
    const arr = [...inputValue];
    if (event.target.checked) {
      arr.push(event.target.value);
    } else {
      arr.splice(arr.indexOf(event.target.value), 1);
    }
    onBlur(arr);
    return onChange(arr);
  };

  return (
    <FormGroup
      controlId={name}
      validationState={meta.invalid && meta.touched ? 'error' : null}
    >
      <ControlLabel>{label}</ControlLabel>

      {meta.invalid &&
        meta.touched &&
        meta.error && <HelpBlock>{meta.error}</HelpBlock>}

      {renderOptions(options)}
    </FormGroup>
  );
};

export default CheckboxGroup;
