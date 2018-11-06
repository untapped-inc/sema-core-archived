import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from './TextField';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const defaultProps = {
  handleSubmit: () => {}
};

const ProductForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name="name" label="Product Name" component={TextField} />
    <Field name="sku" label="SKU" component={TextField} />
    <Field
      name="description"
      label="Product Description"
      component={TextField}
    />
    <Field name="category" label="Product Category" component={TextField} />
    <Field name="priceAmount" label="Price" component={TextField} />
    <Field name="priceCurrency" label="Currency" component={TextField} />
    <Field name="minQuantity" label="Minimum Quantity" component={TextField} />
    <Field name="maxQuantity" label="Maximum Quantity" component={TextField} />
    <Field
      name="unitsPerProduct"
      label="Units per Product"
      component={TextField}
    />
    <Field
      name="unitMeasurement"
      label="Units of Measurement"
      component={TextField}
    />
    <Field name="costOfGoods" label="Cost of Goods" component={TextField} />
  </form>
);

ProductForm.propTypes = propTypes;
ProductForm.defaultProps = defaultProps;

export default connect()(
  reduxForm({
    form: 'productForm'
  })(ProductForm)
);
