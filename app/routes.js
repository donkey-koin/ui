import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Dashboard from './containers/Dashboard';
import { RegistrationComponent } from './components/Registration'

export default (
	<Switch>
		<Route exact path="/" component={Dashboard} />
		<Route exact path="/register" component={RegistrationComponent} />
		<Route path="/about" component={About} />
	</Switch>
);
