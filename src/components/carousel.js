import React from "react";
import Slider from "react-slick";
import Heading from "./heading";
export default class pageSlider extends React.Component {
	render() {
		var settings = {
			dots: true,
			infinite: true,
			autoplay: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			dotsClass: "slick-dots carousel_dots",
			className: "carousel"
		};
		return (
			<Slider {...settings} className="slider">
				<div className="carousel" id="cr1">
					<Heading size="lg" title="A Grid for smart, connected screens" marginBottom="-0.2em" />
				</div>
				<div className="carousel" id="cr2">
					<Heading size="lg" title="Africa's largest programmatic DOOH platform" marginBottom="-0.2em" />
				</div>
				<div className="carousel" id="cr3">
					<Heading size="lg" title="A Special DOOH content creation platform" marginBottom="-0.2em" />
				</div>
			</Slider>
		);
	}
}
