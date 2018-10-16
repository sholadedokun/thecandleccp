import React from "react";
import Heading from "./heading";
import { Row, Col } from "react-bootstrap";
import Icon from "./icon";
export default ({ name, image, position }) => (
	<Row>
		<Col xs={12} className="section footer">
			<Col xs={12} className="categoryContainer">
				<span className="hrule" />
				<Row>
					<Col xs={12} sm={6} className="copy">
						<span className="footerLogo">
							<img src="/images/Candle-.png" width="100%" />
						</span>
						<span>&copy; 2017 TheCandle all rights reserved.</span>
					</Col>
					<Col xs={12} sm={6} className="social">
						<Heading size="xs" title="Follow us" />
						<span>
							<a href="" target="_blank">
								<Icon icon="fab fa-instagram" />
							</a>
							<a href="" target="_blank">
								<Icon icon="fab fa-facebook" />
							</a>
							<a href="" target="_blank">
								<Icon icon="fab fa-twitter" />
							</a>
							<a href="" target="_blank">
								<Icon icon="fab fa-linkedin" />
							</a>
						</span>
					</Col>
				</Row>
			</Col>
		</Col>
	</Row>
);
