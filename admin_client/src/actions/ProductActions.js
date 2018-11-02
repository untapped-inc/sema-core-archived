import { axiosService } from 'services';
import { createActions } from 'redux-actions';

// Actions
export const {
  getProductsRequest,
  getProductsSuccess,
  getProductsFailure
} = createActions(
  {
    GET_PRODUCTS_SUCCESS: payload => payload
  },
  'GET_PRODUCTS_REQUEST',
  'GET_PRODUCTS_FAILURE'
);

// Action creators
export const getProducts = () => dispatch => {
  dispatch(getProductsRequest());
  return axiosService
    .get('/sema/admin/products')
    .then(response => dispatch(getProductsSuccess(response.data)))
    .catch(err => dispatch(getProductsFailure(err)));
};
