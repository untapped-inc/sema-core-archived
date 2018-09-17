
import { combineReducers } from 'redux';
import customerReducer from "./CustomerReducer";
import networkReducer from "./NetworkReducer";
import customerBarReducer from "./CustomerBarReducer";
import productReducer from "./ProductReducer";
import orderReducer from "./OrderReducer";
import toolBarReducer from "./ToolbarReducer";
import reportReducer from "./ReportReducer";
import settingsReducer from "./SettingsReducer";

// Combine all the reducers
const RootReducer = combineReducers({
	customerReducer,
	networkReducer,
	customerBarReducer,
	productReducer,
	orderReducer,
	toolBarReducer,
	reportReducer,
	settingsReducer

});

export default RootReducer;
