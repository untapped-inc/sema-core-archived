
import {combineReducers} from 'redux';
import healthCheck from './HealthcheckReducer';
import auth from './AuthReducer';
import kiosk from './KioskReducer';
import waterOperations from './WaterOperationsReducer';
import sales from './SalesReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const rootPersistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2,
	whitelist: [
		'auth',
		'healthCheck'
	]
};

// We want the persistor to persist the kiosks list but not
// the selected kiosk (for now)
// Because when it saves the selected kiosk, the sales and water
// quality pages still fetch data even tho the user hasn't selected
// any kiosk.
// TODO: Fix the bug above
const kioskPersistConfig = {
	key: 'kiosk',
	storage,
	stateReconciler: autoMergeLevel2,
	blacklist: ['selectedKiosk']
};

const rootReducer = combineReducers({
    healthCheck,
	auth,
	kiosk: persistReducer(kioskPersistConfig, kiosk),
	waterOperations,
	sales
});

export default persistReducer(rootPersistConfig, rootReducer);
