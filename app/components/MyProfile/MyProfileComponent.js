import React, { Component } from 'react';
import Navbar from "../Navbar/NavbarComponent";
import * as myProfileStyles from '../../styles/my-profile.scss';
import { login, getAllTransactions, getMyTransactions, logout } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.loggedUser,
            token: this.props.user.token
        }
    }

    showMyTransactions = () => {
        this.props.actions.getMyTransactions(this.state.username, this.state.token);
    }

    showAllTransactions = () => {
        this.props.actions.getAllTransactions(this.state.token);
    }

    render() {
        return (
            <div className={myProfileStyles.nav + " " + myProfileStyles.page}>
                <Navbar logoutHandler={this.logout} />
                <div className={"row " + myProfileStyles.page}>
                    <div className={"col " + myProfileStyles.center + " " + myProfileStyles.bar}>
                        <button type="submit" className="btn btn-success" onClick={() => this.showMyTransactions()}>Get My Transactions</button>
                    </div>
                    <div className={"col " + myProfileStyles.center}>
                        <button type="submit" className="btn btn-success" onClick={() => this.showAllTransactions()}>Get All Transactions</button>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.userReducer,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login, logout, getAllTransactions, getMyTransactions }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyProfile);