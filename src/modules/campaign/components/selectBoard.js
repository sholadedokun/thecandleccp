import React, { Component } from "react";

import Map from "../../map";
import Heading from "../../../components/heading";
import Icon from "../../../components/icon";
import { Col, Row, Grid } from "react-bootstrap";
export default class SelectBoard extends Component {
	constructor(props) {
		super();
		this.state = {
			selectedBoardIndex: "",
			error: ""
		};
	}
	confirmInput() {
		console.log(this.state.selectedBoardIndex);
		if (this.state.selectedBoardIndex === "") {
			this.setState({ error: "Please select a board to continue" });
			return;
		}
		this.props.selectedBoard(this.props.allBoards[this.state.selectedBoardIndex]);
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
						{this.props.allBoards.map((item, index) => {
							return (
								<Col key={`board_${index}`} xs={6} sm={4}>
									<div key={index} className={selectedBoardIndex === index ? "spaceContainer active" : "spaceContainer"} onClick={() => this.setState({ selectedBoardIndex: index })}>
										<img src={`/${item.imageUrl || "images/space1.jpg"}`} />
										<span className="location">
											<Icon icon="fas fa-map-marker-alt"> </Icon> {item.location}
										</span>
									</div>
								</Col>
							);
						})}

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
