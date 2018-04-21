import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Dashboard from './containers/Dashboard';

export default (
	<Switch>
		<Route exact path="/" component={Dashboard} />
		<Route path="/about" component={About} />
	</Switch>
);
