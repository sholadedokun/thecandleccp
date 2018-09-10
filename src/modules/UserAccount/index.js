import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { updateUser, updatePassword } from "../../actions/userActions";
import _ from "lodash";
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
				<h1>The Account Page</h1>
				<h3>Basis Info</h3>
				<form onSubmit={this.changeBasicInfo.bind(this)}>
					<lable>{userDetails.email}</lable>
					<input type="text" placeholder="Email Address" value={email} onChange={e => this.setState({ email: e.target.value })} />
					<lable>{userDetails.name}</lable>
					<input type="text" placeholder="Name" value={name} onChange={e => this.setState({ name: e.target.value })} />
					<lable>{userDetails.phone}</lable>
					<input type="text" placeholder="Phone" value={phone} onChange={e => this.setState({ phone: e.target.value })} />
					<button>Update</button>
				</form>
				<form onSubmit={this.changePassword.bind(this)}>
					<h3>Password Change</h3>
					<input type="password" placeholder="Previous Password" value={password} onChange={e => this.setState({ password: e.target.value })} />
					<input type="password" placeholder="Current Password" value={new_password} onChange={e => this.setState({ new_password: e.target.value })} onKeyUp={this.match.bind(this)} />
					<input type="password" placeholder="Re-type Current Password" value={retypePasssword} onChange={e => this.setState({ retypePasssword: e.target.value })} onKeyUp={this.match.bind(this)} />
					{passwordMatch ? <span>match</span> : retypePasssword.length > 0 ? <div>{`Doesn't Match`}</div> : ""}
					<button>Update</button>
				</form>
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
