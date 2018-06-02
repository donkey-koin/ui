import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as transactionStyles from '../../styles/transaction.scss';
import Limit from './Limit/LimitComponent';

const BUY_TYPE = "buy"
const SELL_TYPE = "sell"

const MARKET_ORDER = "market"
const LIMIT_ORDER = "limit"

export default class Transaction extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        moneyAmount: 0,
        transactionType: BUY_TYPE,
        order: MARKET_ORDER
    }

    handleAmountChange = (e) => {
        this.setState({
            ...this.state,
            moneyAmount: e.target.value
        })
    }

    makeBuyTransaction = () => {
        this.props.buyKoinHandler(this.props.user, this.state.moneyAmount, this.props.token)
        setTimeout(() => this.props.updateWalletHandler(this.props.user, this.props.token)
            , 1500);
    }

    changeActive = (e) => {
        Array.from(document.getElementsByClassName(transactionStyles.active))
            .map((i) => i.classList.remove(transactionStyles.active));
        e.target.classList.add(transactionStyles.active);
        e.target.id === "limit" ? this.setState({ ...this.state, order: LIMIT_ORDER }) : null;
        e.target.id === "market" ? this.setState({ ...this.state, order: MARKET_ORDER }) : null;

    }

    render() {
        return (
            <div className={transactionStyles.transaction + " container-fluid"}>
                <ul>
                    <li id="market" className={transactionStyles.tab + " " + transactionStyles.active} onClick={(e) => this.changeActive(e)}>Buy Donkey Koin</li>
                    <li id="limit" className={transactionStyles.tab} onClick={(e) => this.changeActive(e)}>LIMIT</li>
                </ul>

                {
                    this.state.order === MARKET_ORDER &&
                    <div className="market-order">
                        <div className="row"><input className={transactionStyles.transactionInput} onChange={this.handleAmountChange} placeholder="Enter amount..." /></div>
                        <span className="row"><button className={transactionStyles.buyButton + " btn btn-success"} onClick={() => this.makeBuyTransaction()}>Place Buy Order</button></span>
                    </div>
                }
                {
                    this.state.order === LIMIT_ORDER &&
                    <div className="limit-order">
                        <Limit />
                    </div>
                }

            </div>
        )
    }
}
