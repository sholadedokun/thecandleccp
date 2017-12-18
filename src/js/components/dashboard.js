import React, {Component} from 'react';
import ReactModal from 'react-modal';
import CreateCampaign from './createCampaign';
import AddAdSet from './AddSet/addAdSet';
import {fetchCampaign} from '../actions/campaignActions';
import {connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import Heading from './heading'
import Icon from './icon'
import _ from 'lodash';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            modalLoad:'create Campaign'
        }
    }
    componentWillMount(){
        this.props.fetchCampaign()
    }
    createCampaign(){
        this.setState({modalOpen: true, modalLoad:'createCampaign'})
    }
    addAdSet(){
        this.setState({modalOpen: true, modalLoad:'addAdSet'})
    }
    handleCloseModal (route) {
        if(route) this.setState({modalLoad:route})
        this.setState({ modalOpen: false });
    }
    render(){
        const {modalOpen, modalLoad}=this.state;
        const {allCampaigns} = this.props;
        return(
            <Grid className="dashboard section">
                <Col xs="12" className="campaignTable">
                    <ul className="campaign_menu">
                        <li className="active">Campaigns</li>
                        <li>Adsets</li>
                    </ul>
                    <Col className="hrule" xs="12"></Col>
                    <Col className="analytics" xs="12"></Col>
                    <Col xs="12" className="campaign_actionables">
                        <Col xs="6">
                            <Heading size="sm" title="10 Campaigns"/>
                            <span className="actionButton" onClick={this.createCampaign.bind(this)}><Icon icon="plus"/> Create Campaign</span>
                            <span className="disabledButton">Edit</span>
                            <span className="disabledButton">Delete</span>
                        </Col>
                        <Col xs="6" className="filter">
                            <span className="searchInput">
                                <input type="text" className="" placeholder="search campaigns" />
                            </span>
                            <span className="disabledButton">Export CSV</span>
                            <span className="disabledButton">Sort</span>
                        </Col>
                    </Col>

                    <Col xs="12" className="list_header">
                        <ul className="campaign_header">
                            <li>&nbsp;</li>
                            <li>&nbsp;</li>
                            <li>Campaign Name</li>
                            <li>Status</li>
                            <li>Views</li>
                            <li>Cost</li>
                            <li>Schedule</li>
                            <li>Spent Today</li>
                            <li>Total Spent</li>
                        </ul>
                    </Col>

                    {
                        _.map(allCampaigns, (item, index)=>{
                            return(
                                <Col key={index} componentClass="ul" className="each_campaign">
                                    <li>&nbsp;</li>
                                    <li>
                                        <span className={item.status?'statusToggle active':'statusToggle'}>
                                            <span className="toggler"></span>
                                        </span>
                                    </li>
                                    <li>

                                        {item.name}
                                    </li>
                                    <li>
                                        <span  className={`activityIndicator ${!item.activity?'inactive':(item.activity=='active')?'active':'completed'}`}></span>
                                        <span>{(item.activity || 'inactive')}</span>
                                    </li>
                                    <li className="value">
                                        <span className="campaign_value">{item.budget}</span>
                                        <span className="value_description">people</span>
                                    </li>
                                    <li className="value">
                                        <span className="campaign_value">$50.00</span>
                                        <span className="value_description">per view</span>
                                    </li>
                                    <li className="value">
                                        <span className="campaign_value">08/11/2017</span>
                                        <span className="value_description">to 11/12/2017</span>
                                    </li>
                                    <li className="value">
                                        <span className="campaign_value">$34.34</span>
                                        <span className="value_description">$99.99 Budget</span>
                                    </li>
                                    <li className="value ">
                                        <span className="campaign_value">$10,000.00</span>
                                        <span className="value_description">$25,000.00 Budget</span>
                                    </li>
                                </Col>

                            )


                        })
                    }
                    {(allCampaigns)?
                        <Col xs="12" className="total_result">
                            <Heading size="xs" title={`Result from all ${allCampaigns.length} campaigns`} />
                            <span className="total_view">
                                <span className="campaign_value">1,040,000.00</span>
                                <span className="value_description">People</span>
                            </span>
                            <span className="total_spent">
                                <span className="campaign_value">$104,000.00</span>
                                <span className="value_description">$250,000.00</span>
                            </span>
                            <span className="total_budget">
                                <span className="campaign_value">$81,040,000.00</span>
                                <span className="value_description">$100,000,000.00</span>
                            </span>
                        </Col>:''
                }
                </Col>

                <Col md={3}>
                    <a href="#" onClick={this.addAdSet.bind(this)}>Add AdSet</a>
                </Col>
                <Col md={9}>

                </Col>

                <ReactModal
                    isOpen={modalOpen}  shouldCloseOnOverlayClick={true}
                    onRequestClose={this.handleCloseModal.bind(this)}
                    className={
                        {
                            base: 'modalClass',
                            afterOpen: 'modalClass_after-open',
                            beforeClose: 'modalClass_before-close'
                        }
                    }
                >
                    {
                        (modalLoad==='createCampaign')?
                        <CreateCampaign close={this.handleCloseModal.bind(this)} />:
                        <AddAdSet close={this.handleCloseModal.bind(this)} />
                    }
                </ReactModal>
            </Grid>
        )
    }
}

function mapStateToProps(state){
    return(
        {allCampaigns:state.campaigns.allCampaigns}
    )
}
const mapDispatchToProps = {fetchCampaign}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
