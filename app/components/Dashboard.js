import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, depositToWallet, buyKoin, updateWallet, logout } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import * as dashboardStyle  from '../styles/dashboard.scss';

import { Chart } from './Chart/ChartComponent'
import { Wallet } from './Wallet'; 
import { Transaction } from './Transaction';

import Navbar from "./Navbar/NavbarComponent";
 
export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.user.loggedIn && this.props.user.loggedIn) {
            this.props.actions.updateWallet(this.props.user.loggedUser)
        }
    }

    logout = () => {
        this.props.actions.logout()
    }

    render() {
        return (
            <div className={dashboardStyle.dashboard + " container-fluid"}>
                {/* <button onClick={() => this.onSztynks()}>sztynks1</button> */}
<<<<<<< HEAD
                <Navbar logoutHandler={this.logout}/>
                <div className="row">
                    <div className="col-3 transactionBar">
                        <div><Wallet balanceEuro={this.props.wallet.balanceEuro}
=======
                <div><Navbar logoutHandler={this.logout}/></div>
                <div className={dashboardStyle.mainRow + " row"}>
                    <div className={dashboardStyle.transactionBar + " col-3"}>
                        <div className={dashboardStyle.transactionBarHeader}>Order form</div>
                        <Wallet balanceEuro={this.props.wallet.balanceEuro}
>>>>>>> added styles for dashboard (wip)
                            balanceDK={this.props.wallet.balanceDK}
                            depositHandler={this.props.actions.depositToWallet}
                            user={this.props.user.loggedUser}
                        />
                        <hr color="white"/>
                        <div>
                            <Transaction user={this.props.user.loggedUser}
                                buyKoinHandler={this.props.actions.buyKoin}    
                                updateWalletHandler={this.props.actions.updateWallet}
                            />
                        </div>
                    </div>  
                    <div className="col-9">
                        <Chart />
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
    wallet: state.walletReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login, depositToWallet, buyKoin, updateWallet, logout}, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
