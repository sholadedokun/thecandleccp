// @flow
import React, { Component } from "react";
import { signinUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Heading from "../heading";
import Icon from "../icon";
import { emptyFieldChecker } from "../errorChecker";
import _ from "lodash";
import ErrorMessage from "../errorMessages";
import { errorHandler } from "../errorHandler";
class LoginUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			loading: false,
			errors: {},
			errorMessages: []
		};
	}
	loginUser() {
		this.setState({ loading: true, errorMessages: [] });
		let errors = emptyFieldChecker.bind(this, {}, _.omit({ ...this.state }, ["loading", "errors", "errorMessages"]))();
		if (_.isEmpty(errors)) {
			this.props
				.signinUser(this.state.username, this.state.password)
				.then(data => {
					this.props.close("/dashboard");
				})
				.catch(e => this.setState({ loading: false }));
		}
		// else{
		//     this.setState({errors, loading:false, errorMessages:[...this.state.errorMessages, ['One of more Field(s) need your attention']]})
		// }
	}
	render() {
		const { username, password, loading, errors, errorMessages } = this.state;
		return (
			<Col xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} className="login">
				<Row>
					<Heading size="md" title="Sign in to account" />
					<span className="facebookSignin">
						Sign in using Facebook <Icon icon="fab fa-facebook-square" />
					</span>
					<Col xs="5">
						<div className="hrule" />
					</Col>
					<Col xs="2" className="or">
						or
					</Col>
					<Col xs="5">
						<div className="hrule" />
					</Col>
					<Col xs="12" className="inputField">
						<span className={errors.username ? "inputContainer lg error" : "inputContainer lg"}>
							<input type="text" value={username} onChange={e => this.setState({ username: e.target.value })} placeholder="Email" />
						</span>
					</Col>
					<Col xs="12" className="inputField">
						<span className={errors.password ? "inputContainer lg error" : "inputContainer lg"}>
							<input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} placeholder="Password" />
						</span>
						{loading ? (
							<div>
								<Icon icon="fas fa-spinner fa-spin loading" />
							</div>
						) : (
							<button className="primaryButton" onClick={this.loginUser.bind(this)}>
								Login
							</button>
						)}
					</Col>
					<div>
						<ErrorMessage errorMessage={this.props.error} />
					</div>
					{
						// this.props.error ? <div className="errorNotification animate shake">{ this.props.error}</div>:''
					}
					<div> Forgot Password </div>
					<span className="alternate">
						{`Don't have an account`}?
						<a onClick={() => this.props.close("register")}>Sign Up</a>
					</span>
				</Row>
			</Col>
		);
	}
}
function mapStateToProps(state) {
	return {
		authenticated: state.user.authenticated,
		error: state.user.error
	};
}
const mapDispatchToProps = { signinUser };
export default connect(mapStateToProps, mapDispatchToProps)(LoginUser);
