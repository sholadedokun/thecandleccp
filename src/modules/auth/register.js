// @flow
import React, { Component } from "react";
import { signUpUser, signinUser } from "../../actions/userActions";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Icon from "../../components/icon";
import Heading from "../../components/heading";
import _ from "lodash";
import ErrorMessage from "../../components/errorMessages";
import { errorHandler } from "../../components/errorHandler";
import { emptyFieldChecker } from "../../components/errorChecker";
class RegisterUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: props.email,
			firstName: "",
			lastName: "",
			phone: "",
			password_confirmation: "",
			password: "",
			role: 0,
			loading: false,
			errors: {},
			errorMessages: []
		};
	}
	registerUser(e) {
		e.preventDefault();
		this.setState({ loading: true, errorMessages: [] });
		let errors = emptyFieldChecker.bind(this, {}, _.omit({ ...this.state }, ["loading", "role", "errors", "errorMessages"]))();
		if (_.isEmpty(errors)) {
			let params = _.omit(this.state, ["firstName", "lastName"]);
			params.name = `${this.state.firstName} ${this.state.lastName}`;
			this.props
				.signUpUser(params)
				.then(data => {
					if (data.id) {
						this.props.signinUser(data.email, this.state.password).then(data => {
							this.props.close("/dashboard");
						});
					}
				})
				.catch(e => this.setState({ loading: false }));
		}
	}
	parseError(errorObject) {
		console.log(errorObject);
		return _.map(errorObject, (item, index) =>
			_.map(item, (subItem, subIndex) => (
				<Col xs={12} key={`${index}.${subIndex}`}>
					{subItem}
				</Col>
			))
		);
	}
	render() {
		const { email, firstName, lastName, phone, password_confirmation, password, loading, errors, errorMessages } = this.state;
		return (
			<Col xs={10} xsOffset={1} sm={8} smOffset={2} md={4} mdOffset={4} className="login">
				<Row>
					<Heading size="lg" title="Create an account" />
					<span className="facebookSignin">
						Sign Up using Facebook <Icon icon="fab fa-facebook-square" />
					</span>
					<Col xs={5}>
						<div className="hrule"> </div>
					</Col>
					<Col xs={2} className="or">
						or
					</Col>
					<Col xs={5}>
						<div className="hrule"> </div>
					</Col>
					<form onSubmit={this.registerUser.bind(this)}>
						<Col xs={12} className="inputField">
							<span className={errors.firstName ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="text" value={firstName} onChange={e => this.setState({ firstName: e.target.value })} placeholder="Firstname" />
							</span>
							<span className={errors.lastName ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="text" value={lastName} onChange={e => this.setState({ lastName: e.target.value })} placeholder="Lastname" />
							</span>
						</Col>
						<Col xs={12} className="inputField">
							<span className={errors.email ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} placeholder="Email" />
							</span>
							<span className={errors.phone ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="text" value={phone} onChange={e => this.setState({ phone: e.target.value })} placeholder="Phone" />
							</span>
						</Col>
						<Col xs={12} className="inputField">
							<span className={errors.password ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} placeholder="Password" />
							</span>
							<span className={errors.password_confirmation ? "inputContainer sm error" : "inputContainer sm"}>
								<input type="password" value={password_confirmation} onChange={e => this.setState({ password_confirmation: e.target.value })} placeholder="Confirm Password" />
							</span>
						</Col>
						<Col xs={12} className="inputField">
							{loading ? (
								<div>
									<Icon icon="fas fa-spinner fa-spin loading" />
								</div>
							) : (
								<button type="submit" className="primaryButton">
									Register
								</button>
							)}
						</Col>
					</form>
					<ErrorMessage errorMessage={this.props.error} />
					<span className="alternate">
						{`Already have an account`} ? <a onClick={() => this.props.close("login")}> Sign In </a>
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
const mapDispatchToProps = { signUpUser, signinUser };
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
