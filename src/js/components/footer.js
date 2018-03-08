import React from "react";
import Heading from "./heading";
import { Row, Col } from "react-bootstrap";
import Icon from "./icon";
export default ({ name, image, position }) => (
	<Row>
		<Col xs={12} className="section footer">
			<Col xs={12} className="categoryContainer">
				<span className="hrule" />
				<Col xs={12} sm={6} className="copy">
					<Heading size="sm" title="TheCandle" />
					<span>&copy; 2017 TheCandle all rights reserved.</span>
				</Col>
				<Col xs={12} sm={6} className="social">
					<Heading size="xs" title="Follow us" />
					<span>
						<a href="" target="_blank">
							<Icon icon="instagram" />
						</a>
						<a href="" target="_blank">
							<Icon icon="facebook" />
						</a>
						<a href="" target="_blank">
							<Icon icon="twitter" />
						</a>
						<a href="" target="_blank">
							<Icon icon="linkedin" />
						</a>
					</span>
				</Col>
			</Col>
		</Col>
	</Row>
);
