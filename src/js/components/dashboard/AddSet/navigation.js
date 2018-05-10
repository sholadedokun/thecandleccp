import React, { Component } from "react";
import Heading from "../../heading";
import { Col, Row, Grid } from "react-bootstrap";
import Icon from "../../icon";
class navigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBoardLocations: "",
			steps: [
				{
					title: "spaces"
				},
				{
					title: "Description and Target Audience"
				},
				{
					title: "upload Ad Creative"
				},
				{
					title: "Payment"
				}
			]
		};
	}
	render() {
		const { steps } = this.state;
		const { currentStep } = this.props;
		return (
			<Row className="navigator">
				<Col xs={3} className="header">
					<Heading size="md" title="Create Adset" />
				</Col>
				<Col xs={9}>
					<Row>
						<ul>
							{steps.map((item, index) => {
								return (
									<li key={index} className={currentStep === index ? "active" : currentStep > index ? "past" : ""}>
										<span>{`${index + 1}. ${item.title}`}</span>
										<div className={currentStep === index ? "liner activeLiner" : currentStep > index ? "liner" : ""} />
									</li>
								);
							})}
							<li onClick={e => this.props.closeModal()}>
								<Icon icon="far fa-times-circle" /> Close
							</li>
						</ul>
					</Row>
				</Col>
				<Col />
			</Row>
		);
	}
}

export default navigation;
