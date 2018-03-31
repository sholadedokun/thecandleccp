//@flow
import React, { Component } from "react";
import Heading from "../heading";
import Icon from "../icon";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AdvanceTiming from "../timingForm";
import ToolTipMarker from "../tooltip.js";
import "react-day-picker/lib/style.css";
import _ from "lodash";
import ErrorMessage from "../errorMessages";
import { errorHandler } from "../errorHandler";
import { emptyFieldChecker } from "../errorChecker";
import Particules from "react-particles-js";

class AdSetDescription extends Component {
	constructor(props) {
		super(props);
		this.ageOption = [];
		for (let i = 20; i <= 100; i += 5) {
			this.ageOption.push(i);
		}
		console.log(props);
		this.state = {
			data: {
				campaign_id: (() => (props.campaign ? props.campaign.id : ""))(),
				name: "",
				brandColor: "",
				min_age: 20,
				max_age: 25,
				traffic: "all",
				weather: "all",
				gender: "all",
				scenario: [""],
				timing: [""],
				advanceTiming: [""],
				mcpv: 100,
				fastDisplay: ""
			},
			scenariosList: ["Car Accident", "User Stares at Board", "Kim Jong Un Lunched a Nuclear Bomb"],
			loading: false,
			errors: {},
			errorMessages: []
		};
		this.particuleStyle = {
			position: "fixed",
			height: "inherit",
			width: "35%"
		};
		this.particuleConfig = {
			particles: {
				number: {
					value: 380,
					density: {
						enable: true,
						value_area: 800
					}
				},
				color: {
					value: "#ffffff"
				},
				shape: {
					type: "circle",
					stroke: {
						width: 0,
						color: "#000000"
					},
					polygon: {
						nb_sides: 5
					},
					image: {
						src: "img/github.svg",
						width: 100,
						height: 100
					}
				},
				opacity: {
					value: 1,
					random: false,
					anim: {
						enable: false,
						speed: 1,
						opacity_min: 0.5,
						sync: false
					}
				},
				size: {
					value: 3,
					random: true,
					anim: {
						enable: false,
						speed: 20,
						size_min: 0.1,
						sync: false
					}
				},
				line_linked: {
					enable: true,
					distance: 150,
					color: "#ffffff",
					opacity: 0.76,
					width: 1
				},
				move: {
					enable: true,
					speed: 4,
					direction: "none",
					random: false,
					straight: false,
					out_mode: "out",
					bounce: false,
					attract: {
						enable: false,
						rotateX: 600,
						rotateY: 1200
					}
				}
			},
			interactivity: {
				detect_on: "canvas",
				events: {
					onhover: {
						enable: true,
						mode: "grab"
					},
					onclick: {
						enable: true,
						mode: "push"
					},
					resize: true
				},
				modes: {
					grab: {
						distance: 140,
						line_linked: {
							opacity: 1
						}
					},
					bubble: {
						distance: 400,
						size: 40,
						duration: 2,
						opacity: 8,
						speed: 3
					},
					repulse: {
						distance: 200,
						duration: 0.4
					},
					push: {
						particles_nb: 4
					},
					remove: {
						particles_nb: 2
					}
				}
			},
			retina_detect: true
		};
	}
	componentWillReceiveProps(nextProps) {
		errorHandler.bind(this, nextProps)();
	}
	setOptionValue(index, option, e) {
		let data = this.state.data;
		if (arguments.length > 2) {
			data[arguments[1]][arguments[0]] = arguments[2].target.value;
		} else {
			data[arguments[0]] = arguments[1].target.value;
		}
		this.setState({ data });
	}
	addMoreField(dataLable) {
		let data = this.state.data;
		data[dataLable].push("");
		this.setState({ data });
	}
	removeThisField(dataLable, index) {
		let data = this.state.data;
		data[dataLable].splice(index, 1);
		this.setState({ data });
	}
	// selectTime(index, from, to){
	//     let newTime= this.state.data;
	//
	//     if(newTime.advanceTiming.length==0 && (newTime.timing[index]==="" || typeof newTime.timing[index]==="undefined") ){
	//         newTime.timing[index]=`${from} - ${to}`
	//     }
	//     else{
	//         newTime.timing[index]=""
	//     }
	//     this.setState({data:newTime})
	// }
	advanceTimingToggle(operands) {
		let data = this.state.data;
		if (operands == 1) {
			data.advanceTiming.push("");
			data.timing = [""];
			this.setState({ data });
		} else {
			data.advanceTiming = [];
		}
		this.setState({ data });
	}
	setTime(index, position, value) {
		console.log(value);
		let timing = this.state.data.timing;
		timing[index] = timing[index] || {};
		timing[index][position] = value;
		this.setState({
			data: { ...this.state.data, timing }
		});
		console.log(this.state.data.advanceTiming);
	}
	confirmInput() {
		//send the adSet description to the addAdSet parent container through the setCampaignDetails props
		this.setState({ loading: true, errorMessages: [] });
		let errors = emptyFieldChecker.bind(this, {}, _.omit({ ...this.state.data }, ["fastDisplay", "scenario", "advanceTiming"]))();
		if (_.isEmpty(errors)) {
			this.props.setCampaignDetails(this.state.data);
		}
		// this.props.setCampaignDetails();
	}
	render() {
		console.log(this.props);

		const {
			scenariosList,
			errors,
			errorMessages,
			data: { campaign_id, name, brandColor, scenario, max_age, min_age, gender, traffic, weather, timing, advanceTiming, totalSpendAmount, totalSpendType, mcpv, fastDisplay, dateFrom }
		} = this.state;
		const { campaign, allCampaigns } = this.props;
		let newAllCampaigns = campaign && campaign.id ? allCampaigns.concat(campaign) : allCampaigns;
		console.log(errorMessages, allCampaigns);
		return (
			<Row className="campaignContainer">
				<Col xs={3} xsHidden={true}>
					<Row className="descriptMenu">
						<Particules className="particules" style={this.particuleStyle} params={this.particuleConfig} />
						<Col xs="12">
							<Col componentClass="ul" xs={12} className="detailsMenu">
								<li>
									<a href="#campaign_details" role="presentation">
										Brand Details
									</a>
								</li>
								<li>
									<a href="#audience" role="presentation">
										Audience
									</a>
								</li>
								<li>
									<a href="#situation" role="presentation">
										Situation
									</a>
								</li>
								<li>
									<a href="#budget" role="presentation">
										Budget
									</a>
								</li>
								<li>
									<a href="#pricing" role="presentation">
										Pricing
									</a>
								</li>
							</Col>
						</Col>
					</Row>
				</Col>
				<Col xs={12} sm={8} className="boardSelection">
					<Heading size="md" title="Describe Campaign and target Audience" />
					<Col xs={12}>
						<Row id="campaign_details" className="formSections">
							<Heading size="sm" title="Brand Details" />
							<div className="inputField">
								<label> Select Campaign </label>
								<span className={`formField rangeSelect ${errors.campaign_id ? "error" : ""}`}>
									<select
										onChange={e =>
											this.setState({
												data: {
													...this.state.data,
													campaign_id: e.target.value
												}
											})
										}
										value={campaign_id}>
										<option> Please Select A Campaign </option>

										{newAllCampaigns.map((item, index) => (
											<option key={item.id} value={item.id}>
												{item.name}
											</option>
										))}
									</select>
								</span>
							</div>
							<div className="inputField">
								<label> Name </label>
								<span className={`inputContainer lg ${errors.name ? "error" : ""}`}>
									<input
										type="text"
										value={name}
										onChange={e =>
											this.setState({
												data: { ...this.state.data, name: e.target.value }
											})
										}
										name="campaign_name"
										placeholder="Enter Adset Name"
									/>
								</span>
							</div>
							<div className="inputField">
								<label> Brand Major Color </label>
								<span className={`inputContainer md ${errors.brandColor ? "error" : ""}`}>
									<input
										type="text"
										value={brandColor}
										onChange={e =>
											this.setState({
												data: { ...this.state.data, brandColor: e.target.value }
											})
										}
										name="brandColor"
										placeholder="Enter Brand Color Pantone"
									/>
								</span>
								<span className="minimumValues">Hex Code Req.(e.g# FA8943)</span>
							</div>
						</Row>
						<Row id="audience" className="formSections">
							<Heading size="sm" title="Audience" />
							<div className="inputField">
								<label> Age </label>
								<span className={`formField rangeSelect ${errors.min_age ? "error" : ""}`}>
									<select
										onChange={e =>
											this.setState({
												data: { ...this.state.data, min_age: e.target.value }
											})
										}
										value={min_age}>
										{this.ageOption.map((item, index) => (
											<option key={index} value={item}>
												{item}
											</option>
										))}
									</select>
								</span>
								<span className="arrowRange rangeSeperator">
									<Icon icon="fas fa-long-arrow-alt-right"> </Icon>
								</span>
								<span className={`formField rangeSelect ${errors.max_age ? "error" : ""}`}>
									<select
										onChange={e =>
											this.setState({
												data: { ...this.state.data, max_age: e.target.value }
											})
										}
										value={max_age}>
										{this.ageOption.map((item, index) => (
											<option key={index} value={item}>
												{item}
											</option>
										))}
									</select>
								</span>
							</div>
							<div className="inputField">
								<label> Gender </label>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, gender: "all" }
										})
									}>
									<span className={`radioLabel ${gender === "all" ? "active" : ""}`}>All</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, gender: "male" }
										})
									}>
									<span className={`radioLabel ${gender === "male" ? "active" : ""}`}>
										<span className="icon icon-male"> </span>Male
									</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, gender: "female" }
										})
									}>
									<span className={`radioLabel ${gender === "female" ? "active" : ""}`}>
										<span className="icon icon-female"> </span>Female
									</span>
								</span>
							</div>
						</Row>
						<Row id="situation" className="formSections">
							<Heading size="sm" title="Situation" />
							<div className="inputField">
								<label> Traffic </label>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, traffic: "all" }
										})
									}>
									<span className={`radioLabel ${traffic === "all" ? "active" : ""}`}>All Traffic Situations</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, traffic: "light" }
										})
									}>
									<span className={`radioLabel ${traffic === "light" ? "active" : ""}`}>
										<span className="icon icon-streetlight"> </span>Light
									</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, traffic: "heavy" }
										})
									}>
									<span className={`radioLabel ${traffic === "heavy" ? "active" : ""}`}>
										<span className="icon icon-stop"> </span>Heavy
									</span>
								</span>
							</div>
							<div className="inputField">
								<label> Weather </label>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, weather: "all" }
										})
									}>
									<span className={`radioLabel ${weather === "all" ? "active" : ""}`}>All Weather Conditions</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, weather: "rainy" }
										})
									}>
									<span className={`radioLabel ${weather === "rainy" ? "active" : ""}`}>
										<span className="icon icon-rain"> </span>Rainy
									</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, weather: "cloudy" }
										})
									}>
									<span className={`radioLabel ${weather === "cloudy" ? "active" : ""}`}>
										<span className="icon icon-cloudy"> </span>Cloudy
									</span>
								</span>
								<span
									className="inputContainer radio"
									onClick={() =>
										this.setState({
											data: { ...this.state.data, weather: "sunny" }
										})
									}>
									<span className={`radioLabel ${weather === "sunny" ? "active" : ""}`}>
										<span className="icon icon-sun"> </span>Sunny
									</span>
								</span>
							</div>
							<div className="inputField">
								<label> Scenario </label>
								{scenario.map((item, index) => {
									return (
										<div key={_.uniqueId()}>
											<span className="formField">
												<select onChange={this.setOptionValue.bind(this, index, "scenario")} value={scenario[index]}>
													<option value=""> Select a Scenario </option>
													{scenariosList.map((opItems, opIndex) => {
														return (
															<option value={opItems} key={opIndex}>
																{opItems}
															</option>
														);
													})}
												</select>
											</span>
											{index === scenario.length - 1 ? (
												<span className="moreAdder" onClick={this.addMoreField.bind(this, "scenario")}>
													<Icon icon="fas fa-plus-circle" />
												</span>
											) : (
												<span className="moreRemover" onClick={this.removeThisField.bind(this, "scenario", index)}>
													<Icon icon="fas fa-minus-circle" />
												</span>
											)}
										</div>
									);
								})}
							</div>
							<div className="inputField">
								<label> Time Of Display </label>
								{/* <span className="inputContainer radio" onClick={this.selectTime.bind(this, 0,'6:00AM', '12:00PM')}>
                                                              <span className={`radioLabel ${timing[0]==='6:00AM - 12:00PM'?'active':''}`}>6AM - 12PM</span>
                                                            </span>
                                                            <span className="inputContainer radio" onClick={this.selectTime.bind(this, 1,'12:00PM', '6:00PM')}>
                                                              <span  className={`radioLabel ${timing[1]==='12:00PM - 6:00PM'?'active':''}`}>12PM - 6PM</span>
                                                            </span>
                                                            <span  className="inputContainer radio" onClick={this.selectTime.bind(this, 2,'6:00PM', '12:00AM')}>
                                                              <span  className={`radioLabel ${timing[2]==='6:00PM - 12:00AM'?'active':''}`}>6PM - 12AM</span>
                                                            </span>
                                                            <span  className="inputContainer radio" onClick={this.selectTime.bind(this, 3,'12:00AM', '6:00AM')}>
                                                              <span className={`radioLabel ${timing[3]==='12:00AM - 6:00AM'?'active':''}`}>12AM - 6AM</span>
                                                            </span>
                                                            <label>Add Advance Timing
                                                                {
                                                                    advanceTiming.length== 0 ?
                                                                        <span className="moreAdder"  onClick={this.advanceTimingToggle.bind(this, 1)}><Icon icon="plus-circle" /></span>:
                                                                        <span  className="moreRemover" onClick={this.advanceTimingToggle.bind(this, 0)}><Icon icon="minus-circle"  /></span>

                                                             }                                  </label> */}
								{advanceTiming.map((item, index) => {
									return (
										<div className={`${errors.timing ? "error" : ""}`}>
											<AdvanceTiming setNewTime={this.setTime.bind(this, index, "from")} />
											<span className="arrowRange rangeSeperator">
												<Icon icon="fas fa-long-arrow-alt-right" />
											</span>
											<AdvanceTiming setNewTime={this.setTime.bind(this, index, "to")} />
											{advanceTiming.length - 1 === index ? (
												<span className="moreAdder" onClick={this.addMoreField.bind(this, "advanceTiming")}>
													<Icon icon="fas fa-plus-circle" />
												</span>
											) : (
												<span className="moreRemover" onClick={this.removeThisField.bind(this, "advanceTiming", index)}>
													<Icon icon="fas fa-minus-circle" />
												</span>
											)}
										</div>
									);
								})}
							</div>
						</Row>
						<Row id="budget" className="formSections">
							<Heading size="sm" title="Budget" />
							<div className={`inputField ${errors.mcpv ? "error" : ""}`}>
								<label>
									MCPV
									<ToolTipMarker id={_.uniqueId()} tooltip="Minimum Cost Per View.">
										<span>
											<Icon icon="fas fa-question-circle" />
										</span>
									</ToolTipMarker>
								</label>
								<span className="inputContainer">
									<input
										type="text"
										name="mcpv"
										placeholder=""
										value={mcpv}
										onChange={e =>
											this.setState({
												data: { ...this.state.data, mcpv: e.target.value }
											})
										}
									/>
								</span>
								<span className="minimumValues">Minimum Amount is & #8358;100</span>
							</div>
							<div className="inputField">
								<label>
									Fast Display
									<ToolTipMarker id={_.uniqueId()} tooltip="Percentage increase you are willing to pay to secure your spot.">
										<span>
											<Icon icon="fas fa-question-circle" />
										</span>
									</ToolTipMarker>
								</label>
								<span className="formField">
									<select onChange={this.setOptionValue.bind(this, "fastDisplay")} value={fastDisplay}>
										<option value=""> {`No, I don't want fast Display`}</option>
										<option value="Auto Select"> Auto Select </option>
										<option value="10%"> 10 % </option>
									</select>
								</span>
							</div>
						</Row>
					</Col>
					<button className="primaryButton" onClick={this.confirmInput.bind(this)}>
						Next
					</button>
					<button className="cancelButton"> Cancel </button>
					<ErrorMessage errorMessage={errorMessages} />
				</Col>
			</Row>
		);
	}
}
export default AdSetDescription;
