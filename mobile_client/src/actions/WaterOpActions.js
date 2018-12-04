export const SET_WATER_OP_CONFIGS = 'SET_WATER_OP_CONFIGS';

export function setWaterOpConfigs(waterOpConfigs) {
	console.log("setWaterOpConfigs - action");

	// Create an array looking like this

	// const mapping = [
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

	const samplingSites = waterOpConfigs.samplingSites;
	const parameters = waterOpConfigs.parameters;
	const idMapping = waterOpConfigs.samplingSiteParameterMapping;

	// const samplingSiteParameterMapping = idMapping
	// 	.reduce((final, next) => {
	// 		let currentSamplingSite = samplingSites.reduce((samplingSite, nextSamplingSite) => {
	// 			if (nextSamplingSite.id === next.sampling_site_id) return nextSamplingSite;
	// 		}, null);
	// 		// get current parameter
	// 		let currentParameter = parameters.reduce((parameter, nextParameter) => {
	// 			if(nextParameter.id === next.parameter_id) return nextParameter;
	// 		}, null);

	// 		// check if samplingSite is already in final
	// 		let currentMappingIndex = final.reduce((mapping, next, index) => {
	// 			if (next.id === currentSamplingSite.id) return index;
	// 		}, -1);

	// 		// If it is in final, push current parameter into its parameters array
	// 		if (currentMappingIndex !== -1 && final[currentMappingIndex]) {
	// 			final[currentMappingIndex].parameters.push(currentParameter);
	// 		} else { 
	// 			// If it's not in final, create a new object for this sampling site
	// 			// looking like this
	// 			// const newSamplingSite = {
	// 			// 	name: samplingSite.name,
	// 			// 	id: samplingSite.id,
	// 			// 	parameters: [{...currentParameter}]
	// 			// }
	// 			final.push({
	// 				name: currentSamplingSite.name,
	// 				id: currentSamplingSite.id,
	// 				parameters: [{...currentParameter}]
	// 			});
	// 		}
	// 		return final;
	// 	}, []);

	const finalData = {
		samplingSites,
		parameters,
		idMapping
	}

	return (dispatch) => { dispatch({ type: SET_WATER_OP_CONFIGS, data: finalData }); };
}