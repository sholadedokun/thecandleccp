import React from "react";
import Heading from "../../js/components/heading";
export default ({ otpValue, ChangeOtpValue, resendCode, validate, error, otpMessage }) => {
	return (
		<div>
			<Heading title="Validate OTP" size="md" />
			<Heading title={otpMessage} size="xs" />
			<form onSubmit={e => validate(e)}>
				<div className="inputField" style={{ display: "flex" }}>
					<input type="text" placeholder="Type OTP here" onChange={ChangeOtpValue} value={otpValue} />
					<button className="primaryButton" type="submit">
						Send
					</button>
				</div>

				<div onClick={resendCode}>
					<a>Click here to resend code</a>
				</div>
			</form>
			{error ? <span className="">{error}</span> : ""}
		</div>
	);
};
