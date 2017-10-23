import React, { Component } from 'react';
import Heading from './heading'
import Icon from './icon'
import {Col, Row} from 'react-bootstrap'

export default class selectBoard extends Component{
  shouldComponentUpdate(){
      return false
  }
  render(){
    return(
      <Row className="campaignContainer">
        <Col xs={3}>
          <Col componentClass="ul" xs={6} xsOffset={3} className="detailsMenu">
            <li>
              <a href="#campaign_details" role="presentation">Campaign Details</a>
            </li>
            <li><a href="#audience" role="presentation">Audience</a></li>
            <li><a href="#Situation" role="presentation">Situation</a></li>
            <li><a href="#campaign_details" role="presentation">Budget</a></li>
            <li><a href="#campaign_details" role="presentation">Pricing</a></li>
          </Col>
        </Col>
        <Col xs={5}  className="boardSelection">
          <Heading size="md" title="Describe Campaign and target Audience" />
          <Col xs={12}>

            <Row id="campaign_details">
              <Heading size="sm" title="Campaign Details" />
              <div class="inputField">
                <label>Name</label>
                <span className="inputContainer">
                  <input type="text" name="campaign_name" placeholder="Enter Name" />
                </span>
              </div>
              <div class="inputField">
                <label>Desired Period</label>
                <span className="inputContainer rangeInput">
                  <span className="subLabel">From</span>
                  <input type="text" name="campaign_name" placeholder="Enter Name"  />
                </span>
                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                <span className="inputContainer rangeInput">
                  <span className="subLabel">To</span>
                  <input type="text" name="campaign_name" placeholder="Enter Name"  />
                </span>
              </div>
            </Row>
            <Row id="audience">
              <Heading size="sm" title="Audience" />
              <div class="inputField">
                <label>Age</label>
                <span className="formField rangeSelect">
                  <select clas>
                    <option>20</option>
                  </select>
                </span>
                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
                <span className="formField rangeSelect">
                  <select>
                    <option>40</option>
                  </select>
                </span>
              </div>
              <div class="inputField">
                <label>Gender</label>
                <span className="inputContainer radio">
                  <span className="radioLabel active">All</span>
                </span>
                <span className="inputContainer radio">
                  <span className="radioLabel">Male</span>
                </span>
                <span className="inputContainer radio">
                  <span className="radioLabel">Female</span>
                </span>
              </div>
            </Row>
            <Row id="Situation">
              <Heading size="sm" title="Situation" />

              <div class="inputField">
                <label>Traffic</label>
                <span className="inputContainer radio">
                  <span className="radioLabel active">All Traffic Situations</span>
                </span>
                <span className="inputContainer radio">
                  <span className="radioLabel">Light</span>
                </span>
                <span className="inputContainer radio">
                  <span className="radioLabel">Heavy</span>
                </span>
              </div>
              <div class="inputField">
                <label>Time</label>
                <span className="inputContainer selectInput">
                  <input type="text" name="campaign_name" placeholder="Enter Name"  />
                  <span className="inlineSelect">
                  <select>
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                  </span>
                </span>
                <span className="arrowRange rangeSeperator"><Icon icon="long-arrow-right"></Icon></span>
              </div>
            </Row>
          </Col>

            <button className="primaryButton">Next</button>
            <button className="cancelButton">Cancel</button>
        </Col>
      </Row>
    )
  }
}
