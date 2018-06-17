import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorMessages from "../errorMessages";
import AddCard from "./addCard";
import { getCards, deleteCard } from "../../actions/paymentActions";
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
	deleteCard(item) {
		this.props.deleteCard(item.id, this.props.allCards).then(data => console.log(data));
	}
	render() {
		const { cardValidated, allCards, error } = this.props;
		return (
			<div class="priceEstimate cardDetails">
				{allCards
					? allCards.map(item => (
							<div class="cardInput priceDetails">
								Card Number: **** **** **** {item.last4digits} <br /> Expires: {item.expiry_month}/{item.expiry_year}
								<a onClick={this.deleteCard.bind(this, item)}>Remove Card</a>
							</div>
					  ))
					: ""}
				<a onClick={e => this.setState({ addCard: true })}>Add New Card</a>

				{!cardValidated && (this.state.addCard || (allCards && allCards.length < 1)) ? <AddCard cancelCard={() => this.setState({ addCard: false })} /> : ""}

				{error ? <ErrorMessages errorMessage={[error]} /> : ""}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		error: state.payment.error,
		allCards: state.payment.allCards,
		validateCard: state.payment.cardValidated
	};
}
export default connect(mapStateToProps, { getCards, deleteCard })(GetCards);
