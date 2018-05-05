import React from "react";
import { Row, Col } from "react-bootstrap";
import videojs from "video.js";
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
		console.log(this.props);
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
		return (
			<div data-vjs-player>
				<video ref={node => (this.videoNode = node)} className="video-js" width="inherit" />
			</div>
		);
	}
}

export default LiveStream;
