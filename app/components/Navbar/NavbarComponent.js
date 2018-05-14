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
                <div>
                    <div className={navbarStyles.profileHeader}>Dashboard</div>
                    <div className={navbarStyles.logoutHeader}><Link to="/" onClick={this.props.logoutHandler}>Logout</Link></div>
                </div>
            </div>
        )
    }
}