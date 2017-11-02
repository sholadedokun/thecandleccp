import React, { Component } from 'react';
import Heading from './heading'
import Icon from './icon'
import {Col, Row} from 'react-bootstrap'
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import AdvanceTiming from './timingForm';

import 'react-day-picker/lib/style.css';

export default class selectBoard extends Component{
  constructor(props){
    super(props);
    this.state={
      data:{
        campaignName:'',
        dateFrom: new Date(),
        dateTo:'12/12/2017',
        ageFrom:20,
        ageTo:25,
        traffic:'all',
        weather:'all',
        gender:'all',
        scenario:[''],
        fastDisplay:'',
        timing:[''],
        advanceTiming:[]

      },
      scenariosList:['Car Accident', 'User Stares at Board', 'Kim Jong Un Lunched a Nuclear Bomb']
    }
    this.ageOption=[];
    for (let i=20; i<=100; i+=5){
      this.ageOption.push(i)
    }

  }
  componentWillMount(){
  }
  setOptionValue(index,option, e){
    let data= this.state.data
    if(arguments.length >2){
      data[arguments[1]][arguments[0]]=arguments[2].target.value;
    }
    else{
      data[arguments[0]]=arguments[1].target.value;
    }
    this.setState({ data })

  }
  addMoreField(dataLable){
      let data= this.state.data
      data[dataLable].push('')
      this.setState({data})

  }
  removeThisField(dataLable, index){
    let data= this.state.data
    data[dataLable].splice(index, 1)
    this.setState({data})
  }
  selectTime(index, from, to){
      let newTime= this.state.data;

      if(newTime.advanceTiming.length==0 && (newTime.timing[index]==="" || typeof newTime.timing[index]==="undefined") ){
          newTime.timing[index]=`${from} - ${to}`
      }
      else{
          newTime.timing[index]=""
      }
      this.setState({data:newTime})
  }
  advanceTimingToggle(operands){

      let data=this.state.data
      if(operands==1){
          data.advanceTiming.push('');
          data.timing=[""]
          this.setState({ data})
      }
      else{
          data.advanceTiming=[]
      }
      this.setState({data})
  }
  setTime(index, position, value){
      console.log(value)
      let advanceTiming= this.state.data.advanceTiming;
      advanceTiming[index]= advanceTiming[index] || {}
      advanceTiming[index][position]=value;
      this.setState(
          {
              data:{...this.state.data, advanceTiming}
          }
      )
      console.log(this.state.data.advanceTiming)
  }
  render(){
    const dayPickerPropsFrom = {
        disabledDays: {
          after: new Date (this.state.data.dateTo),
          before: new Date()
        }
      };
      const dayPickerPropsTo = {
          disabledDays: {
            before: new Date (this.state.data.dateFrom),
          }
        };
    const {scenariosList, data:{campaignName, scenario, fastDisplay, ageTo, ageFrom, gender, traffic, weather, timing, advanceTiming}}=this.state;
    return(
      <Row className="campaignContainer">
        <Col xs={3}>
          <Row className="descriptMenu">
            <Col componentClass="ul" xs={6} xsOffset={3} className="detailsMenu">
              <li>
                <a href="#campaign_details" role="presentation">Campaign Details</a>
              </li>
              <li><a href="#audience" role="presentation">Audience</a></li>
              <li><a href="#Situation" role="presentation">Situation</a></li>
              <li><a href="#campaign_details" role="presentation">Budget</a></li>
              <li><a href="#campaign_details" role="presentation">Pricing</a></li>
            </Col>
          </Row>
        </Col>
        <Col xs={6}  className="boardSelection">
          <Heading size="md" title="Describe Campaign and target Audience" />
          <Col xs={12}>
            <Row id="campaign_details" className="formSections">
              <Heading size="sm" title="Campaign Details" />
              <div class="inputField">
                <label>Name</label>
                <span className="inputContainer lg">
                  <input type="text" value={campaignName} onChange={(e)=>this.setState({data:{...this.state.data, campaignName:e.target.value}})} name="campaign_name" placeholder="Enter Campaign Name" />
                </span>
              </div>
              <div class="inputField">
                <label>Desired Period</label>
                <span className="inputContainer rangeInput">
                  <span className="subLabel">From</span>
                  <DayPickerInput
                    placeholder="MM/DD/YYYY"
                    onDayChange={(date)=>{this.setState({data:{...this.state.data, dateFrom:date} })}}
                    dayPickerProps={dayPickerPropsFrom}
                  />
                </span>
                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                <span className="inputContainer rangeInput">
                  <span className="subLabel">To</span>
                  <DayPickerInput
                    placeholder="MM/DD/YYYY"
                    onDayChange={(date)=>{this.setState({data:{...this.state.data, dateTo:date} })}}
                    dayPickerProps={dayPickerPropsTo}
                  />
                </span>
              </div>
            </Row>
            <Row id="audience" className="formSections">
              <Heading size="sm" title="Audience" />
              <div class="inputField">
                <label>Age</label>
                <span className="formField rangeSelect">
                  <select onChange={(e)=>this.setState({data:{...this.state.data, ageFrom:e.target.value}})} value={ageFrom}>
                  {this.ageOption.map((item, index)=>
                      (<option key={index} value={item}>{item}</option>)
                  )}
                  </select>
                </span>
                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                <span className="formField rangeSelect">
                  <select onChange={(e)=>this.setState({data:{...this.state.data, ageTo:e.target.value}})} value={ageTo}>
                    {this.ageOption.map((item, index)=>
                        (<option key={index} value={item}>{item}</option>)
                    )}
                  </select>
                </span>
              </div>
              <div class="inputField">
                <label>Gender</label>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, gender:'all'}})}>
                  <span className={`radioLabel ${gender==='all'?'active':''}`} >All</span>
                </span>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, gender:'male'}})}>
                  <span className={`radioLabel ${gender==='male'?'active':''}`}   >Male</span>
                </span>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, gender:'female'}})}>
                  <span className={`radioLabel ${gender==='female'?'active':''}`} >Female</span>
                </span>
              </div>
            </Row>
            <Row id="Situation" className="formSections">
              <Heading size="sm" title="Situation" />
              <div class="inputField">
                <label>Traffic</label>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, traffic:'all'}})}>
                  <span className={`radioLabel ${traffic==='all'?'active':''}`}>All Traffic Situations</span>
                </span>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, traffic:'light'}})}>
                  <span  className={`radioLabel ${traffic==='light'?'active':''}`}>Light</span>
                </span>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, traffic:'heavy'}})}>
                  <span  className={`radioLabel ${traffic==='heavy'?'active':''}`}>Heavy</span>
                </span>
              </div>
              <div class="inputField">
                <label>Weather</label>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, weather:'all'}})}>
                  <span className={`radioLabel ${weather==='all'?'active':''}`}>All Weather Conditions</span>
                </span>
                <span className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, weather:'rainy'}})}>
                  <span  className={`radioLabel ${weather==='rainy'?'active':''}`}>Rainy</span>
                </span>
                <span  className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, weather:'cloudy'}})}>
                  <span  className={`radioLabel ${weather==='cloudy'?'active':''}`}>Cloudy</span>
                </span>
                <span  className="inputContainer radio" onClick={()=>this.setState({data:{...this.state.data, weather:'sunny'}})}>
                  <span className={`radioLabel ${weather==='sunny'?'active':''}`}>Sunny</span>
                </span>
              </div>
              <div class="inputField">
                <label>Scenario</label>
                {
                  scenario.map((item, index)=>{
                    return (
                      <div>
                        <span className="formField">
                          <select onChange={this.setOptionValue.bind(this,index, 'scenario')} value={scenario[index]}>
                            {scenariosList.map((opItems, opIndex)=>{
                              return(
                                <option value={opItems} key={opIndex}>{opItems}</option>
                              )
                            })}
                          </select>
                        </span>
                          {index===  scenario.length-1 ?<span className="moreAdder"  onClick={this.addMoreField.bind(this, 'scenario')}><Icon icon="plus-circle" /></span>:
                          <span  className="moreRemover" onClick={this.removeThisField.bind(this, 'scenario' ,index)}><Icon icon="minus-circle"  /></span>}
                      </div>
                    )
                  })
                }
              </div>
              <div class="inputField">
                <label>Time</label>
                <span className="inputContainer radio" onClick={this.selectTime.bind(this, 0,'6:00AM', '12:00PM')}>
                  <span className={`radioLabel ${timing[0]==='6:00AM - 12:00PM'?'active':''}`}>6AM - 12PM</span>
                </span>
                <span className="inputContainer radio" onClick={this.selectTime.bind(this, 1,'12:00PM', '6:00PM')}>
                  <span  className={`radioLabel ${timing[1]==='12:00PM - 6:00PM'?'active':''}`}>12PM - 6PM</span>
                </span>
                <span  className="inputContainer radio" onClick={this.selectTime.bind(this, 2,'6:00PM', '12:00AM')}>
                  <span  className={`radioLabel ${timing[2]==='6:00PM - 12:00AM'?'active':''}`}>6PM - 12AM</span>
                </span>
                <span  className="inputContainer radio" onClick={this.selectTime.bind(this, 3,'12:00AM', '6:00AM')}>
                  <span className={`radioLabel ${timing[3]==='12:00AM - 6:00AM'?'active':''}`}>12AM - 6AM</span>
                </span>
                <label>Add Advance Timing
                    {
                        advanceTiming.length== 0 ?
                            <span className="moreAdder"  onClick={this.advanceTimingToggle.bind(this, 1)}><Icon icon="plus-circle" /></span>:
                            <span  className="moreRemover" onClick={this.advanceTimingToggle.bind(this, 0)}><Icon icon="minus-circle"  /></span>

                    }
                </label>
                {
                    advanceTiming.map((item, index)=>{
                        return(
                            <div>
                                <AdvanceTiming setNewTime={this.setTime.bind(this, index, "from" )}  />
                                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                                <AdvanceTiming setNewTime={this.setTime.bind(this, index, "to" )}  />
                                {
                                    advanceTiming.length-1 === index ?
                                        <span className="moreAdder"  onClick={this.addMoreField.bind(this, 'advanceTiming')}><Icon icon="plus-circle" /></span>:
                                        <span className="moreRemover" onClick={this.removeThisField.bind(this, 'advanceTiming', index)}><Icon icon="minus-circle"  /></span>
                                }
                            </div>
                        )
                    })
                }

              </div>
            </Row>
            <Row id="Budget" className="formSections">
              <Heading size="sm" title="Budget" />
              <div class="inputField">
                <label>Total Spend</label>
                <span className="inputContainer selectInput">
                  <input type="text" name="campaign_totalSpend" placeholder="Enter Amount"  />
                  <span className="inlineSelect">
                  <select>
                    <option value="Monthly">Daily</option>
                    <option value="Yearly">Lifetime</option>
                  </select>
                  </span>
                </span>
              </div>
              <div class="inputField">
                <label>MCPV</label>
                <span className="inputContainer">
                  <input type="text" name="campaign_name" placeholder="Values 100-300" />
                </span>
              </div>
              <div class="inputField">
                <label>Fast Display</label>
                <span className="formField">
                  <select onChange={this.setOptionValue.bind(this, 'fastDisplay')} value={fastDisplay}>
                    <option value="Auto Select">Auto Select</option>
                    <option value="10%">10%</option>

                  </select>
                </span>
              </div>
            </Row>
          </Col>
            <button className="primaryButton" onClick={console.log(this.state)}>Next</button>
            <button className="cancelButton">Cancel</button>
        </Col>
      </Row>
    )
  }
}
