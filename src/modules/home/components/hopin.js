import React from "react";
import Heading from "../../../js/components/heading";
import { Row, Col } from "react-bootstrap";
export default ({ callModal, eValue, updateEmail }) => (
	<Col xs={12} className="section footer">
		<Heading size="lg" title="Excited! start Using the Candle">
			sign up today and get 50% discount
		</Heading>
		<div className="bigInput">
			<input type="text" name="email" placeholder="Your Email Address" onChange={e => updateEmail(e.target.value)} value={eValue} />
			<button className="primaryButton" onClick={() => callModal()}>
				GET STARTED
			</button>
		</div>
	</Col>
);
