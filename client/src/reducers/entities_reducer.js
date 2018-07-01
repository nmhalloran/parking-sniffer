import { combineReducers } from "redux";
import spotsReducer from './spots_reducer';
import vehiclesReducer from './vehicles_reducer';


const entitiesReducer = combineReducers({

    spots: spotsReducer,
    vehicles: vehiclesReducer
});

export default entitiesReducer;
