import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorMessages from "../errorMessages";
import AddCard from "./addCard";
import { getCards } from "../../actions/paymentActions";
class GetCards extends Component {
	constructor() {
		super();
		this.state = {
			addCard: false
		};
	}
	componentWillMount() {
		this.props.getCards({}).then(data => console.log(data));
	}
	render() {
		return (
			<div class="priceEstimate cardDetails">
				{this.props.allCards
					? this.props.allCards.map(item => (
							<div class="cardInput priceDetails">
								Card Number: **** **** **** {item.last4digits} <br /> Expires: {item.expiry_month}/{item.expiry_year}
								<a>Remove Card</a>
							</div>
					  ))
					: ""}
				<a onClick={e => this.setState({ addCard: true })}>Add New Card</a>

				{this.state.addCard || (this.props.allCards && this.props.allCards.length < 1) ? <AddCard /> : ""}

				{this.props.error ? <ErrorMessages errorMessage={[this.props.error]} /> : ""}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		error: state.payment.error,
		allCards: state.payment.allCards
	};
}
export default connect(mapStateToProps, { getCards })(GetCards);
