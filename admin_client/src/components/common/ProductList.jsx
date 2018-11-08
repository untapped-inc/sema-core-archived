import React from 'react';
import PropTypes from 'prop-types';
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
  constructor(props) {
    super(props);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick(row) {
    const productId = row.original.id || '';
    this.props.history.push(`/products/${productId}`);
  }

  renderProduct(row) {
    const image = row.original.base64Image || '';
    const productName = row.original.name || '';
    return (
      <div className="product">
        <Image
          className="product-image"
          src={`data:image/png;base64,${image}`}
          responsive
        />
        <span className="product-name">{productName}</span>
      </div>
    );
  }

  render() {
    const productColumns = [
      {
        Header: 'Product',
        className: 'sticky',
        headerClassName: 'sticky',
        Cell: row => this.renderProduct(row)
      },
      {
        Header: 'Description',
        accessor: 'description'
      },
      {
        Header: 'Category',
        accessor: 'category'
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
        getTrProps={(state, rowInfo, column, instance) => ({
          onClick: e => this.handleRowClick(rowInfo)
        })}
      />
    );
  }
}

ProductList.propTypes = propTypes;
ProductList.defaultProps = defaultProps;

export default ProductList;
