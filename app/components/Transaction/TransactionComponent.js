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
        this.props.buyKoinHandler(this.props.user,this.state.moneyAmount).then(this.props.updateWalletHandler(this.props.user))
    }

    render() {
        return(
            <div className="container-fluid">
                <span className="row">Buy DK</span>
                <span className="row"><input type="number" onChange={this.handleAmountChange} placeholder="Enter amount..." /></span>
                <span className="row"><button onClick={() => this.makeBuyTransaction()}>Buy DonkeyKoin</button></span>
            </div>
        )
    }

}
