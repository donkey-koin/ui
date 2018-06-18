import React, {Component}  from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as walletStyles from '../../styles/wallet.scss';

export default class Wallet extends Component { 
    constructor(props) {
        super(props)
    }

    state = { 
        input: 0
    }

    handleAmountChange = (e) => { 
        this.setState({
            ...this.state,
            input: e.target.value
        })
    }

    render() {
        return(
            <div className={walletStyles.wallet + " container-fluid"}>
                <div className={walletStyles.title}>Balance</div> 
                <span className="row">
                    <span className={" col-6"}>EUR</span>
                    <span className={walletStyles.rightCol + " col-6"}>{this.props.balanceEuro}</span>
                </span>
                <span className="row">
                    <span className={" col-6"}>DonkeyKoin</span>
                    <span className={walletStyles.rightCol + " col-6"}>{this.props.balanceDK}</span>
                </span>
                <span>
                    <div className="row"><input onChange={this.handleAmountChange} className={walletStyles.walletInput} onChange={this.handleAmountChange} placeholder="Enter amount..." /></div>
                </span>
                <span className={walletStyles.buttonsRow +  " row"}>
                    <span className="col-6"><button className="btn btn-success" onClick={() => this.props.depositHandler(this.props.user,this.state.input,this.props.token)}>DEPOSIT</button></span>
                    <span className="col-6"><button className="btn btn-danger" onClick={this.props.withdrawnHandler}>WITHDRAWN</button></span>
                </span>
            </div>
        )
    }

}
