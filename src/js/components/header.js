import React, { Component } from "react";
import { Row, Col, Navbar, Nav, NavItem } from "react-bootstrap";
import Login from "./auth/loginUser";
import Register from "./auth/register";
import CreateCampaign from "./dashboard/createCampaign";
import AddAdSet from "./dashboard/AddSet/addAdSet";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signoutUser, fetchUser, modalStatus } from "../actions/userActions";
import ReactModal from "react-modal";
import Icon from "./icon";
import CustomeSelect from "./customSelect";
import _ from "lodash";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSub: "ManageAds"
		};
	}

	signoutUser() {
		this.props.signoutUser();
	}
	userLogin = e => (e == "signOut" || e.target.value == "signOut" ? this.signoutUser() : "");
	selectedCustomItem(item) {
		if (item == "signout") {
			this.signoutUser();
		}
	}
	authenticated(user) {
		// console.log(this.props.allCampaigns)
		let modalRoute = this.props.allCampaigns.length > 0 ? "addAdset" : "createCampaign";
		let authenticated_bar_dashboard = [
			<li role="presentation">
				<CustomeSelect
					selectedItem={this.selectedCustomItem.bind(this)}
					selectItem={[{ name: (() => (user.data ? user.data.name : ""))(), value: "" }, { value: "signout", name: "signout" }]}
					rightImage="sdfsdf"
					leftIcon="fas fa-angle-down"
				/>
			</li>,
			<li role="presentation" key={2} onClick={() => this.props.modalStatus(true, modalRoute)}>
				<a className="actionButton post_campaign_ads">Post Ads</a>
			</li>
		];
		let authenticated_bar = [
			<li role="presentation" className="active">
				<Link to="/dashboard">Dashboard</Link>
			</li>,
			<li role="presentation" onClick={this.userLogin.bind(this, "signOut")}>
				<a className="buttonLink">Sign out</a>
			</li>,
			<li role="presentation" onClick={() => this.props.modalStatus(true, modalRoute)}>
				<a className="buttonLink">Post Ads</a>
			</li>
		];
		let unAuthenticate = [
			<li role="presentation" key="2a" onClick={() => this.props.modalStatus(true, "login")}>
				<a className="buttonLink" href="#">
					login
				</a>
			</li>,
			<li role="presentation" key="2b" onClick={() => this.props.modalStatus(true, "register")}>
				<a className="buttonLink" href="#">
					register
				</a>
			</li>
		];
		let regularRoute = [
			<li role="presentation" className="active">
				<Link to="/">Feature</Link>
			</li>,
			<li role="presentation">
				<Link to="/howitworks">How it works</Link>
			</li>,
			<li role="presentation">
				<Link to="/help">Spaces</Link>
			</li>
		];
		let resolvedLinks =
			user.authenticated && this.props.location.pathname.indexOf("/dashboard") > -1
				? authenticated_bar_dashboard // route is authenticated and the view is on dashboard
				: user.authenticated //user is authenticated but on the not on dashboar
					? regularRoute.concat(...authenticated_bar)
					: //user is not authenticated...
					  regularRoute.concat(...unAuthenticate);
		return resolvedLinks;
	}
	handleCloseModal(route) {
		if (!route) return this.props.modalStatus(false, null);
		if (!route.target && route.indexOf("/") < 0) {
			this.props.modalStatus(true, route);
			return;
		}
		this.props.modalStatus(false, null);
		this.props.history.push(route);
	}
	render() {
		const { user, history, location: { pathname }, match } = this.props;
		const { currentSub } = this.state;
		return (
			<Row className={user.authenticated && pathname != "/" ? "nav_dashboard header" : "header homeHeader"}>
				<Col xs="12">
					<Navbar inverse collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="/" className="logo">
									The<span className="sublogo">Candle</span>
								</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav>{this.authenticated(user)}</Nav>
						</Navbar.Collapse>
					</Navbar>

					<ReactModal
						isOpen={user.modalState.isOpen}
						shouldCloseOnOverlayClick={true}
						onRequestClose={this.handleCloseModal.bind(this)}
						className={{
							base: "modalClass",
							afterOpen: "modalClass_after-open",
							beforeClose: "modalClass_before-close"
						}}>
						<ReactCSSTransitionGroup transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
							{user.modalState.page === "login" ? (
								<Login key={_.uniqueId()} close={this.handleCloseModal.bind(this)} />
							) : user.modalState.page == "register" ? (
								<Register key={_.uniqueId()} close={this.handleCloseModal.bind(this)} />
							) : user.modalState.page == "createCampaign" ? (
								<CreateCampaign key={_.uniqueId()} close={this.handleCloseModal.bind(this)} />
							) : (
								<AddAdSet key={_.uniqueId()} close={this.handleCloseModal.bind(this)} />
							)}
						</ReactCSSTransitionGroup>
					</ReactModal>
				</Col>
			</Row>
		);
	}
}
function mapStateToProps(state) {
	return {
		user: state.user,
		allCampaigns: state.campaigns.allCampaigns
	};
}
const mapDispatchToProps = { signoutUser, modalStatus };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
