import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validators from './validator';
import * as registrationStyles from '../../styles/registration.scss';
import {ORCHESTRATION_HOST} from "../../actions/mapping";


export default class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "username": '',
            "password": '',
            "email": '',
            "password-confirmation": '',
            "akzeptierung": '',
            "isLoading": false,
            "showModal": false,
            'registrationError': null,
            "successMessage": null
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

    goBack = (event) => {
        event.preventDefault();
        this.setState({
            ...this.state,
            successMessage: null,
            registrationError: null,
            showModal: false
        });
    }

    signIn = (event) => {
        event.preventDefault();
        this.props.history.push('/');
    }

    handleSubmit(event) {
        console.log("form submitted");
        let body = {
            "username": this.state.username,
            "password": this.state.password,
            "email": this.state.email
        }
        console.log(body);
        this.setState({
            ...this.state,
            isLoading: true
        });

        fetch(ORCHESTRATION_HOST + '/register', {
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.state.isLoading = false;
                this.state.showModal = true;
                console.log(this.state);
                if (res.error) {
                    console.log(res.error);
                    this.state.registrationError = res.error;
                } else {
                    this.state.successMessage = res.data;
                }
                console.log('registered');
                console.log(this.state);
                this.forceUpdate();
            })
            .catch(error => {
                console.log(error);
                this.state.showModal = true;
                this.state.registrationError = error;
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className={registrationStyles.form + " container-fluid"} >
                {this.state.isLoading ? <div className={registrationStyles.fullscreen}><div className={registrationStyles.loader}></div></div>: null}

                <form onSubmit={this.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <h1>Create new account</h1>
                        </div>
                        <div className="row">
                            <h5>Join Donkey Koin Exchange.</h5>
                        </div>
                        <div className="row">
                            <input id="username" placeholder="Username"  autoComplete="username" onBlur={(e) => this.handleInputChange(e, "username")} type="text" checked="this.state.username" />
                        </div>
                        {this.displayValidationErrors("username")}

                        <div className="row">
                            <input id="email" placeholder="Email" type="email" autoComplete="email" onBlur={(e) => this.handleInputChange(e, "email")} />
                        </div>
                        {this.displayValidationErrors("email")}

                        <div className="row">
                            <input placeholder="Password" id="password" autoComplete="new-password" type="password" onBlur={(e) => this.handleInputChange(e, "password")} />
                        </div>
                        <div className="row">
                            <small id="password-help" className={registrationStyles.small + " text-muted"}>Must contain at least 6 characters</small> 
                        </div>
                        {this.displayValidationErrors("password")}
                        
                        <div className={ "row "}>
                            <input id="password-confirmation" placeholder="Confirm Password" type="password" autoComplete="new-password" onBlur={(e) => this.handleInputChange(e, "password-confirmation")} />
                        </div>
                        {this.displayValidationErrors("password-confirmation")}

                        <div className="checkbox row">
                            <label><input id="akzeptierung" type="checkbox" onChange={(e) => this.handleInputChange(e, "akzeptierung")} /> I agree&nbsp;
                            <Link to="/legal/terms" target="_blank">Terms And Conditions</Link>
                                &nbsp;and&nbsp;
                            <Link to="/legal/privacy" target="_blank">Privacy Policy</Link>.
                            </label>
                        </div>
                        {this.displayValidationErrors("akzeptierung")}
                        <div className="row">
                            <input type="submit" value="Submit" className="btn btn-primary" disabled={!this.isFormValid()} />
                        </div>
                    </div>

                </form>
                <div className={registrationStyles.link}>
                    <Link to="/">Already have an account?</Link>
                </div>
                {
                    this.state.showModal &&
                    <div className={registrationStyles.modal}>
                        <div className={registrationStyles.modalCtx}>
                            <div className={registrationStyles.modalBody}>
                                {
                                    this.state.registrationError !== null
                                        ?
                                        <h2>
                                            {this.state.registrationError}
                                        </h2>
                                        :
                                        <h2>
                                            {this.state.successMessage}
                                        </h2>
                                }
                            </div>
                            <div className={registrationStyles.modalFooter}>
                                {
                                    this.state.registrationError !== null
                                        ?
                                        <button type="button" className="btn btn-default" onClick={this.goBack}>Go Back</button>
                                        :
                                        <button type="button" className="btn btn-default" onClick={this.signIn}>Sign in</button>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

} 
