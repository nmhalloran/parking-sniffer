// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
//
// const initialState = {};
//
// const middleware = [thunk];
//
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
//
// export default store;
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers/root_reducer.js";
import logger from "redux-logger";

const configureStore = (
  preloadedState = {
    entities: { spots: { zip: 94105, range: 200, indexloading: true } }
  }
) => {
  return createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  );
  // return createStore(RootReducer, preloadedState, applyMiddleware(thunk))
};

export default configureStore;
