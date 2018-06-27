import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../actions/auth_actions';
import SignUp from './signup';
import { clearErrors } from '../../actions/errors_actions';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    createUser: (user,history) => dispatch(createUser(user,history)),
    clearErrors: () => dispatch(clearErrors()),
  })

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
