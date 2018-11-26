import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Grid,
  Row,
  Col,
  Table,
  ControlLabel,
  FormGroup
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Field, FieldArray, arrayPush, reduxForm } from 'redux-form';
import get from 'lodash/get';
import TextField from './TextField';
import SelectField from './SelectField';
import KioskDropdown from './KioskDropdown';
import SalesChannelDropdown from './SalesChannelDropdown';
import ImageUpload from './ImageUpload';
import Button from './Button';
import ProductCategoryDropdown from './ProductCategoryDropdown';
import units from '../constants/units';
import currency from '../constants/currency';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const defaultProps = {
  handleSubmit: () => {}
};

const renderPricing = ({ fields, meta: { error, submitFailed } }) => {
  const renderRow = fields.map((field, index) => (
    <tr key={index}>
      <td>
        <Field name="kiosk" component={KioskDropdown} size="small" />
      </td>
      <td>
        <Field
          name="salesChannel"
          component={SalesChannelDropdown}
          size="small"
        />
      </td>
      <td>
        <Field name="priceAmount" component={TextField} size="small" />
      </td>
      <td>
        <Field
          name="priceCurrency"
          component={SelectField}
          options={currency}
          size="small"
        />
      </td>
      <td>
        <Field name="costOfGoods" component={TextField} size="small" />
      </td>
    </tr>
  ));
  return renderRow;
};

const ProductForm = ({ handleSubmit, ...props }) => (
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
            component={SelectField}
            horizontal
            options={currency}
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
            component={SelectField}
            options={units}
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
      <Row>
        <Col md={2}>
          <FormGroup>
            <ControlLabel style={{ width: '100%', paddingRight: '10px' }}>
              Pricing
            </ControlLabel>
          </FormGroup>
        </Col>
        <Col md={8}>
          <Button
            onClick={() => {
              props.addKiosk('productForm', 'kiosks', {});
            }}
            buttonText="Add Kiosk"
            buttonSize="xsmall"
          />
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Kiosk</th>
                <th>Sales Channel</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Cost of Goods</th>
              </tr>
            </thead>
            <tbody>
              <FieldArray name="kiosks" component={renderPricing} />
            </tbody>
          </Table>
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

export default connect(
  mapStateToProps,
  { addKiosk: arrayPush }
)(
  reduxForm({
    form: 'productForm',
    enableReinitialize: true
  })(ProductForm)
);
