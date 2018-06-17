import React, { Component } from 'react';
import Navbar from "../Navbar/NavbarComponent";
import * as myProfileStyles from '../../styles/my-profile.scss';


export default class MyProfile extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={myProfileStyles.nav}>
                <Navbar logoutHandler={this.logout} />
                <div className="row"> 
                    <div className={"col " + myProfileStyles.center}>
                        <button type="submit" className="btn btn-success">Get My Transactions</button>
                    </div>
                    <div className={"col " + myProfileStyles.center}>
                        <button type="submit" className="btn btn-success">Get All Transactions</button>
                    </div>
                </div>
            </div>
        )
    }
}