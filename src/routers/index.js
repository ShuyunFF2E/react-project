import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';

import Dashboard from '../containers/dashboard';
import User from '../containers/user';

import classes from './style.less';

export default class Routers extends React.Component {
	render() {
		return (
			<Router>
				<main className={classes.main}>
					<nav className={classes.nav}>
						<NavLink to="/dashboard" activeClassName={classes.active}>Dashboard</NavLink>
						<NavLink to="/user" activeClassName={classes.active}>User</NavLink>
					</nav>

					<section className={classes.content}>
						<Switch>
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/user" component={User} />
							<Route path="/*" component={() => <span>Not Found!</span>} />
							<Redirect to="/dashboard" />
						</Switch>
					</section>
				</main>
			</Router>
		);
	}
}
