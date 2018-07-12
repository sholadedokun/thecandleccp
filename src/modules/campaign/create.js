//@flow
import React, { Component } from "react";
import { saveCampaign } from "../../actions/campaignActions";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Icon from "../../components/icon";
import moment from "moment";
import Heading from "../../components/heading";
import DayPickerInput from "react-day-picker/DayPickerInput";
import ToolTipMarker from "../../components/tooltip";
import "react-day-picker/lib/style.css";
import { CAMPAIGN_DICTIONARY } from "../../config";
import _ from "lodash";
import ErrorMessage from "../../components/errorMessages";
import { errorHandler } from "../../components/errorHandler";
import { emptyFieldChecker } from "../../components/errorChecker";

class CreateCampaign extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			dateFrom: moment().format("L"),
			dateTo: "",
			budget: 12000,
			budget_type: "Daily",
			createSuccess: false,
			loading: false,
			errors: {},
			errorMessages: []
		};
	}
	componentWillReceiveProps(nextProps) {
		errorHandler.bind(this, nextProps)();
	}
	createCampaign() {
		this.setState({ loading: true, errorMessages: [] });
		let object = _.pick(this.state, ["name", "dateTo", "dateFrom", "budget"]);
		if (this.state.budget_type == "Daily") object = _.omit(object, ["dateTo"]);
		let errors = emptyFieldChecker.bind(this, {}, object)();
		if (_.isEmpty(errors)) {
			let params = _.omit(this.state, ["dateFrom", "dateTo", "createSuccess"]);
			params.budget_type = CAMPAIGN_DICTIONARY.budget_type[this.state.budget_type];
			if (this.state.budget_type == "Daily") {
				params.date_from = moment(this.state.dateFrom).format("YYYY-MM-DD");
				params.date_to = moment(this.state.dateTo).format("YYYY-MM-DD");
				params.days = moment(this.state.dateTo).diff(moment(this.state.dateFrom), "days");
			} else params.date_from = moment(this.state.dateFrom).format("YYYY-MM-DD");
			params.type = "pseudo";
			params.id = "temp_id";
			
			this.props.saveCampaign(params)
			.then(data => {
				this.setState({
					createSuccess: true
				});
				this.props.close("addAdSet");
			});
		}
	}
	render() {
		let dayPickerPropsFrom = {
			disabledDays: {
				before: new Date()
			}
		};
		let dayPickerPropsTo = {
			disabledDays: {
				before: new Date(this.state.dateFrom)
			}
		};
		if (this.state.dateTo) {
			console.log(this.state.dateTo);
			dayPickerPropsFrom.disabledDays.after = new Date(this.state.dateTo);
		}
		const { name, budget, budget_type, dateFrom, dateTo, password, createSuccess, loading, errors, errorMessages } = this.state;
		return (
			<Col xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} className="create_campaign_modal">
				<Heading size="lg" title="Create Campaign" />
				<Col className="formSections">
					<Heading size="sm" title="Campaign Details" />
					<div className="inputField">
						<label> Campaign Name </label>
						<span className={errors.name ? "inputContainer lg error" : "inputContainer lg"}>
							<input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} placeholder="Type Campaign Name" />
						</span>
					</div>
				</Col>
				<Col className="formSections">
					<Heading size="sm" title="Budget" />
					<div className="inputField">
						<label>
							Total Spend
							<ToolTipMarker id={_.uniqueId()} tooltip="Total amount you are willing to spend.">
								<span>
									<Icon icon="fas fa-question-circle" />
								</span>
							</ToolTipMarker>
						</label>
						<span className={`inputContainer selectInput ${errors.budget ? "error" : ""}`}>
							<input type="text" name="campaign_totalSpend" placeholder="Enter Amount" onChange={e => this.setState({ budget: e.target.value })} value={budget} />
							<span className="inlineSelect">
								<select onChange={e => this.setState({ budget_type: e.target.value })} value={budget_type}>
									<option value="Daily"> Daily </option>
									<option value="Lifetime"> Lifetime </option>
								</select>
							</span>
						</span>
						<span className="minimumValues"> Minimum Amount is &#8358;12,000</span>
					</div>
					<div className="inputField">
						<label> Desired Period </label>
						{budget_type === "Daily" ? (
							<span className="SelectDate">
								<span
									className="inputContainer radio"
									onClick={e => {
										let dateFrom = moment().format("L");
										this.setState({ budget_type: "Daily", dateFrom: "" });
									}}>
									<span className={`radioLabel ${budget_type === "Daily" && (dateFrom == moment().format("L") || dateFrom == "") ? "active" : ""}`}> Start Immediately </span>
								</span>
								<span className={`inputContainer rangeInput ${errors.dateFrom ? "error" : ""}`}>
									<span className="subLabel"> From </span>
									<DayPickerInput
										placeholder="MM/DD/YYYY"
										onDayChange={date => {
											this.setState({ dateFrom: date });
										}}
										dayPickerProps={dayPickerPropsFrom}
									/>
								</span>
							</span>
						) : (
							<span className="SelectDate">
								<span className={`inputContainer rangeInput ${errors.dateFrom ? "error" : ""}`}>
									<span className="subLabel"> From </span>
									<DayPickerInput
										placeholder="MM/DD/YYYY"
										onDayChange={date => {
											this.setState({ dateFrom: date });
										}}
										dayPickerProps={dayPickerPropsFrom}
									/>
								</span>
								<span className="arrowRange rangeSeperator">
									<div>
										<Icon icon="fas fa-long-arrow-alt-right" />
									</div>
								</span>
								<span className={`inputContainer rangeInput ${errors.dateTo ? "error" : ""}`}>
									<span className="subLabel"> To </span>
									<DayPickerInput
										placeholder="MM/DD/YYYY"
										onDayChange={date => {
											this.setState({ dateTo: date });
										}}
										dayPickerProps={dayPickerPropsTo}
									/>
								</span>
							</span>
						)}
					</div>
				</Col>
				{loading ? (
					<Icon icon="fas fa-spinner loading" />
				) : (
					<button className="primaryButton" onClick={this.createCampaign.bind(this)}>
						Create campaign
					</button>
				)}
				{createSuccess ? (
					<div className="inputField">
						<label> Campaign Successfully Created </label>
					</div>
				) : (
					""
				)}
				<ErrorMessage errorMessage={errorMessages} />
			</Col>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.user.authenticated,
		allCampaigns: state.campaigns.allCampaigns
	};
}
const mapDispatchToProps = { saveCampaign };
export default connect(mapStateToProps, mapDispatchToProps)(CreateCampaign);
