import React, {Component}  from 'react';
import { login } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as loginStyles from '../../styles/login.scss';

export default class Login extends Component { 
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={loginStyles.loginForm}>
                <h2>Login</h2>
                <div>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button> Sign in </button>
                    <Link to="/register">Don't have an account? Register</Link>
                </div>
          </div>
        )
    }

}
