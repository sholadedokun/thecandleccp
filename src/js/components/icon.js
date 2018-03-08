import React from "react";

export default ({ type, icon, size = "sm" }) => {
	let className = "far fa-" + icon + (type ? " " + type : "");
	const style = {
		sm: {
			fontSize: "1.2em"
		},
		md: {
			fontSize: "1.8em"
		}
	};
	return <span className={className} style={style[size]} />;
};
