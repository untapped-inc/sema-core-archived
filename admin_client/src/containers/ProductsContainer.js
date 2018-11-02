import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Products from '../components/Products';
import { getProducts } from '../actions/ProductActions';

class ProductsContainer extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return <Products products={this.props.products} />;
  }
}

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  getProducts: bindActionCreators(getProducts, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsContainer);
