import React, { Component } from "react";
import Icon from "./icon";

export default class CustomSelect extends Component {
	componentWillUnmount() {
		document.removeEventListener("click", this.hideOption);
		this.container.classList.remove("revelCont");
	}
	revelOptions = () => {
		document.addEventListener("click", this.hideOption);
		this.container.classList.add("revelCont");
	};
	hideOption = (onSelect, value) => {
		document.removeEventListener("click", this.hideOption);
		this.container.classList.remove("revelCont");
	};
	render() {
		const { selection="", onSelect, options=[], rightImage, leftIcon } = this.props;
		return (
			<span style={style.customSelect} onClick={e => this.revelOptions.bind(this, e)()}>
				<div style={style.mask}>{selection}</div>
				<div style={style.optionContainer}>
					<ul ref={cont => (this.container = cont)} style={style.optionContainer.ul}>
						{options.map((item, index) => (
							<li onClick={e => onSelect(item)} key={`$item_${index}`} style={style.optionContainer.ul.li}>
								{item.name}
							</li>
						))}
					</ul>
				</div>
				<Icon size="sm" icon={leftIcon} />
			</span>
		);
	}
}
const style = {
	customSelect: {
		position: "relative",
		display: "inline-block",
		padding: "0.5em",
		color: "#555"
	},
	optionContainer: {
		position: "relative",
		minWidth: "1px",
		display: "inline-block !important",
		height: "1em",
		cursor: "pointer",
		float: "left",
		ul: {
			height: "1.2em",
			// padding: "0 1em",
			overflow: "hidden",
			li: {
				marginBottom: "0.5em"
			}
		},
		revelCont: {
			height: "auto",
			display: "inline - table",
			background: "#eee",
			// padding: "0.5em 1em",
			margin: "0",
			boxShadow: "0px 0px 2px #444",
			borderRadius: "5px"
		}
	},
	mask:{
		boxSizing: "border-box",
		display: "inline-block",
		position: "absolute",
		pointerEvents: "none",
		top: 0,
		left: 0,
		borderLeft: "1em solid #fff",
		borderRight: "1em solid #fff",
		background: "#fff",
		width: "100%",
		// height: '1em',
		whiteSpace: "nowrap",
		padding: "0.5em",
		zIndex: "2"
	}
};
