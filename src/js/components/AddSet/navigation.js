import React, { Component } from 'react';
import Heading from '../heading'
import {Col, Row, Grid} from 'react-bootstrap'
class navigation extends Component {
  constructor(props){
    super(props)
    this.state={
      currentBoardLocations:'',
      steps:[
        {
          title:'spaces',
          listOfSpaces:[
            {
              location:'Lagos Island',
              postion:''
            }
          ]
        },
        {
          title:'Description and Target Audience',
          listOfSpaces:[
            {
              location:'Lagos Island',
              postion:''
            }
          ]
        },
        {
          title:'upload Ad Creative',
          listOfSpaces:[
            {
              location:'Lagos Island',
              postion:''
            }
          ]
        },
        {
          title:'Payment',
          listOfSpaces:[
            {
              location:'Lagos Island',
              postion:''
            }
          ]
        }
      ]
    }

  }
  render() {
    const {steps}=this.state
    const {currentStep}=this.props
    return (
      <Row xs={12} className="navigator">
        <Col xs={3} className="header">
          <Heading size="md" title="TheCandle"></Heading>
        </Col>
        <Col xs={9} componentClass="ul">
          {steps.map( (item, index)=>{
            return <li key={index} className={(currentStep===index)?'active':(currentStep>index)?'past':''}>
              <span>{`${index+1}. ${item.title}`}</span>
              <div className={(currentStep===index)?'liner activeLiner':(currentStep>index)?'liner':''}></div>
            </li>
          }


          )}
        </Col>
        <Col>

        </Col>
      </Row>
    );
  }
}

export default navigation;
