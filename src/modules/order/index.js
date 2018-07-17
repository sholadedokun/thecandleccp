import React, { Component } from "react";
import Heading from "../../components/heading";
import { Row, Col } from "react-bootstrap";
import DisplayBoard from "../campaign/components/displayBoard";

import Payment from "./payment";
import ErrorBoundry from "../../js/components/errorBoundry";
export default class Order extends Component {
	paymentSuccessful() {
		//make payment and receive response for payment.
		this.props.addCampaignAdset();
	}

	render() {
		const { campaignDetails, creative, newCampaign, allCampaigns, Board } = this.props.transaction;
		let title = newCampaign ? newCampaign.name : campaignDetails.campaign_name;
		let dateFrom = newCampaign ? newCampaign.dateFrom : allCampaigns.date_from;
		console.log(this.props);
		return (
			<Row className="campaignContainer ">
				<Col xs={6} xsOffset={2} className="boardSelection">
					<Heading size="md" title="Order Details" />
					<div className=" paymentDetails">
						<label>Campaing Name</label>
						<Heading size="sm" title={title} />
						<label>Selected Board</label>
						<Heading size="sm" title={`${Board.name}, ${Board.description}`} />
						<label>Adset Name</label>
						<Heading size="sm" title={campaignDetails.name} />
						<label>Campaign Duration</label>
						<Heading size="sm" title={dateFrom} />

						<label>AdSet Triggers</label>
						<ul className="boardPoints">
							<li>Both Male and Female.</li>
							<li>Between the Ages of 25 and 60.</li>
							<li>All Weather Conditions.</li>
						</ul>
					</div>
					<Heading size="md" title="Payment Details" />
					<ErrorBoundry>
						<Payment paymentStatus={this.paymentSuccessful.bind(this)} amount={campaignDetails.totalCost} />
					</ErrorBoundry>
				</Col>
				<Col xs={4} className="campaignEstimate">
					<div className="">
						<div className="priceEstimate">
							<label>Sample Adset Display</label>
							<DisplayBoard creative={this.props.transaction.creative.creative} top={"38%"} />
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
