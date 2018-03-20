import React from "react";
import Icon from "./icon";
const revelOptions = () => {
	this.container.classList.add("revelCont");
};
const hideOption = (selectedItem, value) => {
	this.container.classList.remove("revelCont");
	selectedItem(value);
};
export default ({ selectedItem, selectItem, rightImage, leftIcon }) => (
	<div className="customSelect formField">
		<span className="display_pic">
			<Icon size="sm" icon="fas fa-user-circle" />
		</span>
		<div className="optionContainer">
			<ul ref={cont => (this.container = cont)} onClick={e => revelOptions.bind(this, e)()}>
				{selectItem.map((item, index) => (
					<li onClick={e => hideOption(selectedItem, item.value)} key={index}>
						{item.name}
					</li>
				))}
			</ul>
		</div>

		<Icon size="sm" icon={leftIcon} />
	</div>
);
