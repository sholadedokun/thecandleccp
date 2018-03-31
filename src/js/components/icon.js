import React from "react";

export default ({ type, icon, size = "sm" }) => {
	const style = {
		xs: {
			fontSize: "0.75em"
		},
		sm: {
			fontSize: "1.2em"
		},
		md: {
			fontSize: "1.8em"
		}
	};
	return <span className={icon} style={style[size]} />;
};
