import React, {Component} from 'react';
import ReactModal from 'react-modal';
import CreateCampaign from './createCampaign';
import AddAdSet from './AddSet/addAdSet';
import {fetchCampaign} from '../actions/campaignActions';
import {connect} from 'react-redux';
import {Row, Grid, Col} from 'react-bootstrap';
import Analytics from './analytics'
import Heading from './heading'
import Icon from './icon'
import _ from 'lodash';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            modalOpen:false,
            dashBoardView:'Campaign',
            modalLoad:'create Campaign',
            barChartExample:{
                data:{
                    labels: ["Honda", "Toyota", "Mercedes", "KIA", "Mazda", "Hyundai"],
                    datasets: [{
                        label: 'Brand of Vehicles',
                        data: [10, 11, 6, 5, 4,6],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options:{}

            },
            doughnutChartExample:{
                data:{
                    datasets: [{
                        data: [52, 48],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Male',
                        'Female'
                    ]
                },
                options:{}
            },
            polarArearExample:{
                data:{
                    datasets: [{
                        data: [15, 13, 12],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 159, 64, 1)'
                        ]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'Class A Citizens',
                        'Class B Citizens',
                        'Class c Citizens'
                    ]
                },
                options:{}
            },
            lineChartExample:{
                data:{
                    datasets: [{
                        label: 'View Impression',
                        data: [13, 36, 23, 32, 22, 11, 15, 30],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor:[
                            'rgba(255, 159, 64, 1)',
                        ]
                    }],

                    // These labels appear in the legend and in the tooltips when hovering different arcs
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August'
                    ],

                },
            options:{
                xAxes: [{
                           gridLines: false
                       }],
                yAxes: [{
                   gridLines: false,
                    }]
            }
        }
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
        let totalCampaigns = (allCampaigns)? allCampaigns.length: 0
        return(
            <Grid className="dashboard section">
                <Col xs="12" className="campaignTable">
                    <ul className="campaign_menu">
                        <li className="active">Campaigns</li>
                        <li>Adsets</li>
                    </ul>
                    <Col className="hrule" xs="12"></Col>

                    <Col xs="12" className="campaign_actionables">
                        <Col xs="6">
                            <Heading size="sm" title={` ${totalCampaigns}  Campaigns`}/>
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
                    <Analytics xs="12" sm="6" md="3" name="barExample" dataSet={this.state.barChartExample.data} options={this.state.barChartExample.options} type="bar"/>
                    <Analytics xs="12" sm="6" md="3" name="doughExample" dataSet={this.state.doughnutChartExample.data} options={this.state.doughnutChartExample.options} type="doughnut"/>
                    <Analytics xs="12" sm="6" md="3" name="polarExample" dataSet={this.state.polarArearExample.data} options={this.state.polarArearExample.options} type="polarArea"/>
                    <Analytics xs="12" sm="6" md="3" name="lineChartExample" dataSet={this.state.lineChartExample.data} options={this.state.lineChartExample.options} type="line"/>

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
