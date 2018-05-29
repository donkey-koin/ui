import React, {Component} from 'react';
import * as navbarStyles from '../../styles/navbar.scss';
import { Link } from 'react-router-dom';
import logo from './logo.png';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={navbarStyles.navbar + " container-fluid"}>
                    <img src={logo} alt="Logo" className={navbarStyles.maupa} style={{width: '10em', height: '3em'}}/>
                    <div className={navbarStyles.profileHeader}>Dashboard</div>
                    <div className={navbarStyles.profileHeader}><Link to="/my-profile" >My Profile</Link></div>
                    <div className={navbarStyles.logoutHeader}><Link to="/" style={{ textDecoration: 'none', color: '#474A54' }} onClick={this.props.logoutHandler}>Logout</Link></div>
            </div>
        )
    }
}