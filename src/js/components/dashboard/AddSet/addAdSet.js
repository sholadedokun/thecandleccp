import React, { Component } from "react";
import Nav from "./navigation";
import { connect } from "react-redux";
import { selectBoard } from "../../../actions/boardActions";
import { createAdset, uploadCreative } from "../../../actions/adSetActions";
import { createCampaign } from "../../../actions/campaignActions";
import SelectBoard from "./selectBoard";
import CampaignDescription from "./campaignDescription";
import UploadCreative from "./uploadAdCreative";
import Order from "../order";
import { Col, Row, Grid } from "react-bootstrap";
import { ADSET_DICTIONARY } from "../../../config.js";
import _ from "lodash";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
class AddAdSet extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 0,
			currentBoardLocations: "",
			baseCost: 300000
		};
	}
	displaySteps() {
		const { currentStep, baseCost } = this.state;
		const { allCampaigns, newCampaign } = this.props;
		console.log(newCampaign);
		//pushing the saved Campaigns into the already existing campaings...
		// if(newCampaign)
		//     allCampaigns.push(newCampaign)
		switch (currentStep) {
			case 0:
				return <SelectBoard key={_.uniqueId()} allBoards={this.props.allBoards} selectedBoard={this.selectedBoard.bind(this)} />;
			case 1:
				return (
					<CampaignDescription
						key={_.uniqueId()}
						setCampaignDetails={this.setCampaignDetails.bind(this)}
						allCampaigns={allCampaigns}
						campaign={newCampaign}
						baseCost={baseCost}
						estimatedCost={newCost => this.setState({ baseCost: newCost })}
					/>
				);
			case 2:
				return <UploadCreative baseCost={baseCost} key={_.uniqueId()} setCreatives={data => this.setState({ creative: data, currentStep: 3 })} />;
			case 3:
				return <Order transaction={{ allCampaigns, newCampaign, ...this.state }} key={_.uniqueId()} setCreatives={this.uploadCreatives.bind(this)} />;
		}
	}
	uploadCreatives() {
		var data = this.state.creative;
		let that = this;
		console.log(this.state);
		let campaignDetails = this.state.campaignDetails;
		if (!this.state.adSet_id) {
			this.props.createCampaign(this.props.newCampaign).then(campaigndata => {
				console.log(campaigndata, campaignDetails);
				campaignDetails.campaign_id = campaigndata.data.id;
				that.props.createAdset(campaignDetails).then(addSet => {
					that.setState({ adSet_id: addSet.id });
					that.uploadCreatives.bind(that, data)();
				});
			});
		} else {
			for (var i = 0; i < data.creative.length; i++) {
				let formData = new FormData();
				if (data.creative[i].type == "image" || data.creative[i].type == "video") {
					formData.append("file", data.creative[i].formEntity);
				} else {
					formData.append("url", data.creative[i].url);
				}
				formData.append("token", localStorage.getItem("TheCandleToken"));
				formData.append("type", data.creative[i].type);
				formData.append("position", data.creative[i].dimension.x.split("|")[0]);
				formData.append("adset_id", this.state.adSet_id);
				this.props.uploadCreative(formData).then(creativeData => {
					console.log(data.creative.length, i);
					if (i == data.creative.length) {
						console.log("here");
						that.props.close();
					}
				});
			}
		}
	}
	selectedBoard(Board) {
		// console.log(Board)
		if (Board) {
			this.props.selectBoard(Board);
			this.setState({ currentStep: 1, Board });
		}
	}
	setCampaignDetails(details) {
		if (details) {
			details.mode = 0;
			console.log(details);
			const { min_age, max_age, gender, weather, traffic } = details;
			//using local config as dictionary to reformat to the required parameters by the API
			details.trigger = {
				min_age,
				mobile: 1,
				gender: ADSET_DICTIONARY.gender[gender],
				weather: ADSET_DICTIONARY.weather[weather],
				traffic: ADSET_DICTIONARY.traffic[traffic]
			};
			//send the details to the API, wait for response and continue to add creatives.

			//if it's a new campaign is selected to be added ...
			if (this.props.newCampaign && this.props.newCampaign.id == details.campaign_id) {
				this.setState({ currentStep: 2, campaignDetails: details });
			} else {
				this.props.createAdset(details).then(data => {
					this.setState({ currentStep: 2, adSet_id: data.id });
				});
			}
		} else {
			this.setState({ currentStep: 2 });
		}
	}
	render() {
		const { currentStep } = this.state;
		return (
			<Col xs={10} xsOffset={1} className="createAdset">
				<Nav currentStep={currentStep} closeModal={this.props.close} />
				<ReactCSSTransitionGroup transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
					{this.displaySteps()}
				</ReactCSSTransitionGroup>
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return {
		allBoards: state.boards.allBoards,
		allCampaigns: state.campaigns.allCampaigns,
		newCampaign: state.campaigns.newCampaignData
		// campaign:state.campaigns.campaignData
	};
}
const mapDispatchToProps = { selectBoard, createAdset, uploadCreative, createCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(AddAdSet);
