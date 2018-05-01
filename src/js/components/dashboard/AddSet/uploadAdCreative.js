import React, { Component } from "react";
import Heading from "../../heading";
import Icon from "../../icon";
import SinglePost from "./uploadSinglePost";
import MultiplePost from "./uploadMultiplePost";
import { Col, Row } from "react-bootstrap";
import { errorHandler } from "../../errorHandler";
import { arrObjectFieldChecker } from "../../errorChecker";
import ErrorMessage from "../../errorMessages";
import _ from "lodash";

export default class uploadAdCreative extends Component {
	constructor(props) {
		super(props);
		this.state = {
			postType: "single",
			creative: [
				{
					type: "",
					dimension: { x: "0|1", y: "0|2" },
					data: "",
					formEntity: {}
				}
			],
			loading: false,
			errorMessages: []
		};
	}
	confirmInput() {
		//send the adSet description to the addAdSet parent container through the setCampaignDetails props
		this.setState({ loading: true, errorMessages: [] });
		let errors = arrObjectFieldChecker.bind(this, [], this.state.creative, "data")();
		console.log(errors);
		if (_.isEmpty(errors)) {
			this.props.setCreatives(this.state);
		}
	}
	componentDidMount() {
		let boardDimension = document.querySelector("#displayBoard").getBoundingClientRect();
		console.log(boardDimension);
		console.log(document.querySelector("#previewContainer").getBoundingClientRect());
		this.setState({
			displayBoardWidth: boardDimension.width
		});
	}
	setCreativeCollage(creativeDimensions) {
		let currentCollage = this.state.creative.splice();
		let newCreativeCollages = _.map(creativeDimensions, (item, index) => {
			let newCreative = {};
			newCreative.dimension = item;
			if (currentCollage[index]) {
				newCreative.type = currentCollage[index].type || "";
				newCreative.data = currentCollage[index].data || "";
				return newCreative;
			}
			newCreative.type = "";
			newCreative.data = "";
			return newCreative;
		});
		this.setState({ creative: newCreativeCollages });
		console.log(newCreativeCollages);
	}
	renderPreview(index, mediaType, e) {
		let reader = new FileReader();
		let allCreatives = this.state.creative;

		if (mediaType != "url") {
			if (!e.target.files || !e.target.files[0]) return;
			let that = this;
			allCreatives[index].formEntity = e.target.files[0];
			reader.onload = function() {
				(allCreatives[index].data = reader.result), (allCreatives[index].type = mediaType);
				console.log(allCreatives);
				that.setState({
					creative: allCreatives
				});
			};
			reader.readAsDataURL(e.target.files[0]);
		} else {
			allCreatives[index].data = e.target.value;
			allCreatives[index].type = mediaType;
			this.setState({
				creative: allCreatives
			});
		}
	}
	mapAdCreativeToBoard() {
		const { creative, displayBoardWidth } = this.state;
		const actualWidth = displayBoardWidth * 0.885;
		const actualHeight = actualWidth * 0.425;
		const style = {
			position: "absolute",
			width: actualWidth,
			height: actualHeight,
			border: "1px solid #595",
			top: "18.7%",
			left: "5.8%"
		};
		const iFrameStyle = {
			"-moz-transform-origin": "top left",
			"-webkit-transform-origin": "top left",
			"-o-transform-origin": "top left",
			"-ms-transform-origin": "top left",
			"transform-origin": "top left",
			width: "1024px",
			height: "768px",
			border: "none",
			"-webkit-transform": "scale(0.5)",
			"-moz-transform": "scale(0.5)"
		};
		const totalCreative = creative.length;
		const unitWidth = actualWidth / totalCreative;
		const unitHeight = actualHeight / 2;
		return (
			<div className="boardGuide" style={style}>
				{_.map(creative, (item, index) => {
					const creativeStyle = {
						display: "inline-block",
						width: unitWidth * parseFloat(item.dimension.x.split("|")[1]),
						height: unitHeight * parseFloat(item.dimension.y.split("|")[1]),
						left: unitWidth * parseFloat(item.dimension.x.split("|")[0]),
						top: unitHeight * parseFloat(item.dimension.y.split("|")[0]),
						position: "absolute",
						overflow: "hidden"
					};
					creativeStyle.border = item.data === "" ? "1px solid #555" : "";
					return (
						<div style={creativeStyle}>
							{(function() {
								switch (item.type) {
									case "image":
										return <img src={item.data} width="100%" />;
									case "video":
										return (
											<video width="100%" autoPlay loop>
												<source src={item.data} />
											</video>
										);
									case "url":
										return <iframe src={item.data} style={iFrameStyle} />;
									default:
										return "";
								}
							})()}
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		const { postType, errorMessages, loading, errors, creative } = this.state;
		return (
			<Row className="campaignContainer">
				<Col xs={12} className="postTypeSelector">
					<Col xs={5} xsOffset={3}>
						<ul>
							<li className={postType === "single" ? "active" : ""} onClick={() => this.setState({ postType: "single" })}>
								Single Post
							</li>
							<li className={postType === "multiple" ? "active" : ""} onClick={() => this.setState({ postType: "multiple" })}>
								Multiple Post
							</li>
						</ul>
					</Col>
				</Col>
				<Col xs={12} md={7} mdOffset={3} className="boardSelection">
					<Heading size="lg" title="Upload Campaign Visuals" />
					<Col xs={12}>
						<Row>
							{postType === "single" ? (
								<SinglePost
									boardWidth="2000"
									boardHeight="1000"
									errors={errors}
									mediaName={creative[0].formEntity}
									changeCollage={this.setCreativeCollage.bind(this)}
									renderPreview={this.renderPreview.bind(this)}
								/>
							) : (
								<MultiplePost boardWidth="2000" boardHeight="1000" errors={errors} changeCollage={this.setCreativeCollage.bind(this)} renderPreview={this.renderPreview.bind(this)} />
							)}
							<Col xs={12} className="creativeContainer imagePreview">
								<Heading size="sm" title="Image Preview" />
								<div className="displayBoardPreview" id="previewContainer">
									<img src="images/displayBoard_1.png" id="displayBoard" className="displayBoard" width="100%" height="100%" />
									{this.mapAdCreativeToBoard()}
								</div>
							</Col>
							<Heading size="sm" title="Disclaimer" />
							<p>
								Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
								vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.
							</p>
						</Row>
					</Col>
					{!loading ? (
						<Col>
							<button className="primaryButton" onClick={e => this.confirmInput()}>
								Next
							</button>
							<button className="cancelButton">Cancel</button>
							{errorMessages ? <ErrorMessage errorMessage={errorMessages} /> : ""}
						</Col>
					) : (
						<p>Uploading Adsets... Please wait</p>
					)}
				</Col>
			</Row>
		);
	}
}
