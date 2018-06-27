import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/auth_actions';
import SignIn from './signin';
import { clearErrors } from '../../actions/errors_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => dispatch(loginUser(user)),
    clearErrors: () => dispatch(clearErrors()),
  })

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
