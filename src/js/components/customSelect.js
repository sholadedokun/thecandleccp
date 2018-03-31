import React from "react";
import Icon from "./icon";
const revelOptions = () => {
	console.log("here");
	document.addEventListener("click", hideOption);
	this.container.classList.add("revelCont");
};
const hideOption = (selectedItem, value) => {
	console.log("there");
	document.removeEventListener("click", hideOption);
	this.container.classList.remove("revelCont");
};
export default ({ selectedItem, selectItem, rightImage, leftIcon }) => (
	<div className="customSelect formField" onClick={e => revelOptions.bind(this, e)()}>
		<span className="display_pic">
			<Icon size="sm" icon="fas fa-user-circle" />
		</span>
		<div className="optionContainer" onClick={e => revelOptions.bind(this, e)()}>
			<ul ref={cont => (this.container = cont)}>
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
