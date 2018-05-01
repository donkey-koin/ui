import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        // event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Create new account</h1>
                <h5>Join Donkey Koin Exchange.</h5>
                <div className="row">
                    <div className="col-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input id="username" className="form-control" onChange={this.handleInputChange} type="text" checked="this.state.username" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input id="email" className="form-control" type="email" onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input id="password" className="form-control" type="password" onChange={this.handleInputChange} required aria-describedby="password-help" />
                                <small id="password-help" className="form-text text-muted">Must contain at least 6 characters</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password-confirmation">Confirm Password:</label>
                                <input id="password-confirmation" type="password" className="form-control" onChange={this.handleInputChange} required />
                            </div>
                            <div className="checkbox">
                                <label><input type="checkbox" onChange={this.handleInputChange}/> I agree <Link to="/">Terms And Conditions</Link> and <Link to="/">Privacy Policy</Link>.</label>
                            </div>
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </form>
                    </div>
                    <div className="col-4" />
                </div>
            </div>
        )
    }

} 
