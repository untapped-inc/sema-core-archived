import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import get from 'lodash/get';
import TextField from './TextField';
import ImageUpload from './ImageUpload';
import ProductCategoryDropdown from './ProductCategoryDropdown';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const defaultProps = {
  handleSubmit: () => {}
};

const ProductForm = ({ handleSubmit }) => (
  <Form horizontal onSubmit={handleSubmit}>
    <Grid>
      <Row>
        <Col md={8}>
          <Field
            name="id"
            label="Product ID"
            component={TextField}
            horizontal
            disabled
          />
          <Field
            name="name"
            label="Product Name"
            component={TextField}
            horizontal
          />
          <Field name="sku" label="SKU" component={TextField} horizontal />
          <Field
            name="description"
            label="Product Description"
            component={TextField}
            horizontal
          />
          <Field
            name="category"
            label="Product Category"
            component={ProductCategoryDropdown}
            horizontal
          />
          <Field
            name="priceAmount"
            label="Price"
            component={TextField}
            horizontal
          />
          <Field
            name="priceCurrency"
            label="Currency"
            component={TextField}
            horizontal
          />
          <Field
            name="minQuantity"
            label="Minimum Quantity"
            component={TextField}
            horizontal
          />
          <Field
            name="maxQuantity"
            label="Maximum Quantity"
            component={TextField}
            horizontal
          />
          <Field
            name="unitsPerProduct"
            label="Units per Product"
            component={TextField}
            horizontal
          />
          <Field
            name="unitMeasurement"
            label="Units of Measurement"
            component={TextField}
            horizontal
          />
          <Field
            name="costOfGoods"
            label="Cost of Goods"
            component={TextField}
            horizontal
          />
        </Col>
        <Col md={4}>
          <Field name="image" label="image" component={ImageUpload} />
        </Col>
      </Row>
    </Grid>
  </Form>
);

ProductForm.propTypes = propTypes;
ProductForm.defaultProps = defaultProps;

const mapStateToProps = state => ({
  initialValues: {
    id: get(state, 'selectedProduct.id', ''),
    name: get(state, 'selectedProduct.name', ''),
    sku: get(state, 'selectedProduct.sku', ''),
    description: get(state, 'selectedProduct.description', ''),
    category: get(state, 'selectedProduct.category', ''),
    priceAmount: get(state, 'selectedProduct.priceAmount', ''),
    priceCurrency: get(state, 'selectedProduct.priceCurrency', ''),
    minQuantity: get(state, 'selectedProduct.minQuantity', ''),
    maxQuantity: get(state, 'selectedProduct.maxQuantity', ''),
    unitsPerProduct: get(state, 'selectedProduct.unitsPerProduct', ''),
    unitMeasurement: get(state, 'selectedProduct.unitMeasurement', ''),
    costOfGoods: get(state, 'selectedProduct.costOfGoods', ''),
    image: get(state, 'selectedProduct.base64Image', '')
  }
});
export default connect(mapStateToProps)(
  reduxForm({
    form: 'productForm',
    enableReinitialize: true
  })(ProductForm)
);
