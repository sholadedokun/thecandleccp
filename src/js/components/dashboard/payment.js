import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorMessages from "../errorMessages";
import AddCard from "./addCard";
import { getCards, deleteCard, sendPayment } from "../../actions/paymentActions";
import Icon from "../icon";
import _ from "lodash";
class Payment extends Component {
	constructor() {
		super();
		this.state = {
			addCard: false,
			currentSelected: 0
		};
	}
	componentWillMount() {
		this.props.getCards({}).then(data => console.log(data));
	}
	componentWillReceiveProps(nextProps) {
		if (!this.props.allCards && nextProps.allCards) {
			this.payWithCard(nextProps.allCards[0], 0);
		}
	}
	deleteCard(item) {
		this.props.deleteCard(item.id, this.props.allCards).then(data => console.log(data));
	}
	payWithCard(item, index) {
		this.setState({ currentSelected: index, ctoken: item.ctoken });
	}
	makePayment() {
		let payload = { ctoken: this.state.ctoken, amount: this.props.amount };
		this.props.sendPayment(payload).then(data => {
			if (data.message == "Transaction successful!") {
				this.props.paymentStatus();
			}
		});
	}
	render() {
		const { cardValidated, allCards, error } = this.props;
		const { currentSelected } = this.state;
		return (
			<div>
				<div class="priceEstimate cardDetails">
					{allCards
						? allCards.map((item, index) => (
								<div class="eachCard priceDetails" key={_.uniqueId()}>
									<span onClick={this.payWithCard.bind(this, item, index)} className={`cardRadio ${currentSelected == index ? "selectedCard" : ""}`} />
									<span className="eachCardDetail">
										<span className="cardNumber">
											<span className="cardLabel">Card Number</span> <span className="blockedNumbers">**** **** **** </span>
											{item.last4digits}
										</span>
										<span className="cardExpiry">
											<span className="cardLabel">Expires</span>
											{item.expiry_month}/{item.expiry_year}
										</span>
									</span>
									<a onClick={this.deleteCard.bind(this, item)} className="removeCard">
										<Icon icon="far fa-trash-alt" size="sm" />
									</a>
								</div>
						  ))
						: ""}

					{!cardValidated && (this.state.addCard || (allCards && allCards.length < 1)) ? (
						<AddCard cancelCard={() => this.setState({ addCard: false })} />
					) : (
						<div className="addNewcard">
							<a onClick={e => this.setState({ addCard: true })} className="">
								<Icon icon="fas fa-plus" size="sm" /> Add New Card
							</a>
						</div>
					)}

					{error ? <ErrorMessages errorMessage={[error]} /> : ""}
				</div>
				<button className="primaryButton" onClick={this.makePayment.bind(this)}>
					Make Payment
				</button>
				<button className="cancelButton">Cancel</button>
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
export default connect(mapStateToProps, { getCards, deleteCard, sendPayment })(Payment);
