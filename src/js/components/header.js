import React, { Component } from "react";
import { Row, Col, Navbar, Nav, NavItem } from "react-bootstrap";
import Login from "./auth/loginUser";
import Register from "./auth/register";
import CreateCampaign from "./createCampaign";
import AddAdSet from "./AddSet/addAdSet";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signoutUser, fetchUser, modalStatus } from "../actions/userActions";
import ReactModal from "react-modal";
import Icon from "./icon";
class Header extends Component {
	signoutUser() {
		this.props.signoutUser();
	}
	userLogin(e) {
		e== "signOut" || e.target.value == "signOut" ? this.signoutUser() : "";
	}
	authenticated(user) {
		// console.log(this.props.allCampaigns)
		let modalRoute = this.props.allCampaigns.length > 0 ? "addAdset" : "createCampaign";
		let authenticated_bar_dashboard= [
					<li role="presentation" key="1a">
						<div className="formField rangeSelect profile_display">
							<span className="display_pic">
								<Icon icon="user" />
							</span>
							<select onChange={this.userLogin.bind(this)}>
								<option className="">{(() => (user.data ? user.data.name : ""))()}</option>
								<option value="signOut">Sign out</option>
							</select>
						</div>
					</li>,
					<li role="presentation" key="1b" onClick={() => this.props.modalStatus(true, modalRoute)}>
						<a className="actionButton post_campaign_ads" href="#">
							Post Ads
						</a>
					</li>
			  ]
		let authenticated_bar=[
			<li role="presentation" className="active">
				<Link to="/dashboard">Dashboard</Link>
			</li>,
			<li role="presentation"  onClick={this.userLogin.bind(this, "signOut" )}>
				<a className="buttonLink">Sign out</a>
			</li>,
			<li role="presentation"  onClick={() => this.props.modalStatus(true, modalRoute)}>
				<a className="buttonLink">Post Ads</a>
			</li>,
		]
		let unAuthenticate=[
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
		let regularRoute=[
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
			(user.authenticated && this.props.location.pathname=='/dashboard')? 
				authenticated_bar_dashboard // route is authenticated and the view is on dashboard
				: 
				user.authenticated ?//user is authenticated but on the not on dashboar
					regularRoute.concat(...authenticated_bar)
					:
					regularRoute.concat(...unAuthenticate)
		return resolvedLinks;
	}
	handleCloseModal(route) {
		if (!route) return this.props.modalStatus(false, null);
		if (!route.target && route.indexOf("/") < 0) {
			this.props.modalStatus(true, route);
			return;
		}
		this.props.history.push(route);
		this.props.modalStatus(false, null);
	}
	render() {
		const { user, history, location:{pathname} } = this.props;
		console.log(this.props );
		return (
			<Row className={user.authenticated && pathname !="/"  ? "nav_dashboard header" : "header"}>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">TheCandle</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>{this.authenticated(user)}</Nav>
					</Navbar.Collapse>
				</Navbar>
				{(user.authenticated && pathname=="/dashboard") ?  (
					<Row>
						<Col xs="12">
							<div className="hrule" />
							<div className="dashboard_menu">
								<ul>
									<li>Dashboard</li>
									<li>Billings</li>
									<li>Account</li>
								</ul>
							</div>
							<div className="hrule" />
						</Col>
					</Row>
				) : (
					""
				)}
				<ReactModal
					isOpen={user.modalState.isOpen}
					shouldCloseOnOverlayClick={true}
					onRequestClose={this.handleCloseModal.bind(this)}
					className={{
						base: "modalClass",
						afterOpen: "modalClass_after-open",
						beforeClose: "modalClass_before-close"
					}}>
					{user.modalState.page === "login" ? (
						<Login close={this.handleCloseModal.bind(this)} />
					) : user.modalState.page == "register" ? (
						<Register close={this.handleCloseModal.bind(this)} />
					) : user.modalState.page == "createCampaign" ? (
						<CreateCampaign close={this.handleCloseModal.bind(this)} />
					) : (
						<AddAdSet close={this.handleCloseModal.bind(this)} />
					)}
				</ReactModal>
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
