import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions/paymentActions";
import Payment from "../order/payment";
import { Col } from "react-bootstrap";
import _ from "lodash";
import Toggler from "../../js/components/toggle";
import Heading from "../../components/heading";
import Icon from "../../js/components/icon";
class Billings extends Component {
	componentWillMount() {
		this.props.fetchTransactions();
	}
	render() {
		const { transactions } = this.props;
		console.log(this.props);
		return (
			<div className="section container">
				<Col xs={8} className="dashboard">
					<Heading title="Transaction Records" size="md" marginBottom="1.5em" align="left" />
					<Col xs={12} className="campaign_actionables">
						<Col xs={12} sm={4}>
							{transactions ? <Heading size="sm" title={` ${transactions.length} Transcation${transactions.length > 1 ? "s" : ""}`} /> : ""}
						</Col>
						<Col xs={12} sm={8} className="filter float-sm-right">
							<span className="formField">Sort</span>
							<span className="formField">Export CSV</span>
							<span className="searchInput">
								<input type="text" className="" placeholder="Search Records" />
								<Icon icon="fas fa-search" size="xs" />
							</span>
						</Col>
					</Col>
					<Col xs={12} className="campaignTable transactionTable">
						<Col xs={12} className="list_header">
							<ul className="campaign_header">
								<li>&nbsp;</li>
								<li>&nbsp;</li>
								<li>Reference</li>
								<li>Campaign</li>
								<li>Amount</li>
								<li>Transcation Date</li>
							</ul>
						</Col>
						{_.map(transactions, item => {
							return (
								<Col componentClass="ul" className="each_campaign" key={_.uniqueId()}>
									<li>&nbsp;</li>
									<li>&nbsp;</li>
									<li>{item.reference}</li>
									<li>{item.campaign}</li>
									<li> &#8358;{item.amount.formatMoney(2)}</li>
									<li>{item.created_at}</li>
								</Col>
							);
						})}
					</Col>
				</Col>
				<Col xs={4}>
					<Heading title="Card Records" size="md" marginBottom="0.182em" align="right !important" />
					<Payment billing={true} />
				</Col>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { transactions: state.payment.transactions };
}
export default connect(mapStateToProps, { fetchTransactions })(Billings);
