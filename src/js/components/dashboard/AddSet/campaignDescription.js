//@flow
import React, { Component } from "react";
import Heading from "../../heading";
import Icon from "../../icon";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import AdvanceTiming from "../timingForm";
import ToolTipMarker from "../../tooltip.js";
import "react-day-picker/lib/style.css";
import _ from "lodash";
import ErrorMessage from "../../errorMessages";
import { errorHandler } from "../../errorHandler";
import { emptyFieldChecker } from "../../errorChecker";
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
				timing: [{ from: "", to: "" }],
				advanceTiming: [""],
				mcpv: 100,
				fastDisplay: ""
			},
			baseInterval: "2|min",
			cyclePerMin: 3, //number of cycle an Image adevert can occur within a min.
			minCyclePerDay: 20, //minimum number of cycle that an adset can have in a day
			minAdDays: 30, //minimum Number of days an adset can be added;
			minCost: 100, //minimum number of cost per cycle
			priceAugument: {
				age: { value: 0.1, amount: 0 },
				time: { value: 0.1, amount: 0 },
				weather: { value: 0.1, amount: 0 },
				scenario: { value: 0.1, amount: 0 },
				traffic: { value: 0.1, amount: 0 },
				gender: { value: 0.1, amount: 0 }
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
		data[dataLable].push({ from: "", to: "" });
		this.setState({ data });
	}
	removeThisField(dataLable, index) {
		let data = this.state.data;
		data[dataLable].splice(index, 1);
		this.setState({ data });
	}
	componentWillMount() {
		let totalCost = this.updateBaseCost(this.state.minCost);
		this.setState({ totalCost, baseCost: totalCost, lowestMinCost: this.state.minCost });
	}
	updateBaseCost(minCost) {
		return minCost * this.state.minCyclePerDay * this.state.minAdDays;
	}
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
		timing[index] = timing[index] || { from: "", to: "" };
		timing[index][position] = value;
		this.setState({
			data: { ...this.state.data, timing }
		});
		console.log(this.state.data.advanceTiming);
	}
	changeMCPV(e) {
		if (e.target.value >= this.state.lowestMinCost) {
			let totalCost = this.updateBaseCost(e.target.value);
			this.updateContent({ baseCost: totalCost, totalCost }, "", "allContent");
			this.setState({
				data: { ...this.state.data, mcpv: e.target.value },
				minCost: e.target.value
			});
		}
	}
	updateContent(state, minValue, setValue, e) {
		let value = setValue || e.target.value;
		let baseCost = state.baseCost || this.state.baseCost;
		let priceAugument = Object.assign({}, this.state.priceAugument);
		console.log(state, minValue, setValue);
		if (value != minValue && value != "allContent" && this.state.priceAugument[state].amount == 0) {
			priceAugument[state].amount = baseCost * this.state.priceAugument[state].value;
		} else if (value == minValue) {
			priceAugument[state].amount = 0;
		} else if (value == "allContent") {
			_.map(priceAugument, (item, index) => {
				if (item.amount != 0) priceAugument[index].amount = baseCost * item.value;
			});
			console.log(priceAugument);
		}
		let totalCost = _.reduce(
			priceAugument,
			(accum, item, index) => {
				return (accum += item.amount);
			},
			baseCost
		);
		this.setState({
			data: { ...this.state.data, [state]: value },
			priceAugument,
			totalCost,
			baseCost
		});
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
		const { baseCost } = this.props;
		const {
			scenariosList,
			errors,
			errorMessages,
			totalCost,
			lowestMinCost,
			minCost,
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
				<Col xs={6} className="boardSelection">
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
								<span className="minimumValues">Hex Code Req.(e.g FA8943)</span>
							</div>
						</Row>
						<Row id="audience" className="formSections">
							<Heading size="sm" title="Audience" />
							<div className="inputField">
								<label> Age </label>
								<span className="SelectDate">
									<span className={`formField rangeSelect ${errors.min_age ? "error" : ""}`}>
										<select onChange={this.updateContent.bind(this, "min_age", 20, null)} value={min_age}>
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
								</span>
							</div>
							<div className="inputField">
								<label> Gender </label>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "gender", "all", "all")}>
									<span className={`radioLabel ${gender === "all" ? "active" : ""}`}>All</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "gender", "all", "male")}>
									<span className={`radioLabel ${gender === "male" ? "active" : ""}`}>
										<span className="icon icon-male"> </span>Male
									</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "gender", "all", "female")}>
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
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "traffic", "all", "all")}>
									<span className={`radioLabel ${traffic === "all" ? "active" : ""}`}>All Situations</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "traffic", "all", "light")}>
									<span className={`radioLabel ${traffic === "light" ? "active" : ""}`}>
										<span className="icon icon-streetlight"> </span>Light
									</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "traffic", "all", "heavy")}>
									<span className={`radioLabel ${traffic === "heavy" ? "active" : ""}`}>
										<span className="icon icon-stop"> </span>Heavy
									</span>
								</span>
							</div>
							<div className="inputField">
								<label> Weather </label>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "weather", "all", "all")}>
									<span className={`radioLabel ${weather === "all" ? "active" : ""}`}>All Conditions</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "weather", "all", "rainy")}>
									<span className={`radioLabel ${weather === "rainy" ? "active" : ""}`}>
										<span className="icon icon-rain"> </span>Rainy
									</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "weather", "all", "cloudy")}>
									<span className={`radioLabel ${weather === "cloudy" ? "active" : ""}`}>
										<span className="icon icon-cloudy"> </span>Cloudy
									</span>
								</span>
								<span className="inputContainer radio" onClick={this.updateContent.bind(this, "weather", "all", "sunny")}>
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
								{timing.map((item, index) => {
									return (
										<div key={_.uniqueId()} className={`${errors.timing ? "error" : ""}`}>
											<span className="SelectDate">
												<AdvanceTiming setNewTime={this.setTime.bind(this, index, "from")} setTime={timing[index].from} />
												<span className="arrowRange rangeSeperator">
													<Icon icon="fas fa-long-arrow-alt-right" />
												</span>
												<AdvanceTiming setNewTime={this.setTime.bind(this, index, "to")} setTime={timing[index].to} />
												{timing.length - 1 === index ? (
													<span className="moreAdder" onClick={this.addMoreField.bind(this, "timing")}>
														<Icon icon="fas fa-plus-circle" />
													</span>
												) : (
													<span className="moreRemover" onClick={this.removeThisField.bind(this, "timing", index)}>
														<Icon icon="fas fa-minus-circle" />
													</span>
												)}
											</span>
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
									<input type="text" name="mcpv" placeholder="" value={minCost} onChange={this.changeMCPV.bind(this)} />
								</span>
								<span className="minimumValues">Minimum Amount is &#8358;{lowestMinCost}</span>
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
				<Col xs={3} className="campaignEstimate">
					<div className="estimateContainer">
						<div className="priceEstimate">
							<label>Estimated Cost</label>
							<span className="flexDisplay">
								<Heading size="sm" title="&#8358;" />
								<Heading size="sm" title={` ${totalCost.formatMoney(2)}`} />
							</span>

							<label>NGN</label>
						</div>
						<div className="priceEstimate">
							<label>Estimated Audience size</label>
							<Heading size="sm" title="3,500,000+" />
							<label>People</label>
							<ul className="boardPoints">
								<li>People living and Working around Ikoyi, Lekki and Ajah.</li>
								<li>Mostly Office Hours Workers.</li>
								<li>Between the Ages of 25 and 60.</li>
							</ul>
						</div>
					</div>
				</Col>
			</Row>
		);
	}
}
export default AdSetDescription;
