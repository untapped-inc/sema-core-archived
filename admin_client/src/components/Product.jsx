import React, { Component } from 'react';
import ProductForm from './common/ProductForm';

class Product extends Component {
  render() {
    console.log('Product page');
    return (
      <div className="">
        <ProductForm />
      </div>
    );
  }
}

export default Product;
