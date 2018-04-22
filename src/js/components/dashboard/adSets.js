import React, { Component } from "react";
import Heading from "../heading";
import Rate from "../rating";
import { Grid, Col } from "react-bootstrap";
import Toggler from "../toggle";
import ActivityIndicator from "../activityIndicator";
import Icon from "../icon";

export default class Adset extends Component {
	render() {
		return (
			<Grid className="dashboard section">
				<Col xs={12} className="campaign_actionables">
					<Col xs={12} sm={6}>
						<Heading size="sm" title={` 4 Campaigns`} />
						<span className="actionButton" onClick={this.props.createCampaign.bind(this)}>
							<Icon icon="fas fa-plus" /> Create Campaign
						</span>
						<span className="formField">Edit</span>
						<span className="formField">Delete</span>
					</Col>
					<Col xs={12} sm={6} className="filter float-sm-right">
						<span className="formField">Sort</span>
						<span className="formField">Export CSV</span>
						<span className="searchInput">
							<input type="text" className="" placeholder="search campaigns" />
							<Icon icon="fas fa-search" size="xs" />
						</span>
					</Col>
				</Col>
				<Col xs="4" className="adSetContainer">
					<div className="adSetPreview">
						<div className="previewImage">
							<span className="checker">
								<input type="checkbox" />
							</span>
						</div>
						<div className="adDescription">
							<div className="adSetTitle">
								<label>Sample AdSet title</label>
								<Toggler status="active" />
							</div>
						</div>
						<div className="adSetStatus">
							<div>
								<label>status</label>
								<ActivityIndicator status={false} />
							</div>
							<div>
								<label>Campaign</label>
								Sample Campaign
							</div>
						</div>
					</div>
					<div className="hrule" />
					<div className="adSetAnalytics">
						<div className="analyt">
							<label>Views</label>
							<span className="analCount">13,000</span>
							<span className="analDesc">People</span>
						</div>
						<div className="analyt">
							<label>Cost</label>
							<span className="analCount">&#8358;245.00</span>
							<span className="analDesc">Per view</span>
						</div>
						<div className="analyt">
							<label>Total Spent</label>
							<span className="analCount">&#8358;1,454,245.00</span>
							<span className="analDesc">&#8358;20,000,000 Budget</span>
						</div>
					</div>
				</Col>
			</Grid>
		);
	}
}
