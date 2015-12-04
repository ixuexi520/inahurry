import 'isomorphic-fetch';
import * as types from 'constants/ActionTypes';

let fetchSuccessed = (responData) => {
    return {
        type: types.SET_TRAIN_TIMETABLE,
        data: responData.data
    };
};

let fetchFailed = () => {
    return {
        type: types.SERVER_ERROR
    };
};

async function fetchTrainTimetable(latitude, longitude, type) {
    let api = type === 'twtraffic' ? `/api/twtraffic?latitude=${latitude}&longitude=${longitude}` : `/api/thsrc?latitude=${latitude}&longitude=${longitude}`;
    return (dispatch) => {
        try {
            let response = await fetch(api);
            let data = await response.json();
            fetchSuccessed(data.data);
        } catch(e) {
            fetchFailed(e);
        }
    };
}

export function getTrainTimetable(latitude, longitude, type = 'twtraffic') {
    return (dispatch) => {
        return dispatch(fetchTrainTimetable(latitude, longitude, type));
    };
}

