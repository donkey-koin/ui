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
            </div>
        )
    }
}