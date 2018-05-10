import React, { Component } from "react";
import Heading from "../heading";
import { Row, Col } from "react-bootstrap";
import CustomeSelect from "../customSelect";
export default class Payment extends Component {
	constructor() {
		super();
		this.state = {};
		this.focusInput = this.focusInput.bind(this);
		this.keyDowned = this.keyDowned.bind(this);
		this.isNumberKey = this.isNumberKey.bind(this);
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
	isNumberKey(evt) {
		evt.target.value = evt.target.value.replace(/[^\d]/, "");
	}
	selectedCustomItem(item) {
		if (item == "signout") {
			this.signoutUser();
		}
	}
	render() {
		return (
			<Row className="campaignContainer ">
				<Col xs="5" xsOffset="3" className="boardSelection">
					<Heading size="md" title="Order Details" />
					<div className=" paymentDetails">
						<label>Campaing Name</label>
						<Heading size="sm" title="Sample Campaign Name" />
						<label>Selected Board</label>
						<Heading size="sm" title="Madison, Ikoyi Lagos" />
						<label>Adset Name</label>
						<Heading size="sm" title="Coca Cola Big Boy" />
						<label>Campaign Duration</label>
						<Heading size="sm" title="23rd May, 2018 - 4th June, 2018" />

						<label>AdSet Triggers</label>
						<ul className="boardPoints">
							<li>Both Male and Female.</li>
							<li>Between the Ages of 25 and 60.</li>
							<li>All Weather Conditions.</li>
						</ul>
					</div>
					<Heading size="md" title="Payment Details" />
					<div class="priceEstimate cardDetails">
						<div class="cardInput priceDetails">
							<div class="cardFieldGroup">
								<div class="eachField">
									<label>CARD NUMBER</label>
									<div class="inputField" id="cardNumber">
										<input type="text" maxLength="4" name="1" required onClick={this.focusInput} onKeyUp={this.isNumberKey} onKeyDown={this.keyDowned} />
										<input type="text" maxLength="4" name="2" required onClick={this.focusInput} onKeyUp={this.isNumberKey} onKeyDown={this.keyDowned} />
										<input type="text" maxLength="4" name="3" required onKeyDown={this.keyDowned} onKeyUp={this.isNumberKey} onClick={this.focusInput} />
										<input type="text" maxLength="4" name="4" required onKeyDown={this.keyDowned} onKeyUp={this.isNumberKey} onClick={this.focusInput} />
									</div>
								</div>
							</div>
							<div class="cardFieldGroup">
								<div class="eachField_multi">
									<label>EXPIRATION DATE</label>
									<div class="inputField">
										<CustomeSelect
											selectedItem={this.selectedCustomItem.bind(this)}
											selectItem={[{ name: "Jan", value: "01" }, { name: "Feb", value: "02" }]}
											rightImage="sdfsdf"
											leftIcon="fas fa-angle-down"
										/>
									</div>
								</div>
								<div class="eachField_multi">
									<label>&nbsp;&nbsp;</label>
									<div class="inputField">
										<CustomeSelect
											selectedItem={this.selectedCustomItem.bind(this)}
											selectItem={[{ name: "18", value: "18" }, { name: "19", value: "19" }, { name: "20", value: "20" }, { name: "21", value: "21" }, { name: "22", value: "22" }]}
											rightImage="sdfsdf"
											leftIcon="fas fa-angle-down"
										/>
									</div>
								</div>
								<div class="eachField_multi">
									<label>CVV</label>
									<div class="inputField" id="cvv">
										<input type="text" maxLength="3" />
									</div>
								</div>
							</div>
							<div class="cardFieldGroup">
								<div class="eachField">
									<label>CARDHOLDERS NAME</label>
									<div class="inputField" id="holdersName">
										<input type="text" />
									</div>
								</div>
							</div>
						</div>
					</div>
					<button className="primaryButton">Make Payment</button>
					<button className="disabledButton">Cancel</button>
				</Col>
				<Col xs={4} className="campaignEstimate">
					<div className="estimateContainer">
						<div className="priceEstimate">
							<label>Sample Adset Display</label>
							<div className="displayBoardPreview" id="previewContainer">
								<img src="images/displayBoard_1.png" id="displayBoard" className="displayBoard" width="100%" height="100%" />
								{
									// this.mapAdCreativeToBoard()
								}
							</div>
						</div>
						<div className="priceEstimate">
							<label>Estimated Audience size</label>
							<Heading size="sm" title="3,500,000+" />
							<label>People</label>
							<ul className="boardPoints">
								<li>People living and Working around Ikoyi, Lekki and Ajah.</li>
								<li>Mostly Office Hours Workers.</li>
								<li>Between the Ages of 25 and 60.</li>
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}
