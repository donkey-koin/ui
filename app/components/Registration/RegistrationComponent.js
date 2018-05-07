import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validators from './validator';
import * as registrationStyles from '../../styles/registration.scss';


export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "username": '',
            "password": '',
            "email": '',
            "password-confirmation": '',
            "akzeptierung": '',
            "isLoading": false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.displayValidationErrors = this.displayValidationErrors.bind(this);
        this.resetValidators = this.resetValidators.bind(this);
        this.updateValidators = this.updateValidators.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.validators = validators;
        this.resetValidators();
    }

    handleInputChange(event, inputPropName) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });
        console.log(inputPropName);
        this.updateValidators(inputPropName, value);
    }

    resetValidators() {
        Object.keys(this.validators).forEach((fieldName) => {
            this.validators[fieldName].errors = [];
            this.validators[fieldName].state = '';
            this.validators[fieldName].valid = false;
        });
    }

    displayValidationErrors(fieldName) {
        const validator = this.validators[fieldName];
        const result = '';
        if (validator && !validator.valid) {
            const errors = validator.errors.map((info, index) => {
                return <small key={index}>* {info}<br /></small>;
            });

            return (
                <div className="text-danger">
                    {errors}
                </div>
            );
        }
        return result;
    }

    isFormValid() {
        let status = true;
        Object.keys(this.validators).forEach((field) => {
            if (!this.validators[field].valid) {
                status = false;
            }
        });
        return status;
    }

    updateValidators(fieldName, value) {
        console.log(fieldName);
        console.log(value);
        this.validators[fieldName].errors = [];
        this.validators[fieldName].state = value;
        this.validators[fieldName].valid = true;
        this.validators[fieldName].rules.forEach((rule) => {
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                    this.validators[fieldName].errors.push(rule.message);
                    this.validators[fieldName].valid = false;
                }
            } else if (typeof rule.test === 'function' && fieldName === "password-confirmation") {
                if (!rule.test(value, this.state.password)) {
                    this.validators[fieldName].errors.push(rule.message);
                    this.validators[fieldName].valid = false;
                }
            } else if (typeof rule.test === 'function') {
                if (!rule.test(value)) {
                    this.validators[fieldName].errors.push(rule.message);
                    this.validators[fieldName].valid = false;
                }
            }
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        console.log("form submitted");
        let body = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email
        }
        console.log(body);
        this.state.isLoading = true;
        fetch('http://localhost:5000/register',{
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST'
        })
        .then(res => {
            console.log(res);
            if(res.error) {
                console.log(res.error);
            }
            console.log('registered');
        })
        .catch(error => console.log(error));

        event.preventDefault();
    }

    render() {
        return (
            <div className={registrationStyles + " container-fluid"} >
                <form onSubmit={this.handleSubmit}>
                    <h1>Create new account</h1>
                    <h5>Join Donkey Koin Exchange.</h5>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input id="username" className="form-control" onBlur={(e) => this.handleInputChange(e, "username")} type="text" checked="this.state.username" />
                        {this.displayValidationErrors("username")}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input id="email" className="form-control" type="email" onBlur={(e) => this.handleInputChange(e, "email")}/>
                        {this.displayValidationErrors("email")}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input id="password" className="form-control" type="password" onBlur={(e) => this.handleInputChange(e, "password")} aria-describedby="password-help" />
                        <small id="password-help" className="form-text text-muted">Must contain at least 6 characters</small>
                        {this.displayValidationErrors("password")}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-confirmation">Confirm Password:</label>
                        <input id="password-confirmation" type="password" className="form-control" onBlur={(e) => this.handleInputChange(e, "password-confirmation")} />
                        {this.displayValidationErrors("password-confirmation")}
                    </div>
                    <div className="checkbox">
                        <label><input id="akzeptierung" type="checkbox" onChange={(e) => this.handleInputChange(e, "akzeptierung")} /> I agree&nbsp;  
                        <Link to="/legal/terms" target="_blank">Terms And Conditions</Link>
                        &nbsp;and&nbsp; 
                        <Link to="/legal/privacy" target="_blank">Privacy Policy</Link>.
                        </label>
                        {this.displayValidationErrors("akzeptierung")}
                    </div>
                    <input type="submit" value="Submit" className="btn btn-primary" disabled={!this.isFormValid()} />
                    <div>
                        <Link to="/">Already have an account?</Link>
                    </div>
                </form>
            </div>
        )
    }

} 
