import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, depositToWallet, withdrawnFromWallet, buyKoin, updateWallet, createPurchaseTrigger, logout, closeMessage } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import * as dashboardStyle from '../styles/dashboard.scss';

import { Chart } from './Chart/ChartComponent';
import { Statistics } from './Statistics/StatisticsComponent';

import { Wallet } from './Wallet';
import { Transaction } from './Transaction';

import Navbar from "./Navbar/NavbarComponent";
import {MessageModalComponent} from "./MessageModal"

export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user.loggedIn && this.props.user.loggedIn) {
            this.props.actions.updateWallet(this.props.user.loggedUser, this.props.user.token)
        }
    }

    logout = () => {
        this.props.actions.logout()
    }

    render() {
        return (
            <div className={dashboardStyle.dashboard + " container-fluid"}>
                {this.props.message.display && <MessageModalComponent message={this.props.message.message} error={this.props.message.wasError} closeMessageHandler={this.props.actions.closeMessage}/>}
                <div className={(this.props.message.display ? ' ' + dashboardStyle.dimmed : '') }>
                    <div><Navbar logoutHandler={this.logout} /></div>
                    <div className={dashboardStyle.mainRow + " row"}>
                        <div className={dashboardStyle.transactionBar + " col-3"}>
                            <div className={dashboardStyle.transactionBarHeader}>Order form</div>
                            <Wallet balanceEuro={this.props.wallet.balanceEuro}
                                balanceDK={this.props.wallet.balanceDK}
                                depositHandler={this.props.actions.depositToWallet}
                                withdrawnHandler={this.props.actions.withdrawnFromWallet}
                                user={this.props.user.loggedUser}
                                token={this.props.user.token}
                            />
                            <Transaction user={this.props.user.loggedUser}
                                buyKoinHandler={this.props.actions.buyKoin}
                                updateWalletHandler={this.props.actions.updateWallet}
                                createPurchaseTriggerHandler={this.props.actions.createPurchaseTrigger}
                                token={this.props.user.token}
                            />
                        </div>
                        <div className="col-9">
                            <Statistics last="5" />
                            <Chart />
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <footer className={footer}>
                        <Link to="/">Dashboard</Link>
                        <Link to="/about">About</Link>
                    </footer>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer,
    wallet: state.walletReducer,
    message: state.messageReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login, depositToWallet, withdrawnFromWallet, buyKoin, updateWallet, createPurchaseTrigger, logout, closeMessage }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
