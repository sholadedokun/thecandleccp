import React, { Component } from 'react';
import Map from './googleMapWrapper/map'
import Heading from './heading'
import Icon from './icon'
import {Col, Row, Grid} from 'react-bootstrap'

export default class selectBoard extends Component{
  shouldComponentUpdate(){
      return false
  }
  render(){
    return(
      <Row className="campaignContainer">
        <Col xs={5}>
          <Map spaces={{her:0}} size="addCampaign" />
        </Col>
        <Col xs={6} className="boardSelection">
          <Heading size="sm" title="Choose a Space to get Started" />
          <span className="formField">
            <select>
              <option>Lagos</option>
            </select>
          </span>
          <Row className="spaceList">
            <Col xs={6} sm={4}>
              <div className="spaceContainer">
                  <img src="images/space1.jpg" />
                  <span className="location">
                  <Icon icon="map-marker"> </Icon> 4, Salvation Road, Ikeja
                  </span>
              </div>
            </Col>
          </Row>

            <button className="primaryButton">Next</button>
            <button className="cancelButton">Cancel</button>
        </Col>
      </Row>
    )
  }
}
