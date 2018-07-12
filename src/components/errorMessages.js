import React from "react";
import _ from "lodash";
export default function({ errorMessage }) {
	return (
		<div className="errorContainer">
			{errorMessage.length > 0 ? (
				<div className="col-md-12 alert alert-danger">
					{_.map(errorMessage, (item, index) => {
						return (
							<div className="col-md-12" key={index}>
								{item}
							</div>
						);
					})}
				</div>
			) : (
				""
			)}
		</div>
	);
}
