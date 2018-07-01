import { combineReducers } from 'redux';
import entitiesReducer from './entities_reducer';
import errorsReducer from './errors_reducer.js';
import authReducer from './auth_reducer';
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';

const rootReducer =  combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  isAuthenticated: authReducer
});

export default rootReducer;
