import React from "react";
import { Row, Col } from "react-bootstrap";
import videojs from "video.js";
import Heading from "./heading";
import Icon from "./icon";
import "@videojs/http-streaming";
import "video.js/dist/video-js.css";
class LiveStream extends React.Component {
	constructor() {
		super();
	}

	componentDidMount() {
		//this.createPlayer();
	}
	createPlayer() {
		this.player = videojs(
			this.videoNode,
			{
				sources: this.props.sources,
				autoplay: true,
				controls: true
			},
			function onPlayerReady() {
				console.log("onPlayerReady", this);
			}
		);
	}
	destroyPlayer() {
		if (this.player) {
			this.player.dispose();
		}
	}
	// destroy player on unmount
	componentWillUnmount() {
		//this.destroyPlayer();
	}
	componentWillReceiveProps(nextProps) {
		// if (nextProps.sources != this.props.sources) {
		// 	this.player.src(nextProps.sources);
		// }
	}
	render() {
		const { name, location } = this.props.feedDescription;
		const { url } = this.props.sources;
		const iFrameStyle = {
			"-moz-transform-origin": "top left",
			"-webkit-transform-origin": "top left",
			"-o-transform-origin": "top left",
			"-ms-transform-origin": "top left",
			"transform-origin": "top left",
			width: "2100px",
			height: "1080px",
			border: "none",
			"-webkit-transform": "scale(0.4655)",
			"-moz-transform": "scale(0.4655)"
		};
		return (
			<div>
				<div className="video-js">
					<iframe src={url} style={iFrameStyle} width="inherit" />
				</div>
				<Row>
					<Col xs="12" className="feedDescription">
						<Heading size="sm" title={name} />
						<br />
						<span>
							<Icon icon="fas fa-map-marker-alt"> </Icon> {location}
						</span>
					</Col>
				</Row>
			</div>
		);
	}
}

export default LiveStream;
