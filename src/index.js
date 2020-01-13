import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, NavLink } from 'react-router-dom';

import Home from './containers/home';
import User from './containers/user';

import classes from './index.less';

export default class Index extends React.Component {
	render() {
		return (
			<Router>
				<main className={classes.main}>
					<nav className={classes.nav}>
						<NavLink to="/home" activeClassName={classes.active}>Home</NavLink>
						<NavLink to="/user" activeClassName={classes.active}>User</NavLink>
					</nav>

					<section className={classes.content}>
						<Switch>
							<Route path="/home" component={props => <Home />} />
							<Route path="/user" component={props => <User />} />
							<Redirect to="/home" />
						</Switch>
					</section>
				</main>
			</Router>
		);
	}
}
