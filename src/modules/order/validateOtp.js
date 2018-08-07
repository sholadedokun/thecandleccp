import React from "react";
import Heading from "../../js/components/heading";
export default ({ resendCode, validate, error }) => {
	return (
		<div>
			<Heading title="Validate OTP" size="md" />
			<heading title="An OTP has been sent to your phone, please type the digits below" size="xs" />
			<form onSubmit={() => validate()}>
				<input type="text" placeholder="Type OTP here" />
				<button type="submit">Send</button>
				<span onClick={resendCode}>Click here to resend code</span>
			</form>
			{error ? <span className="">{error}</span> : ""}
		</div>
	);
};
