import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorMessages from "../errorMessages";
import AddCard from "./addCard";
import { getCards, deleteCard } from "../../actions/paymentActions";
import Icon from "../icon";
class GetCards extends Component {
	constructor() {
		super();
		this.state = {
			addCard: false,
			currentSelected: 1
		};
	}
	componentWillMount() {
		this.props.getCards({}).then(data => console.log(data));
	}
	deleteCard(item) {
		this.props.deleteCard(item.id, this.props.allCards).then(data => console.log(data));
	}
	payWithCard(item) {
		console.log(item);
	}
	render() {
		const { cardValidated, allCards, error } = this.props;
		const { currentSelected } = this.state;
		return (
			<div class="priceEstimate cardDetails">
				{allCards
					? allCards.map((item, index) => (
							<div class="eachCard priceDetails">
								<span onClick={this.payWithCard.bind(this, item)} className={currentSelected == index ? "cardRadio Selected" : "cardRadio"} />
								<span className="eachCardDetail">
									<span className="cardNumber">Card Number: **** **** **** {item.last4digits} </span>
									<span className="cardExpiry">
										Expires: {item.expiry_month}/{item.expiry_year}
									</span>
								</span>
								
								<a onClick={this.deleteCard.bind(this, item)} className="removeCard">
									<Icon icon="far fa-trash-alt" size="sm" />
								</a>
							</div>
					  ))
					: ""}
				<div className="addNewcard">
					<a onClick={e => this.setState({ addCard: true })} className="">
						<Icon icon="fas fa-plus" size="sm" /> Add New Card
					</a>
				</div>
				

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
