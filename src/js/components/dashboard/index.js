//@flow
import React, { Component } from "react";
import { fetchCampaign } from "../../actions/campaignActions";
import { fetchUser, modalStatus } from "../../actions/userActions";
import { fetchBoards } from "../../actions/boardActions";
import { connect } from "react-redux";
import { Row, Grid, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import Analytics from "./analytics";
import Heading from "../heading";
import Icon from "../icon";
import Loading from "../loading";
import _ from "lodash";
import Home from "./home";
import Adsets from "./adSets";
import Toggler from "../toggle";
import ActivityIndicator from "../activityIndicator";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.LoadingMessages = ["Erecting Boards at Ikoyi", "Cleaning Boards", "Powering Boards", "Loading Adverts", "In Traffic on Ikoyi Bridge"];
		this.state = {
			loading: true,
			currentSub: "Dashboard"
		};
	}
	dashBoardMenu = {
		Dashboard: {
			title: "Dashboard",
			defaultLink: "",
			subMenu: [{ title: "Campaigns", path: "" }, { title: "Ad Sets", path: "/adSets" }]
		},
		ManageAds: {
			title: "Manage Ads",
			subMenu: [{ title: "All Campaigns" }, { title: "Edit Campaigns" }]
		},
		Billings: {
			title: "Billings",
			subMenu: [{ title: "Billing History" }, { title: "Current Spending" }]
		},
		Account: {
			title: "Account",
			subMenu: [{ title: "Edit Account" }, { title: "Deactivate Account" }]
		}
	};
	changeRoute(route) {
		console.log(this.props);
		this.props.history.push(this.props.match.url + route);
	}
	componentWillMount() {
		this.props.fetchUser().then(data => this.props.fetchCampaign().then(data => this.props.fetchBoards().then(data => this.setState({ loading: false }))));
	}
	handleCloseModal(route) {
		if (route && !route.target) this.props.modalStatus(true, route);
		else {
			this.props.modalStatus(false);
		}
	}
	render() {
		const { loading, currentSub } = this.state;
		const { allCampaigns, match, location } = this.props;
		console.log(location);
		if (loading) return <Loading type="step" key={1} messages={this.LoadingMessages} />;
		else
			return (
				<Router>
					<Row>
						<div className="dashboardMenu">
							<div className="hrule" />
							<div className="dashboard_menu">
								<ul>
									{_.map(this.dashBoardMenu, (item, index) => (
										<li key={_.uniqueId()} onClick={() => this.setState({ currentSub: index })} className={` ${currentSub == index ? "active" : ""}`}>
											<Link to={`${match.url + item.defaultLink}`}>{item.title}</Link> <span className={` ${currentSub == index ? "subArrow" : ""}`} />
										</li>
									))}
								</ul>
							</div>
							<div className="hrule" />
							<div className="dashboard_submenu">
								<ReactCSSTransitionGroup component="ul" transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
									{this.dashBoardMenu[currentSub].subMenu.reduce((accumulator, item, index) => {
										if (index < this.dashBoardMenu[currentSub].subMenu.length - 1) {
											return accumulator.concat(<Link to={match.url + (item.path || "")}>{item.title}</Link>);
										} else {
											return <li key={_.uniqueId()}>{accumulator.concat(<Link to={match.url + (item.path || "")}>{item.title}</Link>)}</li>;
										}
									}, [])}
								</ReactCSSTransitionGroup>
							</div>
						</div>
						<Route
							render={({ location }) => (
								<ReactCSSTransitionGroup key={location.key} transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
									<Switch location={location}>
										<Route exact={true} path={`${match.url}`} component={() => <Home allCampaigns={allCampaigns} location={location} changeRoute={this.changeRoute.bind(this)} />} />
										<Route
											exact={true}
											path={`${match.url}/adSets/:campaignId`}
											component={() => <Adsets allCampaigns={allCampaigns} location={location} changeRoute={this.changeRoute.bind(this)} createCampaign={() => "Hello"} />}
										/>
										{console.log(location, match)}
									</Switch>
								</ReactCSSTransitionGroup>
							)}
						/>
					</Row>
				</Router>
			);
	}
}
function mapStateToProps(state) {
	return { allCampaigns: state.campaigns.allCampaigns };
}
const mapDispatchToProps = { fetchCampaign, fetchUser, modalStatus, fetchBoards };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));
