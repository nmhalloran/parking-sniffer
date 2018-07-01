import { combineReducers } from "redux";
import spotsReducer from './spots_reducer';
import reservationsReducer from './reservation_reducer';


const entitiesReducer = combineReducers({
    reservations: reservationsReducer,
    spots: spotsReducer
});

export default entitiesReducer;