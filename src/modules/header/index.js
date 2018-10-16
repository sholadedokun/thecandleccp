import React, { Component } from "react";
import { Row, Col, Navbar, Nav, NavItem } from "react-bootstrap";
import Login from "../auth/loginUser";
import Register from "../auth/register";
import CreateCampaign from "../campaign/create";
import AddAdSet from "../campaign/components/addAdSet";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signoutUser, fetchUser, modalStatus } from "../../actions/userActions";
import ReactModal from "react-modal";
import Icon from "../../components/icon";
import CustomeSelect from "../../components/customSelect";
import _ from "lodash";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import "./style.css";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSub: "ManageAds"
		};
		this.goTo = this.goTo.bind(this);
		ReactModal.setAppElement("#root");
	}

	signoutUser() {
		this.props.signoutUser();
	}
	userLogin = e => (e == "signOut" || e.target.value == "signOut" ? this.signoutUser() : "");
	selectedCustomItem(item) {
		if (item.value == "signout") {
			this.signoutUser();
		}
	}
	goTo(route) {
		this.props.history.push(route);
	}
	authenticated(user) {
		// console.log(this.props.allCampaigns)
		let modalRoute = this.props.allCampaigns.length > 0 ? "addAdset" : "createCampaign";
		const navLinks = [
			{
				displayOn: "authenticated_bar_dashboard",
				component: (
					<NavItem key="nav_item_1" className="userAccountCtrl">
						<span className="profilePic">
							<Icon size="sm" icon="fas fa-user-circle" />
						</span>
						<CustomeSelect
							onSelect={this.selectedCustomItem.bind(this)}
							options={[{ name: (() => (user.data ? user.data.name : ""))(), value: "" }, { value: "signout", name: "signout" }]}
							selection={user.data ? user.data.name : ""}
							rightImage="sdfsdf"
							leftIcon="fas fa-angle-down"
						/>
					</NavItem>
				)
			},
			{
				displayOn: "authenticated_bar_dashboard",
				component: (
					<NavItem key="nav_item_2" onClick={() => this.props.modalStatus(true, modalRoute)}>
						<span className="actionButton post_campaign_ads">Post Ads</span>
					</NavItem>
				)
			},
			{
				displayOn: "authenticated_bar",
				component: (
					<NavItem
						key="nav_item_3"
						onClick={() => {
							this.goTo("/dashboard");
						}}>
						Dashboard
					</NavItem>
				)
			},

			{
				displayOn: "regularRoute",
				component: (
					<NavItem
						key="nav_item_9"
						onClick={() => {
							this.goTo("/howitworks");
						}}>
						How it works
					</NavItem>
				)
			},
			{
				displayOn: "regularRoute",
				component: (
					<NavItem
						key="nav_item_10"
						onClick={() => {
							this.goTo("/help");
						}}>
						Spaces
					</NavItem>
				)
			},
			{
				displayOn: "authenticated_bar",
				component: (
					<NavItem key="nav_item_4" onClick={this.userLogin.bind(this, "signOut")}>
						<span className="buttonLink">Sign out</span>
					</NavItem>
				)
			},
			{
				displayOn: "authenticated_bar",
				component: (
					<NavItem key="nav_item_5" onClick={() => this.props.modalStatus(true, modalRoute)}>
						<span className="buttonLink">Post Ads</span>
					</NavItem>
				)
			},
			{
				displayOn: "unAuthenticate",
				component: (
					<NavItem key="nav_item_6" onClick={() => this.props.modalStatus(true, "login")}>
						<span className="buttonLink">login</span>
					</NavItem>
				)
			},
			{
				displayOn: "unAuthenticate",
				component: (
					<NavItem key="nav_item_7" onClick={() => this.props.modalStatus(true, "register")}>
						<span className="buttonLink">register</span>
					</NavItem>
				)
			}
		];
		let resolvedLinks = navLinks
			.filter(link => {
				if (user.authenticated && this.props.location.pathname.indexOf("/dashboard") > -1) {
					return link.displayOn === "authenticated_bar_dashboard";
				} else if (user.authenticated) {
					return link.displayOn === "regularRoute" || link.displayOn === "authenticated_bar";
				} else {
					return link.displayOn === "regularRoute" || link.displayOn === "unAuthenticate";
				}
			})
			.map(link => {
				return link.component;
			});
		// let resolvedLinks =
		// 	user.authenticated && this.props.location.pathname.indexOf("/dashboard") > -1
		// 		? authenticated_bar_dashboard // route is authenticated and the view is on dashboard
		// 		: user.authenticated //user is authenticated but on the not on dashboar
		// 			? regularRoute.concat(...authenticated_bar)
		// 			: //user is not authenticated...
		// 			  regularRoute.concat(...unAuthenticate);
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
				<Col xs={12}>
					<Navbar inverse collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="/" className="logo">
									<img src="/images/Candle-.png" width="100%" />
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
								<Login key={"login"} close={this.handleCloseModal.bind(this)} />
							) : user.modalState.page == "register" ? (
								<Register key={"register"} close={this.handleCloseModal.bind(this)} email={this.props.email} />
							) : user.modalState.page == "createCampaign" ? (
								<CreateCampaign key={"campaign"} close={this.handleCloseModal.bind(this)} />
							) : (
								<AddAdSet key={"addset"} close={this.handleCloseModal.bind(this)} />
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
		allCampaigns: state.campaigns.allCampaigns,
		email: state.user.regEmail
	};
}
const mapDispatchToProps = { signoutUser, modalStatus };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
