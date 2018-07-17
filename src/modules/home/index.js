import React from "react";
import { Row, Col, Grid } from "react-bootstrap";

import Howitworks from "../static/howitworks";
import Hopin from "./components/hopin";
import WhatPeopleAreSaying from "./components/whatpeoplearesaying";

import Heading from "../../components/heading";
import Carousel from "../../components/carousel";


const home = () => (
	<Row>
		<Col className="banner">
			{/*<QuickRegister /> */}
			<Carousel />
			<Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4} className="banner_metric">
				<Row>
					<Col className="firstMet" xs={4}>
						<Heading size="md" marginBottom="0em" title="50+">
							Spaces<br />Nationwide
						</Heading>
					</Col>
					<Col className="secondMet" xs={4}>
						<Heading size="md" marginBottom="0em" title="2000+">
							Running Ad<br />Campaigns
						</Heading>
					</Col>
					<Col xs={4}>
						<Heading size="md" marginBottom="0em" title="300+">
							Brands And<br />Product User
						</Heading>
					</Col>
				</Row>
			</Col>
		</Col>
		<Howitworks />
		<WhatPeopleAreSaying />
		<Hopin />
	</Row>
);
export default home;
