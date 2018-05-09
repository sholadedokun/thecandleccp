import React, { Component } from "react";
import Heading from "../heading";
import { Row, Col } from "react-bootstrap";
export default class Payment extends Component {
	constructor() {
		super();
		this.state = {};
		this.focusInput = this.focusInput.bind(this);
		this.keyDowned = this.keyDowned.bind(this);
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
		if (thisInput.name != 4) {
			if (thisInput.value.length == 4) {
				return thisInput.nextSibling.focus();
			}
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
										<input type="text" maxLength="4" name="1" required onClick={this.focusInput} onKeyDown={this.keyDowned} />
										<input type="text" maxLength="4" name="2" required onClick={this.focusInput} onKeyDown={this.keyDowned} />
										<input type="text" maxLength="4" name="3" required onKeyDown={this.keyDowned} onClick={this.focusInput} />
										<input type="text" maxLength="4" name="4" required onKeyDown={this.keyPressed} onClick={this.focusInput} />
									</div>
								</div>
							</div>
							<div class="cardFieldGroup">
								<div class="eachField_multi">
									<label>EXPIRATION DATE</label>
									<div class="inputField">
										<input type="text" />
									</div>
								</div>
								<div class="eachField_multi">
									<label>&nbsp;&nbsp;</label>
									<div class="inputField">
										<input type="text" />
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
