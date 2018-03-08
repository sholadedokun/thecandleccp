import React from "react";
import Icon from "./icon";

export default ({ selectItem, rightImage, leftIcon }) => (
	<div className="customSelect formField">
		<span className="display_pic">
			<Icon size="sm" icon="user" />
		</span>
		<ul>{selectItem.map(item => <li onClick={e => item.value}>{item.name}</li>)}</ul>
		<Icon size="sm" icon={leftIcon} />
	</div>
);
