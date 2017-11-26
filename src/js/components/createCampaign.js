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
import _ from 'lodash'

class RegisterUser extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            dateFrom: moment().format('L'),
            dateTo:'',
            budget:12000,
            budget_type:'Daily',
            createSuccess:false,
        }
    }
    createCampaign(){
        let params= _.omit(this.state, ['dateFrom', 'dateTo']);
        params.budget_type = 0;
        // params.dateFrom= moment(this.state.dateFrom).format('YYYY-MM-DD');
        // params.dateTo= moment(this.state.dateTo).format('YYYY-MM-DD')  ;
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
            <Col xs={12}>
                <Heading size="lg">Create Campaign</Heading>
                <input type="text" value={name} onChange={(e)=>this.setState({name:e.target.value})} placeholder="Campaign Name" />
                <Row id="budget" className="formSections">
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
                            <option value="Daily">Daily</option>
                            <option value="Lifetime">Lifetime</option>
                          </select>
                      </span>
                    </span>
                    <span className="minimumValues">Minimum Amount is &#8358;12,000</span>
                  </div>
                  <div className="inputField">
                    <label>Desired Period</label>
                      {
                          budget_type==='Daily'?
                              <span className="SelectDate">
                                  <span className="inputContainer radio" onClick={()=>this.setState({ budget_type:'Daily'})}>
                                    <span className={`radioLabel ${(budget_type==='Daily' && dateFrom== moment().format('L'))?'active':''}`}>Start Immediately</span>
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
                </Row>
                <button onClick={this.createCampaign.bind(this)}>Create campaign</button>
                {
                    createSuccess?
                    <div className="inputField">
                        <label>Campaign Successfully Created</label>
                        <button onClick={(e)=>this.props.close('addAdSet')}>Add AdSets</button>
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
