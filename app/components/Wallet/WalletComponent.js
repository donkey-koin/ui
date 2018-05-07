import React, {Component}  from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as walletStyles from '../../styles/wallet.scss';

export default class Wallet extends Component { 
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container-fluid">
                WALE W FILET
                <span className="row">Balance</span>
                <span className="row">EURO: {this.props.balanceEuro}</span>
                <span className="row">DONKEY KOIN: {this.props.balanceDK}</span>
                <span className="row"><button onClick={() => this.props.depositHandler(this.props.user,50)}>DEPOSIT</button>&nbsp;<button onClick={this.props.withdrawnHandler}>WITHDRAWN</button></span>
            </div>
        )
    }

}
