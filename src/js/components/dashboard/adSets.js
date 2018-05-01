import React, { Component } from "react";
import Heading from "../heading";
import Rate from "../rating";
import { Grid, Col } from "react-bootstrap";
import Toggler from "../toggle";
import ActivityIndicator from "../activityIndicator";
import Icon from "../icon";
import { fetchAdset } from "../../actions/adSetActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
class Adset extends Component {
	componentWillMount() {
		// this.props.adSet ? "" : this.props.fetchAdset(this.props.match.params.campaignId);
		this.props.fetchAdset(this.props.match.params.campaignId);
	}
	render() {
		const { adSet } = this.props;
		return (
			<Grid className="dashboard section">
				<Col xs={12} className="campaign_actionables">
					<Col xs={12} sm={6}>
						<Heading size="sm" title={` ${adSet ? adSet.length : 0} Adsets`} />
						<span className="actionButton" onClick={this.props.createCampaign.bind(this)}>
							<Icon icon="fas fa-plus" /> Create AdSet
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
				{!_.isEmpty(adSet)
					? adSet.map(item => (
							<Col xs="4" className="nop">
								<div className="adSetContainer">
									<div className="adSetPreview">
										<div className="previewImage">
											<span className="checker">
												<input type="checkbox" />
											</span>
										</div>
										<div className="adDescription">
											<div className="adSetTitle">
												<label>{item.name}</label>
												<Toggler status="active" />
											</div>
										</div>
										<div className="adSetStatus">
											<div>
												<label>status</label>
												<ActivityIndicator status={item.status ? true : false} />
											</div>
											<div>
												<label>Campaign</label>
												Sample Campaign name
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
								</div>
							</Col>
					  ))
					: ""}
			</Grid>
		);
	}
}
function mapStateToProps(state) {
	return {
		adSet: state.adSet.allAdsets
	};
}
export default connect(mapStateToProps, { fetchAdset })(withRouter(Adset));
