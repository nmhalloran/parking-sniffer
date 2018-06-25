import { CLEAR_ERRORS, ADD_ERRORS } from '../actions/errors_actions'

const errorsReducer = (state={}, action) =>{
  Object.freeze(state)
  switch (action.type) {
    case CLEAR_ERRORS:
      return {}
    case ADD_ERRORS:

      let key = action.error.responseText;

      key = stripBrackets(key)

      let key_arr = key.split(",")

      key_arr = key_arr.map(errmsg=>stripQuotes(errmsg))

      key = key_arr.join()

      return Object.assign({},state, {[key]:action.error})
    default:
      return state
  }
};

const stripBrackets = (error) => {
  let return_err = error;
  while (return_err[0] === '[' && return_err[error.length -1] === ']'){
    return_err = return_err.slice(1,error.length-1);
  }
    return return_err;
}

const stripQuotes = (error) => {
  let return_err = error;
  while (return_err[0] === '"' && return_err[error.length -1] === '"'){
    return_err = return_err.slice(1,error.length-1);
  }
    return return_err;
}




export default errorsReducer
