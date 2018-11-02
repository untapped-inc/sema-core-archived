import { handleActions, combineActions } from 'redux-actions';
import {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure
} from '../actions/ProductActions';

// State
const initialState = [];
const productReducer = handleActions(
  {
    [combineActions(getProductsRequest, getProductsFailure)]: state => state,
    [getProductsSuccess]: (state, { payload: { products } }) => products
  },
  initialState
);

export default productReducer;
