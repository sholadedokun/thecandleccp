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
	// shouldComponentUpdate() {
	// 	return false;
	// }
	componentDidMount() {
		this.createPlayer();
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
		this.destroyPlayer();
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.sources != this.props.sources) {
			this.player.src(nextProps.sources);
		}
	}

	render() {
		const { name, location } = this.props.feedDescription;
		return (
			<div>
				<div data-vjs-player>
					<video ref={node => (this.videoNode = node)} className="video-js" width="inherit" />
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
