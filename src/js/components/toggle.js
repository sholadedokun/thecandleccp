import React from "react";

export default ({ status, size = "sm" }) => {
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
	return (
		<span className={status ? "statusToggle active" : "statusToggle"}>
			<span className="toggler" />
		</span>
	);
};
