import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, depositToWallet } from '../actions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import { Chart } from './Chart/ChartComponent'
import { Wallet } from './Wallet'; 
 
export class Dashboard extends Component {

    constructor(props) {
        super(props)
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
                Turboinba
                <Chart />
                <button onClick={() => this.onSztynks()}>sztynks1</button>
                <div className="row">
                    <div className="col-3 transactionBar">
                        <Wallet balanceEuro={this.props.wallet.balanceEuro}
                            balanceDK={this.props.wallet.balanceDK}
                            depositHandler={this.props.actions.depositToWallet}
                            user={this.props.user.loggedUser}
                        />
                    </div>  
                    <div className="col-9">
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
    actions: bindActionCreators({ login, depositToWallet }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
