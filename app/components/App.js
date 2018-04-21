import React from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import Routes from '../routes';

const App = () =>
    <div>
        { Routes }
        <footer className={footer}>
            <Link to="/">Dashboard</Link>
            <Link to="/about">About</Link>
        </footer>
    </div>;

export default App;
