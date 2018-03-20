import React from "react";

export default ({ type, icon, size = "sm" }) => {
	const style = {
		sm: {
			fontSize: "1.2em"
		},
		md: {
			fontSize: "1.8em"
		}
	};
	return <span className={icon} style={style[size]} />;
};
