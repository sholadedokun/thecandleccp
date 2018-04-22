//@flow
import React, { Component } from "react";
import { fetchCampaign } from "../../actions/campaignActions";
import { fetchUser, modalStatus } from "../../actions/userActions";
import { fetchBoards } from "../../actions/boardActions";
import { connect } from "react-redux";
import { Row, Grid, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Analytics from "./analytics";
import Heading from "../heading";
import Icon from "../icon";
import Loading from "../loading";
import _ from "lodash";
import Home from "./home";
import Adsets from "./adSets";
import Toggler from "../toggle";
import ActivityIndicator from "../activityIndicator";

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.LoadingMessages = ["Erecting Boards at Ikoyi", "Cleaning Boards", "Powering Boards", "Loading Adverts", "In Traffic on Ikoyi Bridge"];
		this.state = {
			loading: true
		};
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
		const { loading } = this.state;
		const { allCampaigns, match } = this.props;
		if (loading) return <Loading type="step" key={1} messages={this.LoadingMessages} />;
		else
			return (
				<Router>
					<div>
						<Route exact={true} path={`${match.url}`} component={() => <Home allCampaigns={allCampaigns} />} />
						<Route exact={true} path={`${match.url}/adSets`} component={() => <Adsets allCampaigns={allCampaigns} createCampaign={() => "Hello"} />} />
					</div>
				</Router>
			);
	}
}
function mapStateToProps(state) {
	return { allCampaigns: state.campaigns.allCampaigns };
}
const mapDispatchToProps = { fetchCampaign, fetchUser, modalStatus, fetchBoards };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
