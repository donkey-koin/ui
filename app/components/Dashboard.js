import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, depositToWallet, buyKoin, updateWallet } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { Chart } from './Chart/ChartComponent'
import { Wallet } from './Wallet'; 
import { Transaction } from './Transaction';
 
export class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.actions.updateWallet(this.props.user.loggedUser)
    }

    onSztynks = () =>  {
        let sztynks1 = this.props.user.loggedUser;
        let sztynks2 = this.props.user.token;
        console.log(sztynks1 + " " + sztynks2)
        let body = {
            "username": this.props.user.loggedUser,
            "token": this.props.user.token
        }

        fetch('http://localhost:5000/walletContent',{
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' +  sztynks2
            },
            method: 'POST'
        })
        .then(res => {
            console.log(res);
            if(res.error) {
                console.log(res.error);
            }
            console.log('registered');
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="container-fluid">
                {/* <button onClick={() => this.onSztynks()}>sztynks1</button> */}
                <div className="row">
                    <div className="col-3 transactionBar">
                        <div><Wallet balanceEuro={this.props.wallet.balanceEuro}
                            balanceDK={this.props.wallet.balanceDK}
                            depositHandler={this.props.actions.depositToWallet}
                            user={this.props.user.loggedUser}
                        /></div>
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
                <div className="row">
                    <footer className={footer}>
                        <Link to="/">Dashboard</Link>
                        <Link to="/about">About</Link>
                    </footer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userReducer,
    wallet: state.walletReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ login, depositToWallet, buyKoin, updateWallet }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
