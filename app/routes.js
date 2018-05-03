import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Dashboard from './components/Dashboard';
import { RegistrationComponent } from './components/Registration'
import { PrivacyPolicyComponent } from './components/PrivacyPolicy';
import { TermsAndConditionsComponent } from './components/TermsAndConditions';

export default (
	<Switch>
		<Route exact path="/" component={Dashboard} />
		<Route exact path="/register" component={RegistrationComponent} />
		<Route exact path="/legal/terms" component={TermsAndConditionsComponent} />
		<Route exact path="/legal/privacy" component={PrivacyPolicyComponent} />
		<Route path="/about" component={About} />
	</Switch>
);
