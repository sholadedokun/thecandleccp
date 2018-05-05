import React, { Component } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import "../../../styles/loading.min.css";

export default class Loader extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messageIndex: 0
		};
	}
	// shouldComponentUpdate() {
	// 	return false;
	// }
	componentWillMount() {
		this.timer = setInterval(
			() =>
				this.setState({
					messageIndex: Math.floor(Math.random() * this.props.messages.length)
				}),
			3500
		);
	}
	componentWillUnmount() {
		clearInterval(this.timer);
	}
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="basicTransition" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
				<div className="loading-container">
					{this.props.type == "step" ? (
						<div className="loading-comp">
							<div class="loader">
								<div class="loader__bar" />
								<div class="loader__bar" />
								<div class="loader__bar" />
								<div class="loader__bar" />
								<div class="loader__bar" />
								<div class="loader__ball" />
							</div>
							<div className="messages">{this.props.messages[this.state.messageIndex]}</div>
						</div>
					) : this.props.type == "bouncing-ball" ? (
						<div className="loading-comp">
							<div class="wrap">
								<div class="loading">
									<div class="bounceball" />
									<div class="text">{this.props.messages[this.state.messageIndex]}</div>
								</div>
							</div>
						</div>
					) : (
						<div className="loading-comp">
							<div class="body">
								<span>
									<span />
									<span />
									<span />
									<span />
								</span>
								<div class="base">
									<span />
									<div class="face" />
								</div>
							</div>
							<div class="longfazers">
								<span />
								<span />
								<span />
								<span />
							</div>
							<h1 className="jetPack-text">{this.props.messages[this.state.messageIndex]}</h1>
						</div>
					)}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
