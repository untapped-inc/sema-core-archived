import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Product from '../components/Product';
import { getProduct } from '../actions/ProductActions';

const propTypes = {
  product: PropTypes.object
};
const defaultProps = {
  product: {}
};

class ProductPage extends Component {
  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getProduct(id);
  }

  render() {
    return <Product />;
  }
}

ProductPage.propTypes = propTypes;
ProductPage.defaultProps = defaultProps;

const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = dispatch => ({
  getProduct: bindActionCreators(getProduct, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPage);
