import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as transactionStyles from '../../styles/transaction.scss';

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
        order: MARKET_ORDER,
        limit: 0
    }

    handleAmountChange = (e) => {
        this.setState({
            ...this.state,
            moneyAmount: e.target.value
        })
    }

    handleLimitChange = (e) => {
        this.setState({
            ...this.state,
            limit: e.target.value
        });
    }

    makeBuyTransaction = () => {
        if (this.state.order === LIMIT_ORDER ) {
            this.props.createPurchaseTriggerHandler(this.props.user, this.state.moneyAmount, this.state.limit, this.state.transactionType, this.props.token)
            return;
        }

        if (this.state.order === MARKET_ORDER) {
            this.props.buyKoinHandler(this.props.user, this.state.moneyAmount, this.props.token)
            setTimeout(() => this.props.updateWalletHandler(this.props.user, this.props.token)
                , 1500);
        }
    }

    makeSellTransaction = () => {
        if (this.state.order === LIMIT_ORDER ) {
            this.props.createPurchaseTriggerHandler(this.props.user, this.state.moneyAmount, this.state.limit, this.transactionType, this.props.token)
            return;
        }

        if (this.state.order === MARKET_ORDER) {
            this.props.sellKoinHandler(this.props.user, this.state.moneyAmount, this.props.token)
            setTimeout(() => this.props.updateWalletHandler(this.props.user, this.props.token)
                , 1500);
        }
    }

    changeTransactionType = (e) => {
        if (e.target.id === "buy-transaction") {
            e.target.classList.add(transactionStyles.orderTypeButtonBuyActive);
            document.getElementById('sell-transaction').classList.remove(transactionStyles.orderTypeButtonSellActive);
            this.setState({
                ...this.state,
                transactionType: BUY_TYPE
            });

        } else {
            e.target.classList.add(transactionStyles.orderTypeButtonSellActive);
            document.getElementById('buy-transaction').classList.remove(transactionStyles.orderTypeButtonBuyActive);
            this.setState({
                ...this.state,
                transactionType: SELL_TYPE
            });
        }

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
                <ul className={transactionStyles.tabList}>
                    <li id="market" className={transactionStyles.tab + " " + transactionStyles.active} onClick={(e) => this.changeActive(e)}>MARKET</li>
                    <li id="limit" className={transactionStyles.tab} onClick={(e) => this.changeActive(e)}>LIMIT</li>
                </ul>
                <ul className={transactionStyles.orderTypeButtonList}>
                    <li id="buy-transaction" className={transactionStyles.orderTypeButton + " " + transactionStyles.orderTypeButtonBuyActive} onClick={(e) => this.changeTransactionType(e)}>BUY</li>
                    <li id="sell-transaction" className={transactionStyles.orderTypeButton} onClick={(e) => this.changeTransactionType(e)}>SELL</li>
                </ul>
                <div className="row"><input className={transactionStyles.transactionInput} onChange={this.handleAmountChange} placeholder="Enter amount..." /></div>
                {
                    this.state.order === LIMIT_ORDER &&
                    <div className="row"><input className={transactionStyles.transactionInput} onChange={this.handleLimitChange} placeholder="Enter EUR limit..." /></div>
                }
                {
                    this.state.transactionType === BUY_TYPE &&
                    <span className="row"><button className={transactionStyles.buyButton + " btn btn-success"} onClick={() => this.makeBuyTransaction()}>Place Buy Order</button></span>

                }
                {
                    this.state.transactionType === SELL_TYPE &&
                    <span className="row"><button className={transactionStyles.sellButton + " btn " + transactionStyles} onClick={() => this.makeSellTransaction()}>Place Sell Order</button></span>
                }
            </div>
        )
    }
}
