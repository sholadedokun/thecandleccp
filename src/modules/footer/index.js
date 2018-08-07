import React from "react";
import Heading from "../../components/heading";
import { Row, Col } from "react-bootstrap";
import Icon from "../../components/icon";
export default ({ name, image, position }) => (
	<Row>
		<Col xs={12} className="section footer">
			<Col xs={12} className="categoryContainer">
				<span className="hrule" />
				<Row>
					<Col xs={12} sm={6} className="copy">
						<span className="footerLogo">
							<img src="images/Candle-.png" width="100%" />
						</span>
						<span>&copy; 2017, a product of Buck and Bage Limited. All rights reserved.</span>
					</Col>
					<Col xs={12} sm={6} className="social">
						<Heading size="xs" title="Follow us" />
						<span>
							<a href="https://www.instagram.com/candle.ng/" target="_blank">
								<Icon icon="fab fa-instagram" />
							</a>
							<a href="https://www.twitter.com/candle.ng/" target="_blank">
								<Icon icon="fab fa-twitter" />
							</a>
						</span>
					</Col>
				</Row>
			</Col>
		</Col>
	</Row>
);
