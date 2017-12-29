import React, {Component} from 'react';
import {createCampaign} from '../actions/campaignActions';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import Icon from './icon';
import moment from 'moment';
import Heading from './heading';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import AdvanceTiming from './timingForm';
import ToolTipMarker from './tooltip.js';
import 'react-day-picker/lib/style.css';
import {CAMPAIGN_DICTIONARY} from '../config.js'
import _ from 'lodash'

class RegisterUser extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            dateFrom: moment().format('L'),
            dateTo:'',
            budget:12000,
            budget_type:'Lifetime',
            createSuccess:false,
        }
    }
    createCampaign(){
        let params= _.omit(this.state, ['dateFrom', 'dateTo', 'createSuccess' ]);
        params.budget_type = CAMPAIGN_DICTIONARY.budget_type[this.state.budget_type];
        if(this.state.budget_type == 'Daily'){
            params.date_from= moment(this.state.dateFrom).format('YYYY-MM-DD');
            params.date_to= moment(this.state.dateTo).format('YYYY-MM-DD')  ;
            params.days= moment(this.state.dateTo).diff(moment(this.state.dateFrom), 'days')
        }
        else
          params.date_from= moment(this.state.dateFrom).format('YYYY-MM-DD');

        this.props.createCampaign(params).then((data)=>{
            this.setState({
                createSuccess:true
            })
            //console.log(data)
        })
    }
    render(){
        const dayPickerPropsFrom = {
            disabledDays: {
              after: new Date (this.state.dateTo),
              before: new Date()
            }
          };
          const dayPickerPropsTo = {
              disabledDays: {
                before: new Date (this.state.dateFrom),
              }
            };
        const {name, budget, budget_type, dateFrom,dateTo, password, createSuccess} = this.state;
        return(
            <Col  xs={10} xsOffset={1} sm={6} smOffset={3} md={4} mdOffset={4} className="create_campaign_modal">
                <Heading size="lg" title="Create Campaign" />
                <Col className="formSections">
                  <Heading size="sm" title="Campaign Details" />
                  <div className="inputField">
                    <label>Campaign Name </label>
                    <span className="inputContainer lg">
                        <input type="text" value={name} onChange={(e)=>this.setState({name:e.target.value})} placeholder="Type Campaign Name" />
                    </span>
                </div>
                </Col>
                <Col className="formSections">
                  <Heading size="sm" title="Budget" />
                  <div className="inputField">
                    <label>Total Spend
                        <ToolTipMarker id={_.uniqueId()} tooltip="Total amount you are willing to spend.">
                            <span><Icon icon="question-circle" /></span>
                        </ToolTipMarker>
                    </label>
                    <span className="inputContainer selectInput">
                      <input type="text" name="campaign_totalSpend" placeholder="Enter Amount" onChange={(e)=>this.setState({budget:e.target.value})} value={budget}  />
                      <span className="inlineSelect">
                          <select onChange={(e)=> this.setState({ budget_type:e.target.value})} value={budget_type}>
                            <option value="Lifetime">Lifetime</option>
                            <option value="Daily">Daily</option>
                          </select>
                      </span>
                    </span>
                    <span className="minimumValues">Minimum Amount is &#8358;12,000</span>
                  </div>
                  <div className="inputField">
                    <label>Desired Period</label>
                      {
                          budget_type==='Lifetime'?
                              <span className="SelectDate">
                                  <span className="inputContainer radio" onClick={()=>this.setState({ budget_type:'Lifetime'})}>
                                    <span className={`radioLabel ${(budget_type==='Lifetime' && dateFrom== moment().format('L'))?'active':''}`}>Start Immediately</span>
                                  </span>
                                  <span className="inputContainer rangeInput">
                                    <span className="subLabel">From</span>
                                    <DayPickerInput
                                      placeholder="MM/DD/YYYY"
                                      onDayChange={(date)=>{this.setState({ dateFrom:date })}}
                                      dayPickerProps={dayPickerPropsFrom}
                                    />
                                  </span>
                              </span>
                              :
                              <span className="SelectDate">
                                  <span className="inputContainer rangeInput">
                                    <span className="subLabel">From</span>
                                    <DayPickerInput
                                      placeholder="MM/DD/YYYY"
                                      onDayChange={(date)=>{this.setState({dateFrom:date})}}
                                      dayPickerProps={dayPickerPropsFrom}
                                    />
                                  </span>
                                  <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                                  <span className="inputContainer rangeInput">
                                    <span className="subLabel">To</span>
                                    <DayPickerInput
                                      placeholder="MM/DD/YYYY"
                                      onDayChange={(date)=>{this.setState({dateTo:date })}}
                                      dayPickerProps={dayPickerPropsTo}
                                    />
                                  </span>
                              </span>
                      }
                  </div>
                </Col>
                <button className="primaryButton" onClick={this.createCampaign.bind(this)}>Create campaign</button>
                {
                    createSuccess?
                    <div className="inputField">
                        <label>Campaign Successfully Created</label>
                        <button className="primaryButton" onClick={(e)=>this.props.close('addAdSet')}>Add AdSets</button>
                    </div>
                    :
                    ''
                }
            </Col>
        )
    }
}
function mapStateToProps(state){
    return(
        {authenticated:state.user.authenticated}
    )
}
const mapDispatchToProps = {createCampaign}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser)