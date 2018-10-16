import React, { Component } from "react";
import _ from "lodash";
export default class DisplayBoard extends Component {
	constructor() {
		super();
		this.state = {
			displayBoardWidth: 500
		};
	}
	componentDidMount() {
		let boardDimension = document.querySelector("#displayBoard").getBoundingClientRect();
		this.setState({
			displayBoardWidth: boardDimension.width
		});
	}
	mapAdCreativeToBoard() {
		const { creative } = this.props;
		const { displayBoardWidth } = this.state;
		const actualWidth = displayBoardWidth * 0.885;
		const actualHeight = actualWidth * 0.425;
		const style = {
			position: "absolute",
			width: actualWidth,
			height: actualHeight,
			border: "1px solid #595",
			top: "18.7%",
			left: "5.8%"
		};
		const iFrameStyle = {
			"-moz-transform-origin": "top left",
			"-webkit-transform-origin": "top left",
			"-o-transform-origin": "top left",
			"-ms-transform-origin": "top left",
			"transform-origin": "top left",
			width: "1024px",
			height: "768px",
			border: "none",
			"-webkit-transform": "scale(0.5)",
			"-moz-transform": "scale(0.5)"
		};
		const totalCreative = creative.length;
		const unitWidth = actualWidth / totalCreative;
		const unitHeight = actualHeight / 2;
		return (
			<div className="boardGuide" style={style}>
				{_.map(creative, (item, index) => {
					const creativeStyle = {
						display: "inline-block",
						width: unitWidth * parseFloat(item.dimension.x.split("|")[1]),
						height: unitHeight * parseFloat(item.dimension.y.split("|")[1]),
						left: unitWidth * parseFloat(item.dimension.x.split("|")[0]),
						top: unitHeight * parseFloat(item.dimension.y.split("|")[0]),
						position: "absolute",
						overflow: "hidden"
					};
					creativeStyle.border = item.data === "" ? "1px solid #555" : "";
					return (
						<div style={creativeStyle}>
							{(function() {
								switch (item.type) {
									case "image":
										return <img src={`/${item.data}`} width="100%" />;
									case "video":
										return (
											<video width="100%" autoPlay loop>
												<source src={item.data} />
											</video>
										);
									case "url":
										return <iframe src={item.data} style={iFrameStyle} />;
									default:
										return "";
								}
							})()}
						</div>
					);
				})}
			</div>
		);
	}
	render() {
		return (
			<div className="displayBoardPreview" id="previewContainer">
				<img src="/images/displayBoard_1.png" id="displayBoard" className="displayBoard" width="100%" height="100%" />
				{this.mapAdCreativeToBoard()}
			</div>
		);
	}
}
