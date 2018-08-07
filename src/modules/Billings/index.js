import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchTransactions } from "../../actions/paymentActions";
import Payment from "../order/payment";
import { Col } from "react-bootstrap";
import _ from "lodash";
import Toggler from "../../js/components/toggle";
import Heading from "../../js/components/heading";
import Icon from "../../js/components/icon";
class Billings extends Component {
	componentWillMount() {
		this.props.fetchTransactions();
	}
	render() {
		const { transactions } = this.props;
		return (
			<div>
				<Col xs={12} className="campaignTable">
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
								<li>
									<span>
										<input type="checkbox" />
									</span>
								</li>
								<li>
									<Toggler />
								</li>
								<li>{item.reference}</li>
								<li>{item.campaign}</li>
								<li>{item.amount}</li>
								<li>{item.created_at}</li>
							</Col>
						);
					})}
					<Col xs={12} className="campaign_actionables">
						<Col xs={12} sm={6}>
							{transactions ? <Heading size="sm" title={` ${transactions.length}  Campaigns`} /> : ""}
							<span className="actionButton">
								<Icon icon="fas fa-plus" /> Add
							</span>
							<span className="formField">Edit</span>
							<span className="formField">Delete</span>
						</Col>
						<Col xs={12} sm={6} className="filter float-sm-right">
							<span className="formField">Sort</span>
							<span className="formField">Export CSV</span>
							<span className="searchInput">
								<input type="text" className="" placeholder="search campaigns" />
								<Icon icon="fas fa-search" size="xs" />
							</span>
						</Col>
					</Col>
				</Col>
				<Payment />
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { transcations: state.payment.transactions };
}
export default connect(mapStateToProps, { fetchTransactions })(Billings);
