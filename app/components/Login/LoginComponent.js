import React, {Component}  from 'react';
import { login } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as loginStyles from '../../styles/login.scss';

export default class Login extends Component { 
    constructor(props) {
        super(props)
    }

    state = {
        username: '',
        password: ''
    }

    handleLoginChange = (e) => {
        this.setState({
            ...this.state,
            username: e.target.value
        })
    }

    handlePasswordChange = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        })
    }

    render() {
        return(
            <div className={loginStyles.loginForm}>
                <h2>Login</h2>
                <div>
                    <div className="row"><input type="text" onChange={this.handleLoginChange} placeholder="Username" /></div>
                    <div className="row"><input type="password" onChange={this.handlePasswordChange} placeholder="Password" /></div>
                    <button onClick={() => this.props.loginHandler(this.state.username,this.state.password)}> Sign in </button>
                    <Link to="/register">Don't have an account? Register</Link>
                    {this.props.loginInProgress && <h2>Loading xdxd</h2>}
                </div>
          </div>
        )
    }

}
