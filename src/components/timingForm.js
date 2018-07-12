import React, { Component } from "react";
class advanceTiming extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hh: "",
			ap: ""
		};
		this.hourOptions = ["HH"];
		for (let i = 0; i <= 12; i++) {
			this.hourOptions.push(i);
		}
	}
	setTimeValues(state, e) {}
	render() {
		const { steps } = this.state;
		const { setTime } = this.props;
		console.log(setTime);
		return (
			<span className="inputContainer selectInput">
				<span className="inlineSelect timeSelect">
					<select onChange={e => this.props.setNewTime(`${e.target.value}:00 ${setTime.split(" ")[1]}`)} value={setTime.split(":")[0]}>
						{this.hourOptions.map((item, index) => {
							return (
								<option key={index} value={item}>
									{item}
								</option>
							);
						})}
					</select>
				</span>
				<span className="inlineSelect">
					<select onChange={e => this.props.setNewTime(`${setTime.split(":")[0]}:00 ${e.target.value}`)} value={setTime.split(" ")[1]}>
						<option value="AM">AM</option>
						<option value="PM">PM</option>
					</select>
				</span>
			</span>
		);
	}
}

export default advanceTiming;
