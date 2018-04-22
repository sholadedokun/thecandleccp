import React, { Component } from "react";

import Map from "../../googleMapWrapper/map";
import Heading from "../../heading";
import Icon from "../../icon";
import { Col, Row, Grid } from "react-bootstrap";
export default class SelectBoard extends Component {
	constructor(props) {
		super();
		this.state = {
			boards: [
				{
					coordinate: "",
					width: "",
					height: "",
					divisibleHeight: 2,
					state: "Lagos",
					address: "4, salvation Road, off Opebi.",
					imageUrl: "images/space1.jpg",
					boardBitmap: "",
					boardDescription: ""
				}
			],
			selectedBoardIndex: "",
			error: ""
		};
	}
	confirmInput() {
		if (this.state.selectedBoardIndex === "") {
			this.setState({ error: "Please select a board to continue" });
			return;
		}
		this.props.selectedBoard(this.state.boards[this.state.selectedBoardIndex]);
	}
	render() {
		const { boards, selectedBoardIndex, error } = this.state;
		return (
			<Row className="campaignContainer">
				<Col xs={5}>
					<Row>
						<Map boards={this.props.allBoards} size="addCampaign" />
					</Row>
				</Col>
				<Col xs={6} className="boardSelection">
					<Heading size="sm" title="Choose a Space to get Started" />
					<span className="formField">
						<select>
							<option>Lagos</option>
						</select>
					</span>
					<Row className="spaceList">
						<Col xs={6} sm={4}>
							{this.props.allBoards.map((item, index) => {
								return (
									<div key={index} className={selectedBoardIndex === index ? "spaceContainer active" : "spaceContainer"} onClick={() => this.setState({ selectedBoardIndex: index })}>
										<img src={item.imageUrl || "images/space1.jpg"} />
										<span className="location">
											<Icon icon="fas fa-map-marker-alt"> </Icon> {item.location}
										</span>
									</div>
								);
							})}
						</Col>
						<Col xs={12} className="errorNotification">
							{error !== "" ? error : ""}
						</Col>
					</Row>

					<button className="primaryButton" onClick={this.confirmInput.bind(this)}>
						Next
					</button>
					<button className="cancelButton" onClick={() => this.setState({ selectedBoardIndex: "" })}>
						Cancel
					</button>
				</Col>
			</Row>
		);
	}
}
