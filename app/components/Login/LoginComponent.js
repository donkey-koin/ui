import React, {Component}  from 'react';
import { login } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as loginStyles from '../../styles/login.scss';
import * as navbarStyles from "../../styles/navbar.scss";
import logo from '../../styles/logo.png';

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

    getButtonLoading = () => {
        return (
            <button className="btn"> 
                <p>Logging in... <div className={loginStyles.loader}></div></p>
            </button>
        )
    }

    getButtonNotLoading = () => {
        return (
            <button className="btn" onClick={() => this.props.loginHandler(this.state.username,this.state.password)}> 
                <p>Login</p>
            </button>
        )
    }

    // TODO: fix login loader, handle errors, center form
    render() {
        return(
            <div className={loginStyles.loginScreen + " container-fluid"}>
                    <div className={loginStyles.container}>
                        <div className={loginStyles.title + " page-header"}><h2><img src ={logo} style={{width: '10em', height: '3em'}} alt="Logo"/></h2></div>
                        <div className={loginStyles.loginForm}>
                            <div className="row"><input type="text" onChange={this.handleLoginChange} placeholder="Username" /></div>
                            <div className="row"><input type="password" onChange={this.handlePasswordChange} placeholder="Password" /></div>
                            <div className="row">
                                {this.props.loginInProgress ? this.getButtonLoading() : this.getButtonNotLoading()}
                            </div>
                            {this.props.loginError && <div className="row"><p className={loginStyles.errorMessage}>Invalid login/password. Please double-check and try again.</p></div>}
                            <div className="row">
                                <div className={loginStyles.loginActions + " dualipa"}><span className="xd"> Don't have an account yet?</span> <Link to="/register">Register</Link></div>
                                {/* &nbsp;
                                <div className="col-xs-6"><a href="#">Forget password</a></div> */}
                            </div>
                        </div>
                    </div>
          </div>
        )
    }

}
