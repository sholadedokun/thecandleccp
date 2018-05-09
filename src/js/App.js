import React, { Component } from "react";
import Header from "./components/header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";

import Home from "./components/home";
import Dashboard from "./components/dashboard/";
import Howitworks from "./components/howitworks";
import Footer from "./components/footer";
import Help from "./components/help";
import requireAuth from "./components/auth/require_auth";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class App extends Component {
	componentDidMount() {
		//extending the number function for money conversion.
		Number.prototype.formatMoney = function(n, x) {
			var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
			return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
		};
	}
	render() {
		return (
			<Router>
				<Grid fluid className="App">
					<Header className="App-header" />
					<Route
						render={({ location }) => (
							<ReactCSSTransitionGroup key={location.key} component="ul" transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
								<Switch location={location}>
									<Route exact path="/" component={Home} />
									<Route exact path="/Howitworks" component={Howitworks} />
									<Route exact path="/help" component={Help} />
									<Route path="/dashboard" component={requireAuth(Dashboard)} />
								</Switch>
							</ReactCSSTransitionGroup>
						)}
					/>
					<Footer />
				</Grid>
			</Router>
		);
	}
}
export default App;
