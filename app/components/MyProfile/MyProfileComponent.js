import React, { Component } from 'react';
import Navbar from "../Navbar/NavbarComponent";
import * as myProfileStyles  from '../../styles/my-profile.scss';


export default class MyProfle extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={myProfileStyles.nav + " container-fluid"}>
                <Navbar logoutHandler={this.logout}/>

            </div>
        )
    }
}