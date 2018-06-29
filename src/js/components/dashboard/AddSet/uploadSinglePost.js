// @flow
import React, { Component } from "react";
import Icon from "../../icon";
import { Col } from "react-bootstrap";
import Heading from "../../heading";
export default class singlePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMediaIndex: 0,
			mediaTypes: ["image", "video", "url"],
			collages: { 1: [{ x: "0|1", y: "0|2" }] }
		};
	}
	componentDidMount() {
		this.props.changeCollage(this.state.collages[1]);
	}
	render() {
		const { selectedMediaIndex } = this.state;
		const { mediaName } = this.props;
		return (
			<Col xs={12} className="creativeContainer">
				<div class="inputField">
					<label>Select Media Type</label>
					<span className="inputContainer radio" onClick={e => this.setState({ selectedMediaIndex: 0 })}>
						<span className={`radioLabel ${selectedMediaIndex === 0 ? "active" : ""}`}>Image</span>
					</span>
					<span className="inputContainer radio" onClick={e => this.setState({ selectedMediaIndex: 1 })}>
						<span className={`radioLabel ${selectedMediaIndex === 1 ? "active" : ""}`}>Video</span>
					</span>
					<span className="inputContainer radio" onClick={e => this.setState({ selectedMediaIndex: 2 })}>
						<span className={`radioLabel ${selectedMediaIndex === 2 ? "active" : ""}`}>Web URL</span>
					</span>
				</div>

				<div className={this.props.errors ? "error" : ""}>
					{(() => {
						switch (this.state.mediaTypes[selectedMediaIndex]) {
							case "image":
								return (
									<div>
										<Heading size="sm" title="Add Image" />
										<div className={`file-loading ${this.props.errors ? "error" : ""}`}>
											<input id="passport" type="file" accept="image/*" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex])} />
											<span className="browse">
												<i className="fa fa-upload" /> Browse
											</span>
											<p>{mediaName ? mediaName.name : "Select Image..."}</p>
										</div>
										<Heading size="xs" title="Upload Instructions" />
										<p>
											Kindly ensure that all ads are of high resolution, 4K for images and over 500dpi for image files. Also ensure that your images is approved by the concerned regulatory bodies.
										</p>
									</div>
								);

							case "video":
								return (
									<div>
										<Heading size="sm" title="Add Video" />
										<div className={`file-loading ${this.props.errors ? "error" : ""}`}>
											<input id="passport" type="file" accept="video/*" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex])} />
											<span className="browse">
												<i className="fa fa-upload" /> Browse
											</span>
											<p>{mediaName ? mediaName.name : "Select Video..."}</p>
										</div>
										<Heading size="xs" title="Upload Instructions" />
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.</p>
									</div>
								);
							case "url":
								return (
									<div>
										<Heading size="sm" title="Add Web URL" />
										<div className={`file-loading ${this.props.errors ? "error" : ""}`}>
											<input type="text" onBlur={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex])} placeholder="Please type Web URL" />
										</div>
										<Heading size="xs" title="Web Page Design Instructions" />
										<p>Web site URL must be prefixed with http:// OR https://, e.g http://example.com</p>
									</div>
								);
							default:
								return <input type="file" onChange={this.props.renderPreview.bind(this, 0, this.state.mediaTypes[selectedMediaIndex])} />;
						}
					})()}
				</div>
			</Col>
		);
	}
}
