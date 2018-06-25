import { combineReducers } from 'redux';
import errorsReducer from './errors_reducer.js'
// import authReducer from './authReducer';
// import errorReducer from './errorReducer';
// import profileReducer from './profileReducer';

const rootReducer =  combineReducers({
  errors: errorsReducer
});

export default rootReducer
