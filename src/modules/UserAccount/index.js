import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUser, updatePassword } from "../../actions/userActions";
import _ from "lodash";
import Heading from "../../components/heading";
class userAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			phone: props.phone,
			email: props.emal,
			password: "",
			new_password: "",
			retypePasssword: "",
			passwordMatch: false
		};
	}
	changePassword(e) {
		e.preventDefault();
		this.props.updatePassword(_.pick(this.state, ["password", "new_password"])).then(data => console.log(data));
	}
	match(e) {
		let { new_password, retypePasssword } = this.state;
		if (retypePasssword.length > 0) {
			new_password == retypePasssword ? this.setState({ passwordMatch: true }) : this.setState({ passwordMatch: false });
		}
	}
	changeBasicInfo(e) {
		e.preventDefault();
		this.props.updateUser(_.pick(this.state, ["name", "phone", "email"])).then(data => console.log(data));
	}
	render() {
		let { email, name, phone, password, new_password, retypePasssword, passwordMatch } = this.state;
		let { userDetails } = this.props;
		console.log(this.props);
		return (
			<div className="section container">
				<Heading size="md" title="The Account Page" />
				<Col xs={6} className="dashboard  priceEstimate cardDetails">
					<Heading size="sm" title="Basic Info" />
					<form onSubmit={this.changeBasicInfo.bind(this)} className="formSections">
						<div className="inputField">
							<label>Change Email from {userDetails.email}</label>
							<span className="inputContainer md">
								<input type="text" placeholder="New Email Address" value={email} onChange={e => this.setState({ email: e.target.value })} />
							</span>
						</div>
						<div className="inputField">
							<label>Change Name from {userDetails.name}</label>
							<span className="inputContainer md">
								<input type="text" placeholder="Name" value={name} onChange={e => this.setState({ name: e.target.value })} />
							</span>
						</div>
						<div className="inputField">
							<label>{userDetails.phone}</label>
							<span className="inputContainer md">
								<input type="text" placeholder="Phone" value={phone} onChange={e => this.setState({ phone: e.target.value })} />
							</span>
						</div>
						<button className="primaryButton">Update</button>
					</form>
				</Col>
				<Col xs={6} className="dashboard">
					<Heading size="sm" title="Password Update" />
					<form onSubmit={this.changePassword.bind(this)} className="formSections">
						<div className="inputField">
							<label>Previous Password</label>
							<span className="inputContainer">
								<input type="password" placeholder="Type Previous Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
							</span>
						</div>
						<div className="inputField">
							<label>New Password</label>
							<span className="inputContainer ">
								<input type="password" placeholder="Type New Password" value={new_password} onChange={e => this.setState({ new_password: e.target.value })} onKeyUp={this.match.bind(this)} />
							</span>
						</div>
						<div className="inputField">
							<label>Retype New Password</label>
							<span className="inputContainer">
								<input type="password" placeholder="Re-type New Password" value={retypePasssword} onChange={e => this.setState({ retypePasssword: e.target.value })} onKeyUp={this.match.bind(this)} />
							</span>
						</div>
						{passwordMatch ? <span>match</span> : retypePasssword.length > 0 ? <div>{`Doesn't Match`}</div> : ""}
						<button className="primaryButton">Update</button>
					</form>
				</Col>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		userDetails: state.user.data
	};
}
export default connect(mapStateToProps, { updateUser, updatePassword })(userAccount);
