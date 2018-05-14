import React, {Component}  from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

export default class Transaction extends Component { 
    constructor(props) {
        super(props)
    }

    state = {
        moneyAmount: 0
    }

    handleAmountChange = (e) => {
        this.setState({
            ...this.state,
            moneyAmount: e.target.value
        })
    }

    makeBuyTransaction = () => {
        this.props.buyKoinHandler(this.props.user,this.state.moneyAmount)
        setTimeout( () => this.props.updateWalletHandler(this.props.user)
            , 1500);
    }

    render() {
        return(
            <div className="container-fluid">
                <span className="row">Buy DK</span>
                <div className="row"><input type="number" onChange={this.handleAmountChange} placeholder="Enter amount..." /></div>
                <span className="row"><button className="btn" onClick={() => this.makeBuyTransaction()}>Buy DonkeyKoin</button></span>
            </div>
        )
    }

}
