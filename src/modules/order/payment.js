import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorMessages from "../../components/errorMessages";
import AddCard from "./addCard";
import { getCards, deleteCard, sendPayment, addCard, validateOTP } from "../../actions/paymentActions";
import Icon from "../../components/icon";
class Payment extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			showAddCard: true,
			currentSelected: 0
		};
	}
	_mounted = false;
	componentDidMount() {
		this._mounted = true;
		this.props.getCards()
	}
	// componentWillReceiveProps(nextProps) {
	// 	if (!this.props.allCards && nextProps.allCards) {
	// 		this.payWithCard(nextProps.allCards[0], 0);
	// 	}
	// }
	componentWillUnmount(){
		this._mounted = false;
	}
	deleteCard(item) {
		this.props.deleteCard(item.id, this.props.allCards)
	}
	handleAddCard(cardDetails) {
		// this.setCardLoadingState(true);
		this.props.addCard(cardDetails);
	}
	handleValidateOTP(data){
		// this.setCardLoadingState(true);
		this.props.validateOTP(data);
	}
	setCardLoadingState(value){
		this._mounted && this.setState({ validatingCardDetails: value });
	}
	setLoading(loading){
		this._mounted && this.setState({ loading });
	}
	payWithCard(item, index) {
		this._mounted && this.setState({ currentSelected: index, ctoken: item.ctoken });
	}
	makePayment() {
		let payload = { ctoken: this.state.ctoken, amount: this.props.amount };
		this.props.sendPayment(payload)
		.then(data => {
			if (data.message == "Transaction successful!") {
				this.props.paymentStatus();
			}
		})
		.catch(e=>{
			console.log(e);
		});
	}
	render() {
		const { cardValidated, allCards=[], error } = this.props;
		const { currentSelected } = this.state;
		return (
			<div>
				<div className="priceEstimate cardDetails">
					{allCards && allCards.map((item, index) => (
						<div key={`card_${index}`} class="eachCard priceDetails">
							<span onClick={this.payWithCard.bind(this, item, index)} className={`cardRadio ${currentSelected == index ? "selectedCard" : ""}`}/>
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
								<Icon icon="far fa-trash-alt" size="sm"/>
							</a>
						</div>
					))}
					<AddCard loading={this.props.validatingCardDetails} onAddCard={this.handleAddCard.bind(this)} cancelCard={() => this.setState({ addCard: false })}/>
					<div className="addNewcard">
						<a onClick={e => this.setState({ addCard: true })} className="">
							<Icon icon="fas fa-plus" size="sm"/> Add New Card
						</a>
					</div>

					{error ? <ErrorMessages errorMessage={[error]}/> : ""}
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
		cardValidated: state.payment.cardValidated,
		validatingCardDetails: state.payment.validatingCard,
		loadingPaymentDetails: state.payment.loadingPaymentDetails,
		addingNewCard: state.payment.addingNewCard
	};
}
export default connect(mapStateToProps, { getCards, deleteCard, sendPayment, addCard, validateOTP })(Payment);
