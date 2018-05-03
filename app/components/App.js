import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Routes from '../routes';
import * as dashboardStyles from '../styles/dashboard.scss';
import * as appStyles from '../styles/app.scss';
import { Login as LoginComponent} from '../components/Login'
import { connect } from 'react-redux';
import { login } from '../actions';
import { bindActionCreators } from 'redux';


export class App extends Component {
    
    constructor(props) {
        super(props)
    }

    signIn = (username, password) => {
        this.props.actions.login(username,password)
    }

    shouldBeRendered = () => !this.props.user.loggedIn && ['/register', '/legal/privacy', '/legal/terms'].indexOf(this.props.location.pathname) < 0

    render() { 
        return (
            <div className={appStyles.mainContainer}>
                <div className={this.shouldBeRendered()   ?  dashboardStyles.hideDashboard : dashboardStyles.showDashboard }>{ Routes }</div>
                {   
                    this.shouldBeRendered() && <div className={dashboardStyles.loginComponent}>
                        <LoginComponent loginInProgress={this.props.user.loginInProgress} loginHandler={this.signIn}/>
                    </div>
                }
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.userReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({login},dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
