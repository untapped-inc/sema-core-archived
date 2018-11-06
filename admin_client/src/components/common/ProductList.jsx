import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import Image from 'react-bootstrap/lib/Image';
import 'react-table/react-table.css';
import './style.css';

const propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onEditClick: PropTypes.func
};

const defaultProps = {
  columns: [],
  data: [],
  onEditClick: () => {}
};

class ProductList extends React.Component {
  renderImage(row) {
    const image = row.original.base64Image || '';
    return (
      <Image
        className="product-image"
        src={`data:image/png;base64,${image}`}
        responsive
      />
    );
  }

  renderName(row) {
    const productId = row.original.id || '';
    const productName = row.original.name || '';
    return <Link to={`/products/${productId}`}>{productName}</Link>;
  }

  render() {
    const productColumns = [
      {
        Header: 'Thumbnail',
        Cell: row => this.renderImage(row)
      },
      {
        Header: 'Name',
        Cell: row => this.renderName(row)
        // accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Category',
        accessor: 'category_id'
      },
      {
        Header: 'SKU',
        accessor: 'sku'
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: d => `${d.priceAmount} ${d.priceCurrency}`
      },
      {
        Header: 'Quantity',
        accessor: 'quantity'
      }
    ];

    return (
      <ReactTable
        data={this.props.products}
        columns={productColumns}
        className="-striped -highlight"
        defaultPageSize={20}
        loading={this.props.loading}
      />
    );
  }
}

ProductList.propTypes = propTypes;
ProductList.defaultProps = defaultProps;

export default ProductList;
