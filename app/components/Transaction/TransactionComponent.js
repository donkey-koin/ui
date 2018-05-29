import React, {Component}  from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as transactionStyles from '../../styles/transaction.scss';

const BUY_TYPE = "buy"
const SELL_TYPE = "sell"

export default class Transaction extends Component { 
    constructor(props) {
        super(props)
    }

    state = {
        moneyAmount: 0,
        transactionType: BUY_TYPE 
    }

    handleAmountChange = (e) => {
        this.setState({
            ...this.state,
            moneyAmount: e.target.value
        })
    }

    makeBuyTransaction = () => {
        this.props.buyKoinHandler(this.props.user,this.state.moneyAmount,this.props.token)
        setTimeout( () => this.props.updateWalletHandler(this.props.user,this.props.token)
            , 1500);
    }

    render() {
        return(
            <div className={transactionStyles.transaction + " container-fluid"}>
                <div className={transactionStyles.title}>Buy Donkey Koin</div> 
                <div className="row"><input className={transactionStyles.transactionInput} onChange={this.handleAmountChange} placeholder="Enter amount..." /></div>
                <span className="row"><button className={transactionStyles.buyButton + " btn btn-success"} onClick={() => this.makeBuyTransaction()}>Place Buy Order</button></span>
            </div>
        )
    }

}
