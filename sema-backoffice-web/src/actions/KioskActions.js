import { axiosService } from '../services';
import { createActions } from 'redux-actions';
import * as allActions from './ActionTypes';
export const LOAD_KIOSKS = 'LOAD_KIOSKS';

const { loadKiosks } = createActions({
  LOAD_KIOSKS: payload => payload
});

function receiveKiosks(data) {
	console.log("receiveSeamaKiosks - ", data.toString())
	return {type: allActions.RECEIVE_KIOSKS, kiosks: data};
}

function selectKiosk(kiosk) {
	console.log("selectKiosk - ", kiosk)
	return {type: allActions.SELECT_KIOSK, selectedKiosk: kiosk};
}

function fetchKiosks() {
	return (dispatch) => {
		axiosService('/sema/kiosks')
			.then(response => {
				if(response.status === 200){
					dispatch(receiveKiosks(response.data))
				}else{
					dispatch(receiveKiosks({kiosks: []}))

				}
			})
			.catch(function(error){
				// This means the service isn't running.
				dispatch(receiveKiosks({kiosks: []}))
			});
	};
}

const getKiosks = () => dispatch =>
  axiosService
    .get('/sema/kiosks')
    .then(response => dispatch(loadKiosks(response.data)))
    .catch(err => {
      throw err;
    });

export const kioskActions = {
	getKiosks,
	fetchKiosks,
	selectKiosk,
	receiveKiosks,
	loadKiosks
};
