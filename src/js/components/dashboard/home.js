import React, { Component } from "react";

import { fetchCampaign } from "../../actions/campaignActions";
import { fetchUser, modalStatus } from "../../actions/userActions";
import { fetchBoards } from "../../actions/boardActions";
import { connect } from "react-redux";
import { Row, Grid, Col } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Analytics from "./analytics";
import Heading from "../heading";
import Icon from "../icon";
import Loading from "../loading";
import _ from "lodash";
import Home from "./home";
import Toggler from "../toggle";
import ActivityIndicator from "../activityIndicator";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import LiveStream from "./liveStream";
class DashHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalOpen: false,
			dashBoardView: "Campaign",
			modalLoad: "create Campaign",
			analyticsType: "bigLineGraph",
			activeBigline: "impression",
			totalImpression: [19, 36, 23, 32, 22, 45, 36, 30],
			totalView: [7, 15, 13, 25, 22, 35, 30, 37],
			totalReach: [36, 60, 45, 89, 76, 104, 82, 120],
			totalSpent: [1.5, 2.9, 2.0, 4.6, 3.3, 5.3, 4.2, 2.3],
			currentFeed: 0,
			sources: [
				{
					feedLink: {
						src: "http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8",
						type: "application/x-mpegURL"
					},
					feedDesc: {
						name: "Madison",
						location: "Ikoyi-Lekki Bridge"
					}
				},
				{
					feedLink: {
						src: "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
						type: "application/x-mpegURL"
					},
					feedDesc: {
						name: "Fela",
						location: "Falomo Bridge Lagos"
					}
				}
			],
			barChartExample: {
				data: {
					title: "Social Class",
					labels: ["Honda", "Toyota", "Mercedes", "KIA", "Mazda", "Hyundai"],
					datasets: [
						{
							label: "Brand of Vehicles",
							data: [10, 11, 6, 5, 4, 6],
							backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
							borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
							borderWidth: 1
						}
					]
				},
				options: {
					scales: {
						xAxes: [
							{
								gridLines: { display: false, tickMarkLength: 25 }
							}
						],
						yAxes: [
							{
								gridLines: { drawBorder: false, tickMarkLength: 40 }
							}
						]
					},
					legend: { display: false }
				}
			},
			doughnutChartExample: {
				data: {
					title: "Audience",
					datasets: [
						{
							data: [32, 28, 24, 16],
							backgroundColor: ["#00B7FF", "#0087FF", "#2F00FF", "#AD00FF"]
						}
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: ["Elite", "Upper Mid", "Lower Mid", "Poor"]
				},
				options: {
					legend: { display: false },
					elements: {
						arc: {
							borderColor: "#000",
							borderWidth: 0
						}
					},
					tooltips: {
						backgroundColor: "rgba(0, 183, 255, 100)",
						xPadding: 15,
						yPadding: 10
					}
				}
			},
			polarArearExample: {
				data: {
					title: "Audience",
					datasets: [
						{
							data: [15, 13, 12],
							backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 1)"]
						}
					],

					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: ["Class A Citizens", "Class B Citizens", "Class c Citizens"]
				},
				options: {}
			},
			lineChart: {
				data: {
					datasets: [
						{
							label: "View Impression",
							data: [19, 36, 23, 32, 22, 45, 36, 30],
							backgroundColor: ["rgba(0, 183, 255, 0.1)"],
							borderWidth: 2,
							borderColor: ["rgba(0, 183, 255, 100)"],
							spanGaps: false,
							pointRadius: 0,
							pointHitRadius: 15,
							pointHoverBackgroundColor: "rgba(0, 183, 255, 100)",
							pointHoverRadius: 5,
							pointHoverBorderColor: "rgba(0, 183, 255, 100)"
						}
					],
					// These labels appear in the legend and in the tooltips when hovering different arcs
					labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
				},
				options: {
					scales: {
						xAxes: [
							{
								gridLines: { display: false, tickMarkLength: 25 },
								ticks: {}
							}
						],
						yAxes: [
							{
								gridLines: { drawBorder: false, tickMarkLength: 40 },
								ticks: {},
								position: "bottom"
							}
						]
					},
					legend: { display: false },
					tooltips: {
						backgroundColor: "rgba(0, 183, 255, 100)",
						xPadding: 15,
						yPadding: 10
					}
				}
			},
			numberStat: {
				data: {
					title: "Car Count",
					datasets: [
						{
							title: "Car Count",
							data: [2344543, 1364345, 450323, 343245]
						}
					],
					label: ["Vehicles", "Cars", "trucks", "motocycles"]
				}
			}
		};
	}
	displayAdsets(index) {
		this.props.changeRoute("/adSets/" + index);
	}
	createCampaign() {
		this.props.modalStatus(true, "createCampaign");
	}
	addAdSet() {
		this.props.modalStatus(true, "addAdSet");
	}
	setBigline(value, type) {
		let lineChart = this.state.lineChart;
		//update the data of the dataset of the example;
		lineChart.data.datasets[0].data = value;
		this.setState({ lineChart, activeBigline: type });
	}
	render() {
		const { modalOpen, modalLoad, analyticsType, totalView, totalReach, totalSpent, totalImpression, activeBigline } = this.state;
		const { allCampaigns } = this.props;
		let totalCampaigns = allCampaigns ? allCampaigns.length : 0;
		return (
			<Grid className="dashboard section">
				<Col xs={12} className="analyticsBoard">
					<Row>
						<ul className="analyticsMenu">
							<li
								onClick={e =>
									this.setState({
										analyticsType: "bigLineGraph"
									})
								}
								className={analyticsType == "bigLineGraph" ? "active" : ""}>
								<span className="icon-stats" />
							</li>
							<li
								onClick={e =>
									this.setState({
										analyticsType: "demoGraph"
									})
								}
								className={analyticsType == "demoGraph" ? "active" : ""}>
								<span className="icon-Shape" />
							</li>
							<li
								onClick={e =>
									this.setState({
										analyticsType: "liveStream"
									})
								}
								className={analyticsType == "liveStream" ? "active" : ""}>
								<span className="icon-camera" />
							</li>
						</ul>
						<div className="viewBoard">
							<ReactCSSTransitionGroup transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
								{analyticsType == "bigLineGraph" ? (
									<Col xs={12} className="bigLineMenu" componentClass="ul">
										<li className={activeBigline == "impression" ? "active" : ""} onClick={this.setBigline.bind(this, totalImpression, "impression")}>
											<label>Impressions</label>
											<span className="value">12,235,323</span>
										</li>
										<li className={activeBigline == "views" ? "active" : ""} onClick={this.setBigline.bind(this, totalView, "views")}>
											<label>Views</label>
											<span className="value">1,405,863</span>
										</li>
										<li className={activeBigline == "reach" ? "active" : ""} onClick={this.setBigline.bind(this, totalReach, "reach")}>
											<label>Reach</label>
											<span className="value">4,778,203</span>
										</li>
										<li className={activeBigline == "spent" ? "active" : ""} onClick={this.setBigline.bind(this, totalSpent, "spent")}>
											<label>Total Spent</label>
											<span className="value">&#8358;31,456,110</span>
										</li>
									</Col>
								) : (
									""
								)}
							</ReactCSSTransitionGroup>

							<Col xs={12} className="viewContainer">
								<ReactCSSTransitionGroup transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
									{analyticsType != "liveStream" ? (
										<span className="inputField timeline">
											<span className="formField">
												<select>
													<option>Weekly</option>
													<option>Monthly</option>
													<option>Yearly</option>
												</select>
											</span>
										</span>
									) : (
										""
									)}
								</ReactCSSTransitionGroup>
								<ReactCSSTransitionGroup transitionName="basicTransition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
									{analyticsType == "bigLineGraph" ? (
										<Analytics xs={12} key="analytics" name="lineChart" dataSet={[this.state.lineChart.data]} options={this.state.lineChart.options} height={20} type="line" />
									) : analyticsType == "demoGraph" ? (
										<span key="graph" className="analyticsContainer">
											<Analytics
												xs={12}
												sm={12}
												md="4"
												classN="analytics"
												name="barExample"
												dataSet={[this.state.barChartExample.data, []]}
												options={this.state.barChartExample.options}
												height={90}
												type="bar"
											/>
											<Analytics xs={12} sm={12} md="4" classN="analytics" name="numberStat" dataSet={[this.state.numberStat.data, []]} height={90} type="numberStat" />
											<Analytics
												xs={12}
												sm={12}
												md="4"
												classN="analytics"
												name="doughExample"
												dataSet={[this.state.doughnutChartExample.data, []]}
												options={this.state.doughnutChartExample.options}
												height={80}
												type="doughnut"
											/>
										</span>
									) : (
										<Row key="liveStream" className="liveStreamContainer">
											<Col xs={12} className="nop">
												<Col xs={1} componentClass="ul" className="liveFeeds">
													<li onClick={e => this.setState({ currentFeed: 0 })}>
														Madison<i />
													</li>
													<li onClick={e => this.setState({ currentFeed: 1 })}>
														Fela<i />
													</li>
												</Col>
												<Col xs="11" className="VideoDisplay">
													<LiveStream key="liveStream" sources={this.state.sources[this.state.currentFeed].feedLink} feedDescription={this.state.sources[this.state.currentFeed].feedDesc} />
												</Col>
											</Col>
										</Row>
									)}
								</ReactCSSTransitionGroup>
							</Col>
						</div>
					</Row>
				</Col>

				<Col xs={12} className="campaignTable">
					<Col xs={12} className="campaign_actionables">
						<Col xs={12} sm={6}>
							<Heading size="sm" title={` ${totalCampaigns}  Campaigns`} />
							<span className="actionButton" onClick={this.createCampaign.bind(this)}>
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
					<Col xs={12} className="list_header">
						<ul className="campaign_header">
							<li>&nbsp;</li>
							<li>&nbsp;</li>
							<li>Campaign Name</li>
							<li>Status</li>
							<li>Views</li>
							<li>Cost</li>
							<li>Schedule</li>
							<li>Spent Today</li>
							<li>Total Spent</li>
						</ul>
					</Col>
					{_.map(allCampaigns, (item, index) => {
						return (
							<Col componentClass="ul" className="each_campaign" key={_.uniqueId()} onClick={this.displayAdsets.bind(this, item.id)}>
								<li>
									<span>
										<input type="checkbox" />
									</span>
								</li>
								<li>
									<Toggler status={item.status} />
								</li>
								<li>{item.name}</li>
								<li>
									<span className={`activityIndicator ${!item.activity ? "inactive" : item.activity == "active" ? "active" : "completed"}`} />
									<span>{item.activity || "inactive"}</span>
								</li>
								<li className="value">
									<span className="campaign_value">{item.budget}</span>
									<span className="value_description">people</span>
								</li>
								<li className="value">
									<span className="campaign_value">$50.00</span>
									<span className="value_description">per view</span>
								</li>
								<li className="value">
									<span className="campaign_value">08/11/2017</span>
									<span className="value_description">to 11/12/2017</span>
								</li>
								<li className="value">
									<span className="campaign_value">$34.34</span>
									<span className="value_description">$99.99 Budget</span>
								</li>
								<li className="value ">
									<span className="campaign_value">$10,000.00</span>
									<span className="value_description">$25,000.00 Budget</span>
								</li>
							</Col>
						);
					})}
					{allCampaigns ? (
						<Col xs={12} className="total_result" key={_.uniqueId()}>
							<Heading size="xs" title={`Result from all ${allCampaigns.length} campaigns`} />
							<span className="total_view">
								<span className="campaign_value">1,040,000.00</span>
								<span className="value_description">People</span>
							</span>
							<span className="total_spent">
								<span className="campaign_value">$104,000.00</span>
								<span className="value_description">$250,000.00</span>
							</span>
							<span className="total_budget">
								<span className="campaign_value">$81,040,000.00</span>
								<span className="value_description">$100,000,000.00</span>
							</span>
						</Col>
					) : (
						""
					)}
				</Col>
			</Grid>
		);
	}
}

const mapDispatchToProps = { modalStatus };
export default connect(null, mapDispatchToProps)(DashHome);
