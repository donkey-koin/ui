import React, { Component } from 'react';
import Navbar from "../Navbar/NavbarComponent";
import * as myProfileStyles from '../../styles/my-profile.scss';


export default class MyProfile extends Component {

    constructor(props) {
        super(props);
    }

    showMyTransactions = () => {
        
    }

    showAllTransactions = () => {

    }

    render() {
        return (
            <div className={myProfileStyles.nav + " " + myProfileStyles.page}>
                <Navbar logoutHandler={this.logout} />
                <div className={"row " +  myProfileStyles.page}> 
                    <div className={"col " + myProfileStyles.center + " " + myProfileStyles.bar}>
                        <button type="submit" className="btn btn-success" onClick={() => this.showMyTransactions()}>Get My Transactions</button>
                    </div>
                    <div className={"col " + myProfileStyles.center}>
                        <button type="submit" className="btn btn-success" onClick={() => this.showAllTransactions()}>Get All Transactions</button>
                    </div>
                </div>
            </div>
        )
    }
}