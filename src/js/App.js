import React, { Component } from "react";
import Header from "./components/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Grid, Row } from "react-bootstrap";

import Home from "./components/home";
import Dashboard from "./components/dashboard";
import Howitworks from "./components/howitworks";
import Footer from "./components/footer";
import Help from "./components/help";
import requireAuth from "./components/auth/require_auth";
class App extends Component {
	render() {
		return (
			<Router>
				<Grid fluid className="App">
					<Header className="App-header" />
					<Route exact path="/" component={Home} />
					<Route exact path="/Howitworks" component={Howitworks} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/dashboard" component={requireAuth(Dashboard)} />
					<Footer />
				</Grid>
			</Router>
		);
	}
}
export default App;
