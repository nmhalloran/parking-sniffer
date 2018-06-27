import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer.js'
import authReducer from './auth_reducer';
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';

const rootReducer =  combineReducers({
  errors: errorsReducer,
  isAuthenticated: authReducer
});

export default rootReducer
