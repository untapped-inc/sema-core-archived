import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import healthCheck from './HealthcheckReducer';
import auth from './AuthReducer';
import userReducer from './UserReducer';
import productReducer from './ProductReducer';
import selectedProductReducer from './SelectedProductReducer';
import loadingReducer from './LoadingReducer';
import alertReducer from './AlertReducer';
import productCategoryReducer from './ProductCategory';
import kioskReducer from './Kiosk';
import salesChannelReducer from './SalesChannel';
import waterOperations from './WaterOperationsReducer';
import kiosk from './KioskReducer';
import volume from './VolumeReducer';
import sales from './SalesReducer';
import customer from './CustomerReducer';
import dateFilter from './DateFilterReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['auth', 'healthCheck']
};

const kioskPersistConfig = {
	key: 'kiosk',
	storage,
	stateReconciler: autoMergeLevel2,
	blacklist: ['selectedKiosk']
};

const rootReducer = combineReducers({
  healthCheck,
  auth,
  users: userReducer,
  form: formReducer,
  products: productReducer,
  selectedProduct: selectedProductReducer,
  loading: loadingReducer,
  alert: alertReducer,
  productCategories: productCategoryReducer,
  kiosks: kioskReducer,
  kiosk: persistReducer(kioskPersistConfig, kiosk),
  volume,
	customer,
	sales,
  waterOperations,
  salesChannels: salesChannelReducer,
  dateFilter
});

export default persistReducer(rootPersistConfig, rootReducer);
