import React, { Component } from "react";
import Heading from "../../../components/heading";
import Icon from "../../../components/icon";
import SinglePost from "./uploadSinglePost";
import MultiplePost from "./uploadMultiplePost";
import { Col, Row } from "react-bootstrap";
import { errorHandler } from "../../../components/errorHandler";
import { arrObjectFieldChecker } from "../../../components/errorChecker";
import ErrorMessage from "../../../components/errorMessages";
import _ from "lodash";
import Loading from "../../../components/loading";
import DisplayBoard from "./displayBoard";
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
		this.LoadingMessages = ["Sending Your Media to our Boards", "", "Waiting Response from Boards", "Optimising Media Quality", "Syncing Meida accross all boards"];
	}
	confirmInput() {
		//send the adSet description to the addAdSet parent container through the setCampaignDetails props
		this.setState({ loading: true, errorMessages: [] });
		let errors = arrObjectFieldChecker.bind(this, [], this.state.creative, "data")();
		if (_.isEmpty(errors)) {
			this.props.setCreatives(this.state);
		}
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
	render() {
		const { postType, errorMessages, loading, errors, creative } = this.state;
		return loading == true ? (
			<Row className="campaignContainer">
				<Loading type="flyingDude" key={1} messages={this.LoadingMessages} />
			</Row>
		) : (
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
								<DisplayBoard creative={this.state.creative} />
							</Col>
							<Heading size="sm" title="Disclaimer" />
							<p>
								By clicking next you agree to all candle’s , alpha and jam advertising and content management agreement and Term&Condition , Please visit candle.media/policy for more. <br />
								By clicking next, you also indemnify the network her partners and boards of any legal clams against her by your ad material / campaign.<br />
								Please note that all ads that do not meet our design specification and brand guideline as seen in candle.media/design-brandguidline will not be approved. <br />
							</p>
						</Row>
					</Col>
					<Col>
						<button className="primaryButton" onClick={e => this.confirmInput()}>
							Next
						</button>
						<button className="cancelButton">Cancel</button>
						{errorMessages ? <ErrorMessage errorMessage={errorMessages} /> : ""}
					</Col>
				</Col>
			</Row>
		);
	}
}
