import React, { Component } from "react";
import CustomeSelect from "../../components/customSelect";
import { addCard, validateOTP } from "../../actions/paymentActions";
import { connect } from "react-redux";
import ErrorMessages from "../../components/errorMessages";
import Icon from "../../components/icon";
class AddCard extends Component {
	constructor() {
		super();
		this.state = {
			card1: "",
			card2: "",
			card3: "",
			card4: "",
			cvv: "",
			expiry_month: "",
			expiry_year: "",
			pin: ""
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
		this.setState({ addingCard: true });
		let cardDetails = {
			card_no: this.state.card1 + this.state.card2 + this.state.card3 + this.state.card4,
			cvv: this.state.cvv,
			expiry_month: this.state.expiry_month,
			expiry_year: this.state.expiry_year,
			pin: this.state.pin
		};
		this.props.onAddCard(cardDetails)
	}

	render() {
		return (
			<div className="priceEstimate cardDetails">
				<div className="cardInput priceDetails">
					<div className="cardFieldGroup">
						<div className="eachField">
							<label>CARD NUMBER</label>
							<div className="inputField" id="cardNumber">
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
					<div className="cardFieldGroup">
						<div className="eachField_multi">
							<label>EXPIRATION DATE</label>
							<div className="inputField">
								<CustomeSelect
									onSelect={item => this.setState({ expiry_month: item.value })}
									options={[
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
									selection={this.state.expiry_month}
									rightImage="sdfsdf"
									leftIcon="fas fa-angle-down"
								/>
							</div>
						</div>
						<div className="eachField_multi">
							<label>&nbsp;&nbsp;</label>
							<div className="inputField">
								<CustomeSelect
									onSelect={item => this.setState({ expiry_year: item.value })}
									options={[
										{ name: "18", value: "18" },
										{ name: "19", value: "19" },
										{ name: "20", value: "20" },
										{ name: "21", value: "21" },
										{ name: "22", value: "22" },
										{ name: "23", value: "23" },
										{ name: "24", value: "24" }
									]}
									selection={this.state.expiry_year}
									rightImage="sdfsdf"
									leftIcon="fas fa-angle-down"
								/>
							</div>
						</div>
						<div className="eachField_multi">
							<label>CVV</label>
							<div className="inputField" id="cvv">
								<input type="text" maxLength="3" onChange={e => this.setState({ cvv: e.target.value })} value={this.state.cvv} />
							</div>
						</div>
					</div>
					<div className="cardFieldGroup">
						<div className="eachField">
							<label>CARD PIN</label>
							<div className="inputField" id="holdersName">
								<input type="password" onChange={e => this.setState({ pin: e.target.value })} value={this.state.pin} />
							</div>
						</div>
					</div>
				</div>
				<div>
					{this.props.loading &&
					<div>
						<Icon icon="fas fa-spinner fa-spin loading" />
					</div>}
					<div>
						<button className="primaryButton" onClick={this.addCard.bind(this)}>
							Add Card
						</button>
						<button className="cancelButton" onClick={this.props.cancelCard}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default AddCard;
