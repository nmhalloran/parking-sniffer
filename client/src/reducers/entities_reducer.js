import { combineReducers } from "redux";
import spotsReducer from './spots_reducer';


const entitiesReducer = combineReducers({

    spots: spotsReducer
});

export default entitiesReducer;