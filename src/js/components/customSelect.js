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
	hideOption = (selectedItem, value) => {
		document.removeEventListener("click", this.hideOption);
		this.container.classList.remove("revelCont");
	};
	render() {
		const { selectedItem, selectItem, rightImage, leftIcon } = this.props;
		return (
			<div className="customSelect formField" onClick={e => this.revelOptions.bind(this, e)()}>
				<span className="display_pic">
					<Icon size="sm" icon="fas fa-user-circle" />
				</span>
				<div className="optionContainer">
					<ul ref={cont => (this.container = cont)}>
						{selectItem.map((item, index) => (
							<li onClick={e => selectedItem(item.value)} key={index}>
								{item.name}
							</li>
						))}
					</ul>
				</div>

				<Icon size="sm" icon={leftIcon} />
			</div>
		);
	}
}
