import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductCategories } from '../../actions/ProductActions';
import SelectField from './SelectField';

class ProductCategoryDropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.props.getProductCategories();
  }

  render() {
    return <SelectField {...this.props} options={this.state.categories} />;
  }
}

export default connect(
  null,
  { getProductCategories }
)(ProductCategoryDropdown);
