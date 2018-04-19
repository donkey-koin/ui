import React, {Component} from 'react';
import  {LoginComponent}  from '../components/Login';
import { Row, Col } from 'reactstrap'

export default class App extends Component {
    
    render () {
        return (
            <div className="container-fluid">
                <LoginComponent />
            </div>
        )
    }
}