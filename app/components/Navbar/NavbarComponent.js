import React, {Component} from 'react';
import * as navbarStyles from '../../styles/navbar.scss';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={navbarStyles.navbar + " container-fluid"}>
                    <div className={navbarStyles.profileHeader}>Dashboard</div>
                    <div className={navbarStyles.logoutHeader}><Link to="/" style={{ textDecoration: 'none', color: '#474A54' }} onClick={this.props.logoutHandler}>Logout</Link></div>
            </div>
        )
    }
}