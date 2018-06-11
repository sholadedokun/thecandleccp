import React, { Component } from "react";
import CustomeSelect from "../customSelect";
import { addCard } from "../../actions/paymentActions";
import { connect } from "react-redux";
import ErrorMessages from "../errorMessages";
class AddCard extends Component {
	constructor() {
		super();
		this.state = {
			cvv: null,
			expiry_month: null,
			expiry_year: null,
			pin: null
		};
		this.focusInput = this.focusInput.bind(this);
		this.keyDowned = this.keyDowned.bind(this);
		this.isNumberKey = this.isNumberKey.bind(this);
	}
	isNumberKey(evt) {
		evt.target.value = evt.target.value.replace(/[^\d]/, "");
	}
	focusInput(input) {
		var thisInput = input.target;
		if (thisInput.name != 1) {
			if (thisInput.previousSibling.value.length < 4) {
				return thisInput.previousSibling.click();
			}
			return thisInput.focus();
		}
		thisInput.focus();
	}
	keyDowned(input) {
		var thisInput = input.target;
		var thisKeyId = input.keyCode;

		if (thisKeyId != 46 && thisKeyId != 8) {
			if (thisInput.nextSibling) {
				if (thisInput.value.length == 4) {
					return thisInput.nextSibling.focus();
				}
			}
		} else {
			if (thisInput.value.length == 0 && thisInput.previousSibling) {
				return thisInput.previousSibling.focus();
			}
		}
	}
	addCard() {
		let cardDetails = {
			card_no: this.state.card1 + this.state.card2 + this.state.card3 + this.state.card4,
			cvv: this.state.cvv,
			expiry_month: this.state.expiry_month,
			expiry_year: this.state.expiry_year,
			pin: this.state.pin
		};
		this.props.addCard(cardDetails).then(data => console.log(data));
	}
	render() {
		return (
			<div class="priceEstimate cardDetails">
				<div class="cardInput priceDetails">
					<div class="cardFieldGroup">
						<div class="eachField">
							<label>CARD NUMBER</label>
							<div class="inputField" id="cardNumber">
								<input
									type="text"
									maxLength="4"
									name="1"
									required
									onClick={this.focusInput}
									onKeyUp={this.isNumberKey}
									onKeyDown={this.keyDowned}
									onChange={e => this.setState({ card1: e.target.value })}
									value={this.state.card1}
								/>
								<input
									type="text"
									maxLength="4"
									name="2"
									required
									onClick={this.focusInput}
									onKeyUp={this.isNumberKey}
									onKeyDown={this.keyDowned}
									onChange={e => this.setState({ card2: e.target.value })}
									value={this.state.card2}
								/>
								<input
									type="text"
									maxLength="4"
									name="3"
									required
									onKeyDown={this.keyDowned}
									onKeyUp={this.isNumberKey}
									onClick={this.focusInput}
									onChange={e => this.setState({ card3: e.target.value })}
									value={this.state.card3}
								/>
								<input
									type="text"
									maxLength="4"
									name="4"
									required
									onKeyDown={this.keyDowned}
									onKeyUp={this.isNumberKey}
									onClick={this.focusInput}
									onChange={e => this.setState({ card4: e.target.value })}
									value={this.state.card4}
								/>
							</div>
						</div>
					</div>
					<div class="cardFieldGroup">
						<div class="eachField_multi">
							<label>EXPIRATION DATE</label>
							<div class="inputField">
								<CustomeSelect
									selectedItem={item => this.setState({ expiry_month: item })}
									selectItem={[
										{ name: "Jan", value: "01" },
										{ name: "Feb", value: "02" },
										{ name: "Mar", value: "03" },
										{ name: "Apr", value: "04" },
										{ name: "May", value: "05" },
										{ name: "Jun", value: "06" },
										{ name: "Jul", value: "07" },
										{ name: "Aug", value: "08" },
										{ name: "Sep", value: "09" },
										{ name: "Oct", value: "10" },
										{ name: "Nov", value: "11" },
										{ name: "Dec", value: "10" }
									]}
									rightImage="sdfsdf"
									leftIcon="fas fa-angle-down"
								/>
							</div>
						</div>
						<div class="eachField_multi">
							<label>&nbsp;&nbsp;</label>
							<div class="inputField">
								<CustomeSelect
									selectedItem={item => this.setState({ expiry_year: item })}
									selectItem={[
										{ name: "18", value: "18" },
										{ name: "19", value: "19" },
										{ name: "20", value: "20" },
										{ name: "21", value: "21" },
										{ name: "22", value: "22" },
										{ name: "23", value: "23" },
										{ name: "24", value: "24" }
									]}
									rightImage="sdfsdf"
									leftIcon="fas fa-angle-down"
								/>
							</div>
						</div>
						<div class="eachField_multi">
							<label>CVV</label>
							<div class="inputField" id="cvv">
								<input type="text" maxLength="3" onChange={e => this.setState({ cvv: e.target.value })} value={this.state.cvv} />
							</div>
						</div>
					</div>
					<div class="cardFieldGroup">
						<div class="eachField">
							<label>CARD PIN</label>
							<div class="inputField" id="holdersName">
								<input type="password" onChange={e => this.setState({ pin: e.target.value })} value={this.state.pin} />
							</div>
						</div>
					</div>
				</div>
				<button className="primaryButton" onClick={this.addCard.bind(this)}>
					Add Card
				</button>
				<button className="cancelButton">Cancel</button>
				{this.props.error ? <ErrorMessages errorMessage={[this.props.error]} /> : ""}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		error: state.payment.error
	};
}
export default connect(mapStateToProps, { addCard })(AddCard);
