import AppDispatcher from '../dispatcher/app-dispatcher';
import Constants from '../constants/constants';

let TrainTimetableActions = {
    getTrainTimetable(latitude, longitude) {
        let request = new XMLHttpRequest();
        request.open('GET', `/api/trains?latitude=${latitude}&longitude=${longitude}`, true);
        request.onreadystatechange = function() {
            if (request.readyState === 4 && request.status === 200){
                AppDispatcher.viewHandleAction({
                    actionType: Constants.SET_TRAIN_TIMETABLE,
                    data      : request.responseText
                });
            } else {
                AppDispatcher.viewHandleAction({
                    actionType: Constants.SERVER_ERROR,
                    data      : null
                });
            }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send();
    }
};

export default TrainTimetableActions;
