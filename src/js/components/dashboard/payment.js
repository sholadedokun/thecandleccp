import React, { Component } from "react";
import Heading from "../heading";
import { Row, Col } from "react-bootstrap";
import CustomeSelect from "../customSelect";
import DisplayBoard from "./displayBoard";
import AddCard from "./addCard";
export default class Payment extends Component {
	makePayment() {
		//make payment and receive response for payment.
		this.props.setCreatives();
	}

	render() {
		const { campaignDetails, creative, newCampaign, allCampaign, Board } = this.props.transaction;
		console.log(this.props);
		return (
			<Row className="campaignContainer ">
				<Col xs="6" xsOffset="2" className="boardSelection">
					<Heading size="md" title="Order Details" />
					<div className=" paymentDetails">
						<label>Campaing Name</label>
						<Heading size="sm" title={newCampaign.name || allCampaign[campaignDetails.campaign_id].name} />
						<label>Selected Board</label>
						<Heading size="sm" title={`${Board.name}, ${Board.description}`} />
						<label>Adset Name</label>
						<Heading size="sm" title={campaignDetails.name} />
						<label>Campaign Duration</label>
						<Heading size="sm" title={newCampaign.dateFrom} />

						<label>AdSet Triggers</label>
						<ul className="boardPoints">
							<li>Both Male and Female.</li>
							<li>Between the Ages of 25 and 60.</li>
							<li>All Weather Conditions.</li>
						</ul>
					</div>
					<Heading size="md" title="Payment Details" />
					<AddCard />
					<button className="primaryButton" onClick={this.makePayment.bind(this)}>
						Make Payment
					</button>
					<button className="cancelButton">Cancel</button>
				</Col>
				<Col xs={4} className="campaignEstimate">
					<div className="">
						<div className="priceEstimate">
							<label>Sample Adset Display</label>
							<DisplayBoard creative={this.props.transaction.creative.creative} />
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
						<div className="priceEstimate">
							<label>Total Cost</label>
							<span className="flexDisplay">
								<Heading size="sm" title="&#8358;" />
								<Heading size="sm" title={` ${campaignDetails.totalCost.formatMoney(2)}`} />
							</span>
							<label>Naira</label>
							<ul className="boardPoints">
								<li>
									<strong>For Bank Transfer</strong>
								</li>
								<li>Guarantee Trust Bank</li>
								<li>Account Name: Alphaandjam Limited.</li>
								<li>Account Number: 0092343434.</li>
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}
