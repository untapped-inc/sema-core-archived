import { SET_WATER_OP_CONFIGS } from "../actions/WaterOpActions"

let initialState = {
    configs: {
        samplingSiteParameterMapping: null
    }
};

const waterOpsReducer = (state = initialState, action) => {
	console.log(`waterOpsReducer: ${action.type}`);
    switch (action.type) {
        case SET_WATER_OP_CONFIGS:
            const configs = {
                samplingSiteParameterMapping: action.data
            };
            
            return {
                ...state,
                configs
            }

		default:
			return state;
	}
};

export default waterOpsReducer;
