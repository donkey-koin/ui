import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import Routes from '../routes';


export default class App extends Component {
    
    constructor(props) {
        super(props)
    }

    render() { 
        return (
            <div>
                { Routes }
                <footer className={footer}>
                <Link to="/">Dashboard</Link>
                <Link to="/about">About</Link>
                </footer>
            </div>
        )
    }

}
