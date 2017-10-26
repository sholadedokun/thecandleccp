import React, { Component } from 'react';
import Map from './googleMapWrapper/map'
import Heading from './heading'
import Icon from './icon'
import {Col, Row, Grid} from 'react-bootstrap'
export default class selectBoard extends Component{
  constructor(props){
    super()
    this.state={
      boards:[
        {
          coordinate:'',
          width:'',
          height:'',
          divisibleHeight:2,
          state:'Lagos',
          address:'4, salvation Road, off Opebi.',
          imageUrl:"images/space1.jpg",
          boardBitmap:'',
          boardDescription:''
        }
      ],
      selectedBoardIndex:'',
      error:''
    }

  }
  confirmInput(){
    if(this.state.selectedBoardIndex===''){
      this.setState({error: 'Please select a board to continue'})
      return;
    }
    this.props.selectedBoard(this.state.boards[this.state.selectedBoardIndex])
  }
  render(){
    const {boards, selectedBoardIndex, error}= this.state
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
              {
                boards.map((item, index)=>{
                  return(
                    <div key={index} className={(selectedBoardIndex === index)?"spaceContainer active":"spaceContainer"} onClick={()=>this.setState({selectedBoardIndex:index})}>
                        <img src={item.imageUrl} />
                        <span className="location">
                          <Icon icon="map-marker"> </Icon> {item.address}
                        </span>
                    </div>
                  )
                })
              }

            </Col>
            <Col xs={12} className="errorNotification">
              { (error!=='')? error :''}
            </Col>
          </Row>

            <button className="primaryButton" onClick={this.confirmInput.bind(this)}>Next</button>
            <button className="cancelButton">Cancel</button>
        </Col>
      </Row>
    )
  }
}
