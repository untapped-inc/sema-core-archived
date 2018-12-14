import Events from "react-native-simple-events";

export const SET_WATER_OP_CONFIGS = 'SET_WATER_OP_CONFIGS';

// Creates and returns an array looking like this

	// const samplingSiteParameterMapping = [
	// 	{
	// 		name: 'A:Feed',
	//		id: 2,
	// 		parameters: [
	// 			{
	//				// Only add active parameters
	// 				active: 1,
	// 				id: 1,
	// 				is_ok_not_ok: 1,
	// 				...
	// 			}
	// 		]
	// 	}
	// ]
export function setWaterOpConfigs(waterOpConfigs) {
	console.log("setWaterOpConfigs - action");

	const samplingSites = waterOpConfigs.samplingSites;
	const parameters = waterOpConfigs.parameters;
	const idMapping = waterOpConfigs.samplingSiteParameterMapping;

	const samplingSiteParameterMapping = idMapping
		.reduce((finalMapping, next) => {
			// get current sampling site
			let currentSamplingSite = samplingSites.reduce((samplingSite, nextSamplingSite) => {
				if (nextSamplingSite.id === next.sampling_site_id) return nextSamplingSite;
				return samplingSite;
			}, null);
			
			// get current parameter
			let currentParameter = parameters.reduce((parameter, nextParameter) => {
				if(nextParameter.id === next.parameter_id) return nextParameter;
				return parameter;
			}, null);

			// check if samplingSite is already in finalMapping
			let currentMappingIndex = finalMapping.reduce((mapping, next, index) => {
				if (next.id === currentSamplingSite.id) return index;
				return mapping;
			}, -1);

			// If it is in finalMapping, push current parameter into its parameters array
			if (currentMappingIndex !== -1 && finalMapping[currentMappingIndex]) {
				finalMapping[currentMappingIndex].parameters.push(currentParameter);
			} else { 
				// If it's not in finalMapping, create a new object for this sampling site
				finalMapping.push({
					name: currentSamplingSite.name,
					id: currentSamplingSite.id,
					parameters: [{...currentParameter}]
				});
			}
			return finalMapping;
		}, []);

	// Sort sampling sites alphabetically
	samplingSiteParameterMapping.sort((a, b) => {
		if (a.name < b.name) return -1;
		return 1;
	})

	Events.trigger('WaterOpsConfigReady', samplingSiteParameterMapping[0]);

	return (dispatch) => {
		dispatch({
			type: SET_WATER_OP_CONFIGS,
			data: samplingSiteParameterMapping
		});
	};
}