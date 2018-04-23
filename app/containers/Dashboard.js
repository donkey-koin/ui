import React, {Component}  from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import * as dashboardStyles from '../styles/dashboard.scss';
import { bindActionCreators } from 'redux';
import { Login as LoginComponent} from '../components/Login'

export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    signIn = (username, password) => {
        this.props.actions.login(username,password)
    }

    render() {
        return (
            <div>
                {   
                    !this.props.user.loggedIn && <div className={dashboardStyles.loginComponent}>
                        <LoginComponent loginInProgress={this.props.user.loginInProgress} loginHandler={this.signIn}/>
                    </div>
                }
                Turboinba
            </div>
        );
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
)(Dashboard);
